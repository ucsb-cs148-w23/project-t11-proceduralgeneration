import random
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/generate_map')
@app.route('/generate_map/<int:scale>')
def generate_map(scale=8):
    # STUB: return random triangle
    # TODO: convert Andy's proof of concept
    vertices = [random.randint(-scale, scale) for _ in range(9)]
    return jsonify(vertices=vertices)
