import json
import open3d as o3d
import numpy as np
import random, copy
import sys

sys.setrecursionlimit(1500)

class Block:
    def __init__(self, mesh, rotation, neighbors) -> None:
        if len(mesh) > 0:
            self.mesh = o3d.io.read_triangle_mesh(f'CityModels/'+mesh)
            R = self.mesh.get_rotation_matrix_from_xyz((0,np.pi * rotation / 2,0))
            self.mesh.rotate(R, center=(0,0,0))
        else: self.mesh = mesh
        self.neighbors = neighbors

class Cell:
    def __init__(self, options) -> None:
        self.options = set(options)
        self.collapsed = False

prototypes = {}
blocks = {}
dim = 20
grid = [None]*(dim**3)
# stairs = "proto_13","proto_14","proto_15","proto_16"
alloptions = ["proto_0","proto_1","proto_2","proto_3","proto_4","proto_5","proto_6","proto_7","proto_8","proto_9","proto_10","proto_11","proto_12","proto_17","proto_18","proto_19","proto_20","proto_21","proto_22","proto_23","proto_24","proto_25","proto_26","proto_27","proto_28"]
directions = [(1,0,0), (-1,0,0),(0,0,1), (0,0,-1),(0,1,0), (0,-1,0)]
roads = ["proto_0","proto_25", "proto_26", "proto_27"]
buildings = ["proto_0","proto_1","proto_2","proto_3","proto_4","proto_17","proto_18","proto_19","proto_20","proto_21","proto_22","proto_23","proto_24","proto_28"]
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
                elif j == 1: grid[i * dim * dim + j * dim + k] = Cell(buildings)
                else: grid[i * dim * dim + j * dim + k] = Cell(alloptions)

def Generate():
    global grid
    while 1:
        notCollapsed = [x for x in grid if not x.collapsed] # get all non collapsed

        if not notCollapsed: return # all collapsed

        notCollapsed = sorted(notCollapsed, key=lambda x: len(x.options)) # sort by least entropy
        
        cellToCollapse = notCollapsed[0]
        cellToCollapse.collapsed = True
        optionslist = [x for x in list(cellToCollapse.options) if x != "proto_28"]
        if optionslist:
            chosenOption = random.choice(optionslist)
        else:
            chosenOption = "proto_28"
        cellToCollapse.options = set([chosenOption])

        RunDFS(cellToCollapse)
    
def RunDFS(cellToCollapse):
    for i in range(dim):
            for j in range(dim):
                for k in range(dim):
                    if grid[i * dim * dim + j * dim + k] == cellToCollapse:
                        DFS(i,j,k)
                        return
                        
def DFS(x,y,z):
    global grid, dim
    s = [(x,y,z,False)]
    visited = set()
    while s:
        top = s.pop()
        index = top[0] * dim * dim + top[1] * dim + top[2]
        if top[3]:
            CheckValid(top[0], top[1], top[2])
            if len(grid[index].options) == 1:
                grid[index].collapsed = True

        if index in visited: continue

        visited.add(index)
        CheckValid(top[0],top[1],top[2])
        s.append((x,y,z,True))
        for dx,dy,dz in directions:
            if (x+dx) < 0 or (y+dy) < 0 or (z+dz) < 0 or (x+dx) == dim or (y+dy) == dim or (z+dz) == dim: continue
            s.append((x+dx,y+dy,z+dz,False))

    # if x < 0 or y < 0 or z < 0 or x == dim or y == dim or z == dim:
    #     return
    # index = x * dim * dim + y * dim + z
    # if index in visited:
    #     return
    # visited.add(index)
    # CheckValid(x,y,z)
    # for dx,dy,dz in directions:
    #     DFS(x+dx, y+dy, z+dz, visited)
    # CheckValid(x,y,z)


def CheckValid(x,y,z):
    labels = ["px", "nx", "ny", "py", "nz", "pz"]
    current = grid[x * dim * dim + y * dim + z]
    if current.collapsed: return
    for i in range(6):
        dx, dy, dz = directions[i]
        label = labels[i]
        if (x+dx) < 0 or (y+dy) < 0 or (z+dz) < 0 or (x+dx) == dim or (y+dy) == dim or (z+dz) == dim:
            continue
        index = (x+dx) * dim * dim + (y+dy) * dim + (z+dz)
        cell = grid[index]
        validneighbors = set()
        for opt in cell.options:
            validneighbors = validneighbors.union(set(blocks[opt].neighbors[label]))
        current.options = current.options.intersection(validneighbors)
    
    
    

def Combine():
    mesh = None
    for i in range(dim):
        for j in range(dim):
            for k in range(dim):
                index = i * dim * dim + j * dim + k
                if not grid[index].collapsed: continue
                m = blocks[list(grid[index].options)[0]].mesh
                if m == "": continue
                if mesh == None:
                    mesh = copy.deepcopy(m).translate((i*2, j*2, k*2))
                else:
                    mesh += copy.deepcopy(m).translate((i*2, j*2, k*2))
    mesh.compute_vertex_normals()
    o3d.visualization.draw_geometries([mesh])
    print(np.ndarray.flatten(np.asarray(mesh.vertices))) 
    print(np.asarray(mesh.triangles))
if __name__ == "__main__":
    LoadPrototypes()
    Setup()
    Generate()
    Combine()
