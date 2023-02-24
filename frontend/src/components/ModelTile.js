import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const gltf = useLoader(GLTFLoader, props.modelPath);
  const primitiveProps = {
    object: gltf.scene.clone(true),
    position: props.position,
    rotation: props.rotation
  };
  return (
    <primitive {...primitiveProps} />
  );
}
