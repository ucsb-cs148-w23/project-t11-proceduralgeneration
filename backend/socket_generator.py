import json
import open3d as o3d
import numpy as np

class SocketGenerator:
    def __init__(self, mesh_list):
        self.mesh_list = mesh_list
        self.sockets_counter = 0
        self.side_sockets = set()
        self.sockets = set()


    def _border_is_symmetrical(self, border_vertices):
        pass

    
    def _get_border_vertices(self, mesh):
        # Compute adjacency list
        adjacency_list = mesh.compute_adjacency_list()

        # Define bordering cube
        xmin, ymin, zmin = np.min(mesh.vertices, axis=0)
        xmax, ymax, zmax = np.max(mesh.vertices, axis=0)
        tolerance = 1e-6  # small tolerance to avoid rounding errors
        border_cube = o3d.geometry.AxisAlignedBoundingBox(
            min_bound=(xmin - tolerance, ymin - tolerance, zmin - tolerance),
            max_bound=(xmax + tolerance, ymax + tolerance, zmax + tolerance),
        )
        
        # Find border vertices in each direction
        border_vertices = { 
            'nx': [], 'px': [], 
            'ny': [], 'py': [], 
            'nz': [], 'pz': []
        }
        for face in range(6):
            # Extract vertices on face of the bounding box
            face_vertices = border_cube.get_face_vertices(face)
            
            # Check for intersection with mesh triangles
            for i, vertex in enumerate(mesh.vertices):
                adjacent_triangles = adjacency_list[i]
                for triangle in adjacent_triangles:
                    triangle_vertices = mesh.vertices[triangle]
                    if o3d.geometry.TriangleMesh.has_points(triangle_vertices, face_vertices):
                        if face == 0:
                            border_vertices['nx'].append(i)
                        elif face == 1:
                            border_vertices['px'].append(i)
                        elif face == 2:
                            border_vertices['ny'].append(i)
                        elif face == 3:
                            border_vertices['py'].append(i)
                        elif face == 4:
                            border_vertices['nz'].append(i)
                        else:
                            border_vertices['pz'].append(i)

        



if __name__ == "__main__":
    sg = SocketGenerator()