# start by faking it
def build_height_options(tile_data):
    res = {
        "0": [],
        "default": []
    }
    for name, tile in tile_data.items():
        if tile.get("ground", False):
            res["0"].append(name)
        res["default"].append(name)
    # print("height option map:\n", res)
    return res
