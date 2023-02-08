import numpy as np
import open3d as o3d


def vertex_array_from_triangle_mesh(mesh):
    vertices = np.asarray(mesh.vertices)
    triangles = np.asarray(mesh.triangles)
    vertex_array = []
    for triangle in triangles:
        for vertex_index in triangle:
            for x in vertices[vertex_index]:
                vertex_array.append(x)
    return vertex_array
            
