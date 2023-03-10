import json
import open3d as o3d
import numpy as np
import math
import pprint
import os

class SocketGenerator:
    TEST_MESH = o3d.io.read_triangle_mesh("../CityModels/onewayroad.gltf")
    _DIRECTIONS = ['px', 'py', 'pz', 'nx', 'ny', 'nz']

    def __init__(self, mesh_list=[], mesh_size=2):
        self._protos = {f'proto_{i}': {"mesh": mesh, "rotation": 0, "sockets": {}} for (i, mesh) in enumerate(mesh_list)}
        self._proto_counter = len(mesh_list)
        self._socket_counter = 0
        self._lateral_sockets = {}
        self._vertical_sockets = {}
        self._bounds = {d: (0.5 if d[0] == 'p' else -0.5) * mesh_size for d in SocketGenerator._DIRECTIONS}
        self._process_prototypes()


    def add_mesh(self, mesh_file):
        proto_name = f'proto_{self._proto_counter}'
        self._proto_counter += 1
        self._protos[proto_name] = {"mesh": mesh_file, "rotation": 0, "sockets": {}}
        mesh = o3d.io.read_triangle_mesh(mesh_file)
        border_vertices = self._get_border_vertices(mesh)
        for d in SocketGenerator._DIRECTIONS:
            mode = "lateral" if d[1] != 'z' else "vertical"
            self._protos[proto_name]["sockets"][d] = self._process_face(border_vertices[d], mode=mode)


    def get_protos(self):
        return self._protos


    def write(self, path):
        with open(path, "w") as outfile:
            outfile.write(json.dumps(self.get_protos(), indent=4))

    
    def test(self, mesh=TEST_MESH):
        border_vertices = self._get_border_vertices_dict(mesh)
        pprint.pprint(border_vertices)
        for d in border_vertices:
            # print(d, SocketGenerator._border_is_symmetrical_y(border_vertices[d]))
            pass
        print(self._bounds)
            # print(type(border_vertices[))
    
    @staticmethod
    def _rotate90(point):
        R = np.array([[0, -1], [1, 0]])
        return (R @ np.array(point)).tolist()
    
        
    @staticmethod
    def _contains_close(pt, points):
        for point in points:
            if np.allclose(point, pt): return True

        return False


    @staticmethod
    def _border_is_symmetrical_y(border_vertices):
        reflected = [[-v[0], v[1]] for v in border_vertices]
        for vertex in border_vertices:
            if not SocketGenerator._contains_close(vertex, reflected): return False

        return True


    @staticmethod
    def _vertices_equiv(vertices1, vertices2):
        for v in vertices1:
            if not SocketGenerator._contains_close(v, vertices2): return False

        for v in vertices2:
            if not SocketGenerator._contains_close(v, vertices1): return False
            
        return True


    @staticmethod
    def _serialize(vertices):
        return json.dumps(vertices)


    @staticmethod
    def _normalize_face(vertices, direction):
        if direction == 'px': vertices = [[-y, z] for x, y, z in vertices]
        if direction == 'ny': vertices = [[-x, z] for x, y, z in vertices]
        if direction == 'nx': vertices = [[y, z] for x, y, z in vertices]
        if direction == 'py': vertices = [[x, z] for x, y, z in vertices]
        if direction[1] == 'z': vertices = [[x, y] for x, y, z in vertices]
        
        no_dupes = []
        [no_dupes.append(v) for v in vertices if v not in no_dupes]

        return no_dupes

    
    def _get_border_vertices_dict(self, mesh):
        border_vertices = {d: [] for d in SocketGenerator._DIRECTIONS}
        for vertex in mesh.vertices:
            vertex = vertex.tolist()
            if math.isclose(vertex[0], self._bounds['px']): border_vertices['px'].append(vertex)
            if math.isclose(vertex[2], self._bounds['pz']): border_vertices['pz'].append(vertex)
            if math.isclose(vertex[1], self._bounds['py']): border_vertices['py'].append(vertex)
            if math.isclose(vertex[0], self._bounds['nx']): border_vertices['nx'].append(vertex)
            if math.isclose(vertex[1], self._bounds['ny']): border_vertices['ny'].append(vertex)
            if math.isclose(vertex[2], self._bounds['nz']): border_vertices['nz'].append(vertex)

        border_vertices = {d: SocketGenerator._normalize_face(border_vertices[d], d) for d in SocketGenerator._DIRECTIONS}
        return border_vertices

    
    # Checks if vertices already exist in specified sockets
    def _face_find(self, vertices, mode="lateral"):
        sockets = self._lateral_sockets if mode == "lateral" else self._vertical_sockets
        seen = [json.loads(key) for key in sockets.keys()]
        for face_vertices in seen:
            if SocketGenerator._vertices_equiv(vertices, face_vertices): return sockets[SocketGenerator._serialize(face_vertices)]
            
        return None


    def _find_flipped(self, vertices):
        seen = [json.loads(key) for key in self._lateral_sockets.keys()]
        flipped = [[-v[0], v[1]] for v in vertices]
        return self._face_find(flipped, mode='lateral')

    
    def _find_rotation(self, vertices):
        for i in range(1, 3):
            vertices = [SocketGenerator._rotate90(v) for v in vertices]
            socket = self._face_find(vertices, mode="vertical")
            if socket: return (str(socket), i)

        return (None, -1)


    def _add_socket(self, vertices, socket, mode):
        if mode == "lateral":
            self._lateral_sockets[SocketGenerator._serialize(vertices)] = socket
        else:
            self._vertical_sockets[SocketGenerator._serialize(vertices)] = socket


    def _process_face(self, vertices, mode="lateral"):
        socket = self._face_find(vertices, mode)
        # Already exists
        if socket: return socket

        if mode == "lateral":
            socket = self._find_flipped(vertices)
            # Found flipped
            if socket:
                socket += '_f'
                self._add_socket(vertices, socket, mode)
                return socket

            # Not found create new socket
            socket = str(self._socket_counter)
            self._socket_counter += 1
            if SocketGenerator._border_is_symmetrical_y(vertices):
                socket += '_s'

            self._add_socket(vertices, socket, mode)
            return socket

        else:
            socket, r = self._find_rotation(vertices)
            if socket:
                socket += f'_{r}'
                self._add_socket(vertices, socket, mode)
                return socket

            socket = str(self._socket_counter) + '_0'
            self._add_socket(vertices, socket, mode)
            self._socket_counter += 1
            return socket


    def _process_prototypes(self):
        for key, proto in self._protos.items():
            mesh = o3d.io.read_triangle_mesh(proto["mesh"])
            border_vertices = self._get_border_vertices_dict(mesh)
            for d in SocketGenerator._DIRECTIONS:
                mode = "lateral" if d[1] != 'z' else "vertical"
                self._protos[key]["sockets"][d] = self._process_face(border_vertices[d], mode=mode)
            
        
if __name__ == "__main__":
    mesh_list = ["../CityModels/default.gltf",
                 "../CityModels/doorblock.gltf",
                 "../CityModels/onewayroad.gltf",
                 "../CityModels/roofedge.gltf",
                 "../CityModels/roofside.gltf",
                 "../CityModels/stair.gltf",
                 "../CityModels/twowayroad.gltf",
                 "../CityModels/twowindow.gltf",
                 "../CityModels/twowindowsimp.gltf"]

    sg = SocketGenerator(mesh_list)
    sg.write("../prototypes/generated.json")

