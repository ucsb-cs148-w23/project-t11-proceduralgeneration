import numpy as np
import open3d as o3d
import random
import copy
import json

# import sys
# sys.setrecursionlimit(1500)

class Block:
    def __init__(self, mesh, rotation, neighbors) -> None:
        self.mesh = o3d.io.read_triangle_mesh(f"../CityModels/{mesh}")
        R = self.mesh.get_rotation_matrix_from_xyz((0, np.pi * rotation / 2,0))
        self.mesh.rotate(R, center=(0, 0, 0))
        self.neighbors = neighbors

class Cell:
    def __init__(self, options) -> None:
        self.options = set(options)
        self.collapsed = False

class WFCSolver:
    DEFAULT_TILE_PATH = "../prototypes/prototypes.json"
    ROAD_TILES = ["proto_0", "proto_25", "proto_26", "proto_27"]
    BUILDING_TILES = ["proto_0","proto_1","proto_2","proto_3","proto_4","proto_17","proto_18","proto_19","proto_20","proto_21","proto_22","proto_23","proto_24"]
    DIRECTIONS = [
        (1, 0, 0, "nx"),  (-1, 0, 0, "px"),
        (0, 0, 1, "ny"),  (0, 0, -1, "py"),
        (0, 1, 0, "nz"),  (0, -1, 0, "pz")
    ]

    def __init__(self, dim, tile_path=None):
        # TODO: implement non-cube dimensions
       self.tiles = self._load_tiles(tile_path)
       self.tile_meshes = None
       self.dim = dim
       self.grid = [None] * (dim ** 3)
       self._grid_setup()
       self.uncollapsed = set(range(len(self.grid)))
       self.debug = False
    
    def get_tile(self, i, j, k):
        idx = i * self.dim ** 2 + j * self.dim + k
        return self.grid[idx]
    
    def set_tile(self, i, j, k, v):
        idx = i * self.dim ** 2 + j * self.dim + k
        self.grid[idx] = v
    
    def generate(self):
        # keep collapsing until all cells are collapsed
        while len(self.uncollapsed):
            # choose collapse target
            collapse_target_idx = min(self.uncollapsed, key=lambda i: len(self.grid[i].options))
            self.uncollapsed.discard(collapse_target_idx)
            collapse_target = self.grid[collapse_target_idx]
            collapse_target.collapsed = True
            
            # choose collapse option
            selected_option = random.choice(list(collapse_target.options))
            collapse_target.options = {selected_option}
            if self.debug:
                print(
                    f"Collapsing {collapse_target_idx} "
                    f"{self._to_triple(collapse_target_idx)} "
                    f"to {self._mesh_name(selected_option)}"
                )
            
            # update neighbors
            self._update_neighbors(*self._to_triple(collapse_target_idx))

        return self.grid

    def get_mesh(self):
        if self.tile_meshes is None:
            self.tile_meshes = self._load_meshes()

        mesh = o3d.geometry.TriangleMesh()
        for i in range(self.dim):
            for j in range(self.dim):
                for k in range(self.dim):
                    tile = self.get_tile(i, j, k)
                    if len(tile.options):
                        opt = list(tile.options)[0]
                        tile_mesh = self.tile_meshes[opt].mesh
                        mesh += copy.deepcopy(tile_mesh).translate((i * 2, j * 2, k * 2))

        return mesh


    def _grid_setup(self):
        options_by_height = {
            0: self.ROAD_TILES,
        }
        for i in range(self.dim):
            for j in range(self.dim):
                for k in range(self.dim):
                    options = options_by_height.get(j, self.BUILDING_TILES)
                    self.set_tile(i, j, k, Cell(options))
        # print(self.grid[0].options)
                    

    def _update_neighbors(self, i, j, k):
        """
        stack frame: (
            target_coords, 
            neighbors_options (this has recently been updated, necessitating update to the target)
            neighbor->target direction
        )

        # note on tracking visited tiles
        I don't think we can track visited because we might need to return to a tile

        consider 2x2 example, if we collapse top-left, 
        then we need to update the bottom-left tile.
        But what if top-left updates top-right which updates bottom-left?

        """

        # initialize stack
        initial_tile_options = self.get_tile(i, j, k).options
        stack = []
        for dx, dy, dz, direction in self.DIRECTIONS:
            nx, ny, nz = i + dx, j + dy, k + dz
            if (
                0 <= nx < self.dim
                and 0 <= ny < self.dim
                and 0 <= nz < self.dim
            ):
                stack.append((nx, ny, nz, initial_tile_options, direction))

        # visited = set((i, j, k))
        while len(stack):
            i, j, k, neighbor_options, direction = stack.pop()

            if self.debug:
                n_opts = [self._mesh_name(opt) for opt in neighbor_options]
                print(f"updating tile {i} {j} {k} from {direction} with new options: {n_opts}")

            target = self.get_tile(i, j, k)
            new_options = set()
            for option in neighbor_options:
                new_options = new_options.union(
                    self.tiles[option]["valid_neighbors"][direction]
                )
            previous_size = len(target.options)
            target.options = target.options.intersection(new_options)

            if len(target.options) <= 1:
                target.collapsed = True
                self.uncollapsed.discard(self._to_idx(i, j, k))
            
            # update neighbors if current tile has changed
            if len(target.options) != previous_size:
                for dx, dy, dz, dir in self.DIRECTIONS:
                    nx, ny, nz = i + dx, j + dy, k + dz
                    if (
                        0 <= nx < self.dim
                        and 0 <= ny < self.dim
                        and 0 <= nz < self.dim
                        and not self.get_tile(nx, ny, nz).collapsed
                    ):
                        stack.append((nx, ny, nz, target.options, dir))
        
    @staticmethod
    def _load_tiles(path=None):
        path = path or WFCSolver.DEFAULT_TILE_PATH
        with open(path) as f:
            tiles = json.load(f)
        return tiles

    def _load_meshes(self):
        return {
            tile: Block(data["mesh"], data["rotation"], data["valid_neighbors"])
            for tile, data in self.tiles.items()
        }

    def _to_triple(self, idx):
        return (idx // self.dim ** 2, (idx // self.dim) % self.dim, idx % self.dim)

    def _to_idx(self, i, j, k):
        return i * self.dim ** 2 + j * self.dim + k

    def _mesh_name(self, option):
        return self.tiles[option]["mesh"]
    

if __name__ == "__main__":
    solver = WFCSolver(dim=5)
    solver.debug = True 
    solver.generate()

    mesh = solver.get_mesh()
    mesh.compute_vertex_normals()
    o3d.visualization.draw_geometries([mesh])
