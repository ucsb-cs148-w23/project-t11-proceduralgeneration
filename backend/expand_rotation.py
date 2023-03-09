from collections import defaultdict
# import numpy as np
import json

symmetry_rotation = {
    0: [0, 1, 2, 3],
    2: [0, 1],
    4: [0]
}

def expand_rotations(tile_data):
    expanded = {}
    for name, tile in tile_data.items():
        turns = symmetry_rotation[tile.get("symmetry", 0)]
        for rotation in turns:
            r_name = _rotate_tile(name, rotation, tile_data)
            expanded[r_name] = {
                "mesh": tile["mesh"],
                # "rotation": rotation * np.pi / 2,
                # let the frontend multiply by pi/2
                "rotation": rotation, 
                "valid_neighbors": _rotate_neighbors(tile["valid_neighbors"], rotation, tile_data),
                "weight": tile.get("weight", 1),
                "ground": tile.get("ground", False)
            }
            # print(name, tile, r_name, expanded[r_name], sep='\n')

    return expanded

def _rotate_neighbors(base_neighbors, rotation, tile_data):
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
        for neighbor, r in base_neighbors[d]:
            rotated_neighbors[d].append(
                _rotate_tile(neighbor, r + rotation, tile_data)
            )

    # rotate neighbors
    # ds = ["px", "py", "nx", "ny"]
    # ds = ["px", "py", "nx", "ny"][::-1]
    ds = ["ny", "nx", "py", "px"]
    for i in range(4): 
        # previous and next direction
        pd = ds[i]
        nd = ds[(i + rotation) % 4]
        for neighbor, r in base_neighbors[pd]:
            rotated_neighbors[nd].append(
                _rotate_tile(neighbor, r + rotation, tile_data)
            )

    return rotated_neighbors
    

def _rotate_tile(tile, rotation, tile_data):
    assert len(tile.split("_r")) == 1
    symmetry = tile_data[tile].get("symmetry", 0)
    if symmetry == 0:
        return f"{tile}_r{rotation % 4}"
    elif symmetry == 2:
        return f"{tile}_r{rotation % 2}"
    else:
        return f"{tile}_r0"

if __name__ == "__main__":
    with open("../prototypes/collapsed.json") as f:
        data = json.load(f)

    expanded = expand_rotations(data)
    with open("expanded_rev.json", 'w') as f:
        json.dump(expanded, f, indent=4)

    # with open("../prototypes/v2.json") as f:
    #     target = json.load(f)
