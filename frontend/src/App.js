import './App.css';
import Header from './components/header.js'
import Model from './components/model.js'
import Slider from './components/slider.js'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react';
import { OrbitControls } from '@react-three/drei'

const dummy = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
const MAX_POINTS = 500;
const defaultVertices = new Float32Array(MAX_POINTS * 3);
for (let i = 0; i < 9; i++) {
  defaultVertices[i] = dummy[i];
}

function App() {
  const [vertices, setVertices] = useState(defaultVertices);
  const [vertexCount, setVertexCount] = useState(9);
  // const [requireUpdate, setRequireUpdate] = useState(false);

  function onClickGenerate() {
    console.log("clicked generate");
    fetch("http://127.0.0.1:5000/generate_map/8/2")
      .then(r => r.json())
      .then(data => {
        console.log(data);
        if (data.vertices.length <= MAX_POINTS * 3) {
          setVertices(new Float32Array(data.vertices));
          setVertexCount(data.vertices.length / 3);
        } else {
          console.log("error: too many points");
        }
      });
  }

  return (
    <div className="App">
      <Header className="header" />
      <div className="canvas-container">
        <Canvas>
          {/* <ambientLight intensity={0.5} /> */}
          {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
          {/* <pointLight position={[-10, -10, -10]} /> */}
          <OrbitControls />
          <Model 
            position={[0, 0, 0]}
            vertices={vertices} 
            vertexCount={vertexCount}
          />
        </Canvas>
      </div>

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
