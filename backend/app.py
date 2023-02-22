import random
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from wfc import EnvironmentGenerator

app = Flask(__name__)
CORS(app)

@app.route('/generate_map')
def generate_map():
    x = request.args.get('x', default=8, type=int)
    y = request.args.get('y', default=8, type=int)
    z = request.args.get('z', default=8, type=int)

    env_gen = EnvironmentGenerator(shape=(x, y, z))
    env_gen.generate()
    mesh = env_gen.assemble_mesh()
    vertex_array = env_gen.vertices_from_mesh(mesh)

    return jsonify(vertices=vertex_array)

@app.route('/random_triangles')
# @cross_origin()
def random_triangles():
    scale = request.args.get('scale', default=5, type=float)
    count = request.args.get('count', default=1, type=int)
    vertices = [random.uniform(-scale, scale) for _ in range(count * 9)]
    return jsonify(vertices=vertices)

if __name__ == '__main__':
    app.run(
        host="0.0.0.0", 
        port=8080,
        ssl_context=('cert.pem', 'key.pem')
    )
