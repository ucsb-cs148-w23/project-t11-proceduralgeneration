import { useRef, useEffect, useContext } from 'react';
import { DoubleSide } from "three";
import { defaultVertexCount } from '../constants.js';
import { ControlsContext } from '../App.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'

export default function Model(props) {
  console.log("re-render!\nlogging from Model: ", props.vertices);
  const pointsRef = useRef(props.vertices);
  const { color, numDownload } = useContext(ControlsContext);
  
  const meshRef = useRef();

  useEffect(() => {
    for (let i = 0; i < props.vertices.length; i++) {
      // pointsRef.current[i] = props.vertices[i];
      meshRef.current.geometry.attributes.position.array[i] = props.vertices[i];
    }
    // meshRef.current.geometry.setDrawRange(0, props.vertexCount);
    meshRef.current.geometry.attributes.position.count = props.vertexCount;
    meshRef.current.geometry.attributes.position.updateRange.count = props.vertexCount * 3
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    console.log(meshRef.current.geometry.drawRange);
    // apparently pointsRef gets updated too by this effect
    // console.log("pointsRef: ", pointsRef);
  }, [props.vertices, props.vertexCount]);

  // create persistent variable, initialize once
  const link = useRef();
  useEffect(() => {
    link.current = document.createElement('a');
    link.current.style.display = 'none';
    document.body.appendChild(link.current);
  })

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

  return (
    <mesh ref={meshRef} position={props.position} >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={pointsRef.current}
          count={defaultVertexCount}
          // array={defaultVertices}
          // count={props.vertexCount}
          itemSize={3}
        /> 
      </bufferGeometry>
      <meshStandardMaterial color={color} flatShading={true} side={DoubleSide}/>
      {/* <meshBasicMaterial color={color} side={DoubleSide}/> */}
      {/* <meshStandardMaterial side={DoubleSide}/> */}
    </mesh>
  );
}


