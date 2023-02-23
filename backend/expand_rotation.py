from collections import defaultdict
import numpy as np

def expand_rotations(tile_data):
    expanded = {}
    for name, tile in tile_data.items():
        for rotation in range(4):
            r_name = _rotate_tile(name, rotation)
            expanded[r_name] = {
                "mesh": tile["mesh"],
                "rotation": rotation * np.pi / 2,
                "valid_neighbors": _rotate_neighbors(tile["valid_neighbors"], rotation)
            }
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
    # match rotation
    for d in ("pz, nz"):
        for neighbor, neighbor_rotation in base_neighbors[d]["valid_neighbors"].items():
            rotated_neighbors[d].append(
                _rotate_tile(neighbor, neighbor_rotation + rotation)
            )

    # rotate neighbors
    ds = ["px", "py", "nx", "ny"]
    for i in range(4): 
        pd = ds[i]
        nd = ds[(i + rotation) % 4]
        for neighbor, neighbor_rotation in base_neighbors[pd]["valid_neighbors"].items():
            rotated_neighbors[nd].append(
                _rotate_tile(neighbor, neighbor_rotation + rotation)
            )

    return rotated_neighbors
    

def _rotate_tile(tile, rotation):
    splt = tile.split("_r")
    if len(tile) == 2:
        name, r = splt
        r = int(r)
    else:
        name = splt
        r = 0
    return f"{name}_r{(r + rotation) % 4}"
