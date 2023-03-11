import argparse
import json
import random
import pymongo
from copy import deepcopy
from flask import Flask, jsonify, request
from flask_cors import CORS 
import uuid

from wfc import EnvironmentGenerator
from expand_rotation import expand_rotations
from height_option_map import build_height_options

app = Flask(__name__)
CORS(app)


mongodb_client = pymongo.MongoClient("mongodb+srv://christinetu:test123@cs148.id7aaen.mongodb.net/?retryWrites=true&w=majority")
db = mongodb_client.get_database('users')
records = db.register


# DEFAULT_TILE_PATH = "../prototypes/p2.json"
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
    # tile_data = deepcopy(default_tile_data)
    tile_data = request_data.get("tile_data", deepcopy(default_tile_data))
    # rotation expand doesn't work rn
    use_defaults = not request_data.get("expand_rotation", False)
    
    if use_defaults:
        env_gen = EnvironmentGenerator(shape=(x, y, z), tile_data=tile_data)
    else:
        tile_data = expand_rotations(tile_data)
        # gotta add more detailed height mapping, just use default
        height_option_map = build_height_options(tile_data)
        env_gen = EnvironmentGenerator(shape=(x, y, z), tile_data=tile_data, height_option_map=height_option_map)
        # env_gen.debug = True

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

@app.route('/login', methods=['POST'])
def login_user():
    # if email isn't in db, add new account
    # print(request.data)
    # print(request.get_json())
    user_email = request.get_json().get("email")
    user_found = records.find_one({"email": user_email})
    # print(user_email)
    # print(user_found)
    # because there's a null user in db
    if not user_found:
        create_new_user = {
            "email": user_email,
            "saved_models": {}
        }
        records.insert_one(create_new_user)
        return {"result": "user saved"}
    return {"result": user_found["email"]}

@app.route('/get_saved', methods=['POST'])
def get_saved_models():
    user_email = request.get_json().get("email")
    user_found = records.find_one({"email": user_email})

    # get saved files
    if user_found:
        return {"models": user_found["saved_models"]}
    else:
        return {"resp": "User not found!"}

@app.route('/save_model', methods=['POST'])
def saved_model():
    user_email = request.get_json().get("email")
    save_model = request.get_json().get("model")
    model_name = request.get_json().get("name")
    user_found = records.find_one({"email": user_email})

    # get saved files
    if user_found:
        updated_user = deepcopy(user_found)
        # create a new hash => save 
        """
        hash: {
            vertices: [list of vertices],
            name: name of saved model
        }
        """
        model_id = str(uuid.uuid1())

        updated_user["saved_models"][model_id] = {
            "vertices": save_model,
            "name": model_name
        }
        #DOUBLE CHECK THAT THIS UPDATES!!!
        records.replace_one(user_found, updated_user)
        return {"resp": "saved model!"}
    else:
        return {"resp": "User not found!"}

@app.route('/update_model_name', methods=['POST'])
def update_model_name():
    user_email = request.get_json().get("email")
    model_id = request.get_json().get("id")
    new_model_name = request.get_json().get("name")
    user_found = records.find_one({"email": user_email})

    # get saved files
    if user_found:
        updated_user = deepcopy(user_found)
        """
        hash: {
            vertices: [list of vertices],
            name: name of saved model
        }
        """
        updated_user["saved_models"][model_id]["name"] = new_model_name
        #DOUBLE CHECK THAT THIS UPDATES!!!
        records.replace_one(user_found, updated_user)
        return {"resp": "your model has been updated! :D"}
    else:
        return {"resp": "User not found!"}

@app.route('/get_model', methods=['POST'])
def get_model():
    user_email = request.get_json().get("email")
    model_id = request.get_json().get("id")
    user_found = records.find_one({"email": user_email})

    # get saved model
    if user_found:
        """
        hash: {
            vertices: [list of vertices],
            name: name of saved model
        }
        """
        model = user_found["saved_models"][model_id]
        #DOUBLE CHECK THAT THIS UPDATES!!!
        return {
            "id": model_id,
            "model": model
        }
    else:
        return {"resp": "User not found!"}


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
