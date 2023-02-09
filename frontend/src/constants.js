import TEMPLE_VERTICES from './temple.js';
const MAX_POINTS = 1000000;
const defaultVertices = new Float32Array(MAX_POINTS * 3);
for (let i = 0; i < TEMPLE_VERTICES.length; i++) {
  defaultVertices[i] = TEMPLE_VERTICES[i];
}
const defaultVertexCount = TEMPLE_VERTICES.length / 3;
export { MAX_POINTS, defaultVertices, defaultVertexCount };
