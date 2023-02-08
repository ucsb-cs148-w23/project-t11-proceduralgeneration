import copy
import json
import numpy as np
import open3d as o3d
import os
import random

# -----------------------------
# constants

DIRECTIONS = [
    (1, 0, 0, "px"),  (-1, 0, 0, "nx"),
    (0, 0, 1, "py"),  (0, 0, -1, "ny"),
    (0, 1, 0, "pz"),  (0, -1, 0, "nz")
]
MESH_FILE_DIRECTORY = "../CityModels/"
DEFAULT_TILE_PATH = "../prototypes/prototypes.json"
with open("default_height_option_map.json") as f:
    DEFAULT_HEIGHT_OPTION_MAP = json.load(f)


# -----------------------------
# solver class

class EnvironmentGenerator:
    def __init__(
        self, 
        shape, 
        tile_data_file_path=DEFAULT_TILE_PATH,
        height_option_map=None, 
        empty_tile="proto_28"
    ):
        self.tile_data = self._load_tile_data(tile_data_file_path)
        self.empty_tile = empty_tile

        # handle height option mapping
        self.height_option_map = height_option_map or DEFAULT_HEIGHT_OPTION_MAP
        self.DEFAULT_HEIGHT_OPTIONS = set(self.height_option_map.pop("default"))
        self.height_option_map = {int(k): set(v) for k, v in self.height_option_map.items()}

        self.shape = shape
        self.grid, self.uncollapsed = self._initialize_grid()
        self.debug = False
    

    def generate(self):
        # keep collapsing until all cells are collapsed
        while len(self.uncollapsed):
            # choose collapse target
            collapse_target_idxs = min(self.uncollapsed, key=lambda idxs: len(self._get_cell(idxs)))
            self.uncollapsed.discard(collapse_target_idxs)
            collapse_target = self._get_cell(collapse_target_idxs)
            
            # special handling of the empty tile: 
            # - only select if it's the only remaining option
            if len(collapse_target) > 1:
                collapse_target.discard(self.empty_tile)
            selected_option = random.choice(list(collapse_target))
            self._set_cell(collapse_target_idxs, {selected_option})

            if self.debug:
                print(
                    f"Collapsing {collapse_target_idxs} "
                    f"to {self.tile_data[selected_option]['name']}"
                )
            
            # update neighbors
            self._update_neighbors(collapse_target_idxs)

        return self.grid

    def assemble_mesh(self):
        mesh = o3d.geometry.TriangleMesh()
        for i in range(self.shape[0]):
            for j in range(self.shape[1]):
                for k in range(self.shape[2]):
                    tile = self.grid[i][j][k]
                    opt = list(tile)[0]
                    if opt != self.empty_tile:
                        tile_mesh = self.tile_data[opt]["mesh"]
                        mesh += copy.deepcopy(tile_mesh).translate((i * 2, j * 2, k * 2))

        return mesh
                    

    def _update_neighbors(self, idxs):
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
        initial_tile_options = self._get_cell(idxs)
        stack = []
        for dx, dy, dz, direction in DIRECTIONS:
            nx, ny, nz = idxs[0] + dx, idxs[1] + dy, idxs[2] + dz
            if (
                0 <= nx < self.shape[0]
                and 0 <= ny < self.shape[1]
                and 0 <= nz < self.shape[2]
            ):
                stack.append((nx, ny, nz, initial_tile_options, direction))

        while len(stack):
            i, j, k, neighbor_options, direction = stack.pop()

            if self.debug:
                n_opts = [self.tile_data[opt]["name"] for opt in neighbor_options]
                print(f"updating tile {i} {j} {k} from {direction} with new options: {n_opts}")

            target = self.grid[i][j][k]
            allowed_options = set()
            for option in neighbor_options:
                allowed_options = allowed_options.union(
                    self.tile_data[option]["valid_neighbors"][direction]
                )
            previous_size = len(target)
            new_options = target.intersection(allowed_options)
            self._set_cell((i, j, k), new_options)

            # mark as collapsed if necessary
            if len(new_options) <= 1:
                self.uncollapsed.discard((i, j, k))
            
            # update neighbors if current tile has changed
            if len(new_options) != previous_size:
                for dx, dy, dz, dir in DIRECTIONS:
                    nx, ny, nz = i + dx, j + dy, k + dz
                    if (
                        0 <= nx < self.shape[0]
                        and 0 <= ny < self.shape[1]
                        and 0 <= nz < self.shape[2]
                        and len(self.grid[nx][ny][nz]) > 1
                    ):
                        stack.append((nx, ny, nz, new_options, dir))
        
    @staticmethod
    def _load_tile_data(tile_data_file_path):
        with open(tile_data_file_path) as f:
            tile_data = json.load(f)
        
        for data in tile_data.values():
            mesh_file_name = data.get("mesh", None)
            if mesh_file_name == "":
                data["name"] = "empty"
                data["mesh"] = None
            else:
                data["name"] = mesh_file_name.split(".")[0]
                filepath = os.path.join(MESH_FILE_DIRECTORY, mesh_file_name)
                mesh = o3d.io.read_triangle_mesh(filepath)
                rotation_matrix = mesh.get_rotation_matrix_from_xyz(
                        (0, np.pi * data["rotation"] / 2, 0)
                )
                mesh.rotate(rotation_matrix, center=(0, 0, 0))
                data["mesh"] = mesh

        return tile_data

    def _initialize_grid(self):
        grid = [
            [
                [None for _ in range(self.shape[2])] 
                for _ in range(self.shape[1])
            ] 
            for _ in range(self.shape[0])
        ]
        uncollapsed = set()

        for i in range(self.shape[0]):
            for j in range(self.shape[1]):
                for k in range(self.shape[2]):
                    grid[i][j][k] = self.height_option_map.get(j, self.DEFAULT_HEIGHT_OPTIONS)
                    uncollapsed.add((i, j, k))

        return grid, uncollapsed

    def _get_cell(self, idxs):
        return self.grid[idxs[0]][idxs[1]][idxs[2]]

    def _set_cell(self, idxs, value):
        self.grid[idxs[0]][idxs[1]][idxs[2]] = value

    @staticmethod
    def vertices_from_mesh(mesh):
        vertices = np.asarray(mesh.vertices)
        triangles = np.asarray(mesh.triangles)
        vertex_array = []
        for triangle in triangles:
            for vertex_index in triangle:
                for x in vertices[vertex_index]:
                    vertex_array.append(x)
        return vertex_array


if __name__ == "__main__":
    solver = EnvironmentGenerator(shape=(5, 5, 5))
    # solver.debug = True 
    solver.generate()

    mesh = solver.assemble_mesh()
    mesh.compute_vertex_normals()
    o3d.visualization.draw_geometries([mesh])
