import json
import open3d as o3d
import numpy as np
import random, copy
import sys

sys.setrecursionlimit(1500)

class Block:
    def __init__(self, mesh, rotation, neighbors) -> None:
        self.mesh = o3d.io.read_triangle_mesh(f'CityModels/'+mesh)
        R = self.mesh.get_rotation_matrix_from_xyz((0,np.pi * rotation / 2,0))
        self.mesh.rotate(R, center=(0,0,0))
        self.neighbors = neighbors

class Cell:
    def __init__(self, options) -> None:
        self.options = set(options)
        self.collapsed = False

prototypes = {}
blocks = {}
dim = 2
grid = [None]*(dim**3)
# stairs = "proto_13","proto_14","proto_15","proto_16"
alloptions = ["proto_0","proto_1","proto_2","proto_3","proto_4","proto_5","proto_6","proto_7","proto_8","proto_9","proto_10","proto_11","proto_12","proto_17","proto_18","proto_19","proto_20","proto_21","proto_22","proto_23","proto_24","proto_25","proto_26","proto_27"]
directions = [(1,0,0,"nx"), (-1,0,0,"px"), (0,0,1,"ny"), (0,0,-1,"py"), (0,1,0,"nz"), (0,-1,0,"pz")]
roads = ["proto_0", "proto_25", "proto_26", "proto_27"]
buildings = ["proto_0","proto_1","proto_2","proto_3","proto_4","proto_17","proto_18","proto_19","proto_20","proto_21","proto_22","proto_23","proto_24"]
def LoadPrototypes():
    
    with(open('prototypes/prototypes.json')) as f:
        global prototypes
        prototypes = json.load(f)

    for key, prototype in prototypes.items():
        blocks[key] = Block(prototype["mesh"], prototype["rotation"], prototype["valid_neighbors"])

def Setup():
    global grid
    for i in range(dim):
        for j in range(dim):
            for k in range(dim):
                if j == 0: grid[i * dim * dim + j * dim + k] = Cell(roads)
                #elif j == 1: grid[i * dim * dim + j * dim + k] = Cell(buildings)
                else: grid[i * dim * dim + j * dim + k] = Cell(buildings)

def Generate():
    global grid
    notCollapsed = [x for x in grid if not x.collapsed] # get all non collapsed

    if not notCollapsed: return # all collapsed

    notCollapsed = sorted(notCollapsed, key=lambda x: len(x.options)) # sort by least entropy
    
    cellToCollapse = notCollapsed[0]
    cellToCollapse.collapsed = True
    chosenOption = random.choice(list(cellToCollapse.options))
    cellToCollapse.options = set([chosenOption])

    for i in range(dim):
        for j in range(dim):
            for k in range(dim):
                if grid[i * dim * dim + j * dim + k] == cellToCollapse:
                    visited = set()
                    DFS(i,j,k,[],"", visited)
    
    Generate()

def DFS(x,y,z, options, direction, visited):
    global grid, dim
    if x < 0 or y < 0 or z < 0 or x == dim or y == dim or z == dim:
        return
    index = x * dim * dim + y * dim + z
    if index in visited:
        return
    visited.add(index)
    if options:
        for opt in options:
            grid[index].options = grid[index].options.intersection(set(blocks[opt].neighbors[direction]))
    for dx,dy,dz,dir in directions:
        DFS(x+dx, y+dy, z+dz, grid[index].options, dir, visited)

    # for dx,dy,dz,dir in directions:
    #     idx = (x+dx) * dim * dim + (y+dy) * dim + z+dz
    #     if (x+dx) < 0 or (y+dy) < 0 or z+dz < 0 or (x+dx) == dim or (y+dy) == dim or z+dz == dim: continue
    #     if dx != 0:
    #         d = "px" if dx > 0 else "nx"
    #     elif dy != 0:
    #         d = "nz" if dy > 0 else "pz"
    #     else:
    #         d = "ny" if dz > 0 else "py"
    #     for opt in grid[idx].options:
    #         grid[index].options = grid[index].options.intersection(set(blocks[opt].neighbors[d]))
    
    if len(grid[index].options) < 1:
        grid[index].collapsed = True

def Combine():
    mesh = None
    for i in range(dim):
        for j in range(dim):
            for k in range(dim):
                index = i * dim * dim + j * dim + k
                if not grid[index].options or not grid[index].collapsed: continue
                if mesh == None:
                    mesh = copy.deepcopy(blocks[list(grid[index].options)[0]].mesh).translate((i*2, j*2, k*2))
                else:
                    mesh += copy.deepcopy(blocks[list(grid[index].options)[0]].mesh).translate((i*2, j*2, k*2))
    mesh.compute_vertex_normals()
    o3d.visualization.draw_geometries([mesh])
if __name__ == "__main__":
    LoadPrototypes()
    Setup()
    Generate()
    Combine()