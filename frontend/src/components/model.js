import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber';
import { DoubleSide } from "three";
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'


export default function Model(props) {
  // const refPoints = useRef();
  // const ref = useRef();
  // useFrame(() => {
  //   if (props.requireUpdate) {
  //     ref.current.setAttribute("array", props.vertices);
  //     ref.current.setAttribute("count", props.vertices.length / 3);
  //     props.setRequireUpdate(false);
  //   }
  // });
  // This reference gives us direct access to the THREE.Mesh object

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta))
  
  // Return the view, these are regular Threejs elements expressed in JSX
  console.log("logging from Model: ", props.vertices);
  let floatArray = new Float32Array(props.vertices);
  
  

  return (
    <mesh position={props.position} >
      <bufferGeometry>
        {/* <bufferAttribute ref={ref} attach="attributes-position" itemSize={3} /> */}
        <bufferAttribute
          attach="attributes-position"
          count={props.vertices.length / 3}
          array={floatArray}
          itemSize={3}
        /> 
      </bufferGeometry>
      <meshBasicMaterial color="orange" side={DoubleSide}/>
    </mesh>
  );
}


