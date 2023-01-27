import random
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/generate_map')
@app.route('/generate_map/<int:num_points>')
def generate_map(num_points=3):
    # STUB: return random vertices
    # TODO: convert Andy's proof of concept
    vertices = []
    for _ in range(num_points):
        vertices += [random.randint(-10, 10) for _ in range(3)]
    return jsonify(vertices=vertices)
