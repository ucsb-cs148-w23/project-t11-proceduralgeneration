from collections import defaultdict
import numpy as np
import json

def expand_rotations(tile_data):
    expanded = {}
    for name, tile in tile_data.items():
        for rotation in range(4):
            r_name = _rotate_tile(name, rotation)
            expanded[r_name] = {
                "mesh": tile["mesh"],
                # "rotation": rotation * np.pi / 2,
                "rotation": rotation, 
                "valid_neighbors": _rotate_neighbors(tile["valid_neighbors"], rotation),
                "weight": tile["weight"],
                "ground": tile.get("ground", False)
            }
    with open("beans.json", 'w') as f:
        json.dump(expanded, f, indent=4)
        print("wrote expanded to bean.json")
    return expanded

def _rotate_neighbors(base_neighbors, rotation):
    """
    mapping
    nz -> nz
    pz -> pz
    
    px -> py
    py -> nx
    nx -> ny
    ny -> px

    """
    rotated_neighbors = defaultdict(list)
    # print(base_neighbors)
    # match rotation
    for d in ("pz", "nz"):
        for neighbor, neighbor_rotation in base_neighbors[d].items():
            rotated_neighbors[d].append(
                _rotate_tile(neighbor, neighbor_rotation + rotation)
            )

    # rotate neighbors
    ds = ["px", "py", "nx", "ny"]
    for i in range(4): 
        # previous and next direction
        pd = ds[i]
        nd = ds[(i + rotation) % 4]
        for neighbor, neighbor_rotation in base_neighbors[pd].items():
            rotated_neighbors[nd].append(
                _rotate_tile(neighbor, neighbor_rotation + rotation)
            )

    return rotated_neighbors
    

def _rotate_tile(tile, rotation):
    splt = tile.split("_r")
    if len(splt) == 2:
        name, r = splt
        r = int(r)
    else:
        name = splt[0]
        r = 0
    return f"{name}_r{(r + rotation) % 4}"
