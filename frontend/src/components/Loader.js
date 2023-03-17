import { useContext, useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'
import { ControlsContext } from '../Root.js';
import { Html, Text, PerspectiveCamera } from '@react-three/drei'
import { useTheme } from '@mui/material/styles';
import Lato from "../fonts/Lato-Regular.ttf";
import './style.css'


function LoadingScreen() {
  const myMesh = useRef();
  
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = -a;
    myMesh.current.rotation.z = -2.5 * a;
    myMesh.current.rotation.y = -1.5 * a;
  });

  return (
    <mesh ref={myMesh} scale={[2,2,2]}>
      <icosahedronGeometry attach="geometry" args={[1, 1]}/>
      <meshBasicMaterial attach="material" wireframe wireframeLinewidth={10} color="royalblue" toneMapped={false} />
    </mesh>
  );
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const nextLoadText = {
  "Loading": "Loading .",
  "Loading .": "Loading . .",
  "Loading . .": "Loading . . .",
  "Loading . . .": "Loading"
};

export default function Loader(props) {
    
  const { promiseInProgress } = useContext(ControlsContext);
  const [wiki, setWiki] = useState("");
  const [loadText, setLoadText] = useState("Loading");
  const theme = useTheme()
  const wikis = [
    "You can upload tiles locally!",
    "Logging in allow you to save your progress!",
    "You can customize the allowed neighbors of individual tiles!"
  ];

  useEffect(() => {
    const interval_text = setInterval(() => {
      setWiki(wikis[getRandomInt(wikis.length)]);
    }, 1500);
    const interval = setInterval(() => {
      setLoadText(loadText => {setLoadText(nextLoadText[loadText])});
    }, 300);
    return () => {
        clearInterval(interval_text);
        clearInterval(interval);
    };
  }, []);

  return ( 
    promiseInProgress && 
    <mesh>
      <PerspectiveCamera 
        makeDefault
        position={[0,-1,8]}
      />
      <LoadingScreen />
      <Text 
        color={theme.palette.mode === "dark" ? "white" : "black"}
        fontSize={0.2}
        position={[0,-2.75,0]}
        textAlign="center"
        lineHeight={2}
        font={Lato}
      >
        Did you know?{"\n"}{wiki}
      </Text>
      <Html center>
        <div className='loaderText' style={{fontFamily: "Lato"}}>
          {loadText}
        </div>
      </Html>
    </mesh>
  );
}
