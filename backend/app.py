import random
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate_map')
@app.route('/generate_map/<int:scale>')
@app.route('/generate_map/<int:scale>/<int:numtriangle>')
def generate_map(scale=8, numtriangle=1):
    # STUB: return random triangle
    # TODO: convert Andy's proof of concept
    vertices = [random.randint(-scale, scale) for _ in range(9 * numtriangle)]
    return jsonify(vertices=vertices)
