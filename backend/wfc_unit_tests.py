import unittest
import open3d as o3d
from parameterized import parameterized
from wfc import EnvironmentGenerator

test_shape = (0, 0, 0)
test_env_gen = EnvironmentGenerator(test_shape)
test_env_gen.generate()
test_mesh = test_env_gen.assemble_mesh()


class TestGenerate(unittest.TestCase):
    @parameterized.expand(
        [("test_empty_generate", []),]
    )
    def test_test_func(self, _name, expected):
        actual = test_env_gen.generate()
        self.assertEqual(actual, expected)


class TestVerticesFromMesh(unittest.TestCase):
    @parameterized.expand(
        [("test_empty_mesh", test_mesh, []),]
    )
    def test_test_func(self, _name, test_mesh, expected):
        actual = test_env_gen.vertices_from_mesh(test_mesh)
        self.assertEqual(actual, expected)


if __name__ == "__main__":
    unittest.main()
