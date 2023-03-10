import { useContext } from 'react';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ControlsContext } from '../App.js';

function defaultCallback() {
  console.log("clicked");
}


export default function ModelTile(props) {
  const { setClickedTile, modelTiles } = useContext(ControlsContext);

  function selectTile(e) {
    e.stopPropagation();
    setClickedTile(props.idx);
    console.log(modelTiles[props.idx]);
  }

  // load model
  const gltf = useLoader(GLTFLoader, props.modelPath);
  const primitiveProps = {
    object: gltf.scene.clone(true),
    position: props.position,
    rotation: props.rotation,
    onClick: props.onClick || selectTile
  };

  // actual component
  return (
    <primitive {...primitiveProps} />
  );
}
