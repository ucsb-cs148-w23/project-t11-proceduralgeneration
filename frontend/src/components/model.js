import { useRef, useEffect, useContext } from 'react'
import { DoubleSide } from "three";
import { defaultVertexCount } from '../constants.js';
import { ControlsContext } from '../App.js';
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'

export default function Model(props) {
  console.log("re-render!\nlogging from Model: ", props.vertices);
  const pointsRef = useRef(props.vertices);
  const { color } = useContext(ControlsContext);
  
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
    //
    // apparently pointsRef gets updated too by this effect
    // console.log("pointsRef: ", pointsRef);
  }, [props.vertices]);

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
      <meshBasicMaterial color={color} side={DoubleSide}/>
    </mesh>
  );
}


