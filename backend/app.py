import argparse
import json
import random
from copy import deepcopy
from flask import Flask, jsonify, request
from flask_cors import CORS 

from wfc import EnvironmentGenerator
from expand_rotation import expand_rotations
from height_option_map import build_height_options

app = Flask(__name__)
CORS(app)

DEFAULT_TILE_PATH = "../prototypes/target.json"
with open(DEFAULT_TILE_PATH) as f:
    default_tile_data = json.load(f)

@app.route('/generate_map')
def generate_map():
    x = request.args.get('x', default=8, type=int)
    y = request.args.get('y', default=8, type=int)
    z = request.args.get('z', default=8, type=int)

    env_gen = EnvironmentGenerator((x, y, z), deepcopy(default_tile_data), prep_meshes=True)
    env_gen.generate()
    mesh = env_gen.assemble_mesh()
    vertex_array = env_gen.vertices_from_mesh(mesh)

    return jsonify(vertices=vertex_array)

@app.route('/generate', methods=['POST'])
def generate():
    request_data = request.json
    x = request_data["scale"].get("x", 8)
    y = request_data["scale"].get("y", 8)
    z = request_data["scale"].get("z", 8)
    tile_data = request_data.get("tile_data", deepcopy(default_tile_data))
    use_defaults = not request_data.get("expand_rotation", False)
    
    if use_defaults:
        env_gen = EnvironmentGenerator(shape=(x, y, z), tile_data=tile_data)
    else:
        tile_data = expand_rotations(tile_data)
        height_option_map = build_height_options(tile_data)
        env_gen = EnvironmentGenerator(shape=(x, y, z), tile_data=tile_data, height_option_map=height_option_map)

    env_gen.generate()
    tiles = env_gen.format_tile_array()
    
    return jsonify(tiles=tiles)

@app.route('/random_triangles')
# @cross_origin()
def random_triangles():
    scale = request.args.get('scale', default=5, type=float)
    count = request.args.get('count', default=1, type=int)
    vertices = [random.uniform(-scale, scale) for _ in range(count * 9)]
    return jsonify(vertices=vertices)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--host', '-ho', default="0.0.0.0")
    parser.add_argument('--port', '-p', type=int, default=8080)
    parser.add_argument('--dev', action='store_true')
    args = parser.parse_args()

    if args.dev:
        app.run(
            host=args.host,
            port=args.port
        )
    else:
        app.run(
            host=args.host,
            port=args.port,
            ssl_context=('cert.pem', 'key.pem')
        )
