import random
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from wfc import WFCSolver
from vertices import vertex_array_from_triangle_mesh

app = Flask(__name__)
CORS(app)

@app.route('/generate_map')
def generate_map():
    dim = request.args.get('dim', default=5, type=int)

    solver = WFCSolver(dim=dim)
    solver.generate()
    mesh = solver.get_mesh()
    vertex_array = vertex_array_from_triangle_mesh(mesh)

    return jsonify(vertices=vertex_array)

@app.route('/random_triangles')
# @cross_origin()
def random_triangles():
    scale = request.args.get('scale', default=5, type=float)
    count = request.args.get('count', default=1, type=int)
    vertices = [random.uniform(-scale, scale) for _ in range(count * 9)]
    return jsonify(vertices=vertices)

