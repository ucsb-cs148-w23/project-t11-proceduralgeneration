import { useContext, useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { ControlsContext } from '../App.js';

export default function Model(props) {
  const { numDownload, meshRef } = useContext(ControlsContext);

  // create persistent variable, initialize once
  const link = useRef();
  useEffect(() => {
    link.current = document.createElement('a');
    link.current.style.display = 'none';
    document.body.appendChild(link.current);
  })

  // ---------------------
  // save file functions
  function saveFile(blob, filename) {
    link.current.href = URL.createObjectURL(blob);
    link.current.download = filename;
    link.current.click();
  }

  function saveString(text, filename) {
    saveFile( new Blob( [ text ], { type: 'text/plain' } ), filename );
  }

  function saveArrayBuffer( buffer, filename ) {
    saveFile( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
  }
  
  // numDownload change ~= set download flag
  useEffect(() => {
    if (numDownload > 0) {
      const exporter = new GLTFExporter();
      exporter.parse(
        meshRef.current, 
        (gltf) => {
          const output = JSON.stringify(gltf, null, 2);
          console.log('File gltf stringified', output);
          saveString(output, 'model.gltf');
        }, 
        (error) => {
          console.log('Error when parsing', error);
        },
        {} // options
      );
    }
  }, [numDownload]);

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
