// import { useContext, useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ControlsContext } from '../App.js';

export default function ModelTile(props) {
  // const { numDownload, meshRef } = useContext(ControlsContext);

  // load model
  const gltf = useLoader(GLTFLoader, props.modelPath);
  const primitiveProps = {
    object: gltf.scene.clone(true),
    position: props.position,
    rotation: props.rotation
  };

  // actual component
  return (
    <primitive {...primitiveProps} />
  );
}
