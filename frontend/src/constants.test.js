import TEMPLE_VERTICES from './temple.js';
import {MAX_POINTS,defaultVertexCount,defaultVertices} from './constants.js';

test('properly set MAX_POINTS',()=>{
   expect(MAX_POINTS).toBe(1000000);
})

test('defaultVertices is correct',()=>{
    const tmp = new Float32Array(MAX_POINTS * 3);
    for (let i = 0; i < TEMPLE_VERTICES.length; i++) {
        tmp[i] = TEMPLE_VERTICES[i];
    }
    expect(tmp).toStrictEqual(defaultVertices);

})

test('defaultVertexCount is correct',()=>{
    expect(defaultVertexCount).toBe(TEMPLE_VERTICES.length / 3);
})
