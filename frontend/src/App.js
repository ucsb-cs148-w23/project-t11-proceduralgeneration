import './App.css';
import Header from './components/header.js'
import Model from './components/model.js'
import Slider from './components/slider.js'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react';
import { OrbitControls } from '@react-three/drei'
import { DoubleSide } from "three";

const defaultVertices = [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0,

	 2, 0, 0,
	 0, 0, 2,
	 0, 2, 0
];

function App() {
  const [vertices, setVertices] = useState(defaultVertices);
  const [color, setColor] = useState(0);
  const [requireUpdate, setRequireUpdate] = useState(false);

  function onClickGenerate() {
    console.log("lol");
    
    fetch("http://127.0.0.1:5000/generate_map/8/2")
      .then(r => r.json())
      .then(data => {
        console.log(data);
        // setVertices(new Float32Array(data.vertices));
        setVertices(data.vertices);
        console.log("vertices: ", vertices);
      });
  }

  return (
    <div className="App">
      <Header className="header" />
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls />
        <Model 
          vertices={vertices} 
          position={[0, 0, 0]}
        />
      </Canvas>

      <body className="body">
        <button 
          className="button" 
          onClick={onClickGenerate}
        >
          Generate
        </button>
      </body>

      <Slider className="scale-slider"></Slider>
    </div>
  );
}

export default App;
