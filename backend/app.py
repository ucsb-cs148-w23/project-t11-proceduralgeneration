import random
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate_map')
def generate_map():
    return jsonify(msg="please implement me")

@app.route('/random_triangles')
def random_triangles():
    scale = request.args.get('scale', default=5, type=float)
    count = request.args.get('count', default=1, type=int)
    vertices = [random.uniform(-scale, scale) for _ in range(count * 9)]
    return jsonify(vertices=vertices)
