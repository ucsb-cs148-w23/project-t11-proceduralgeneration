import './App.css';
import Header from './components/Header.js'
import Model from './components/Model.js'
import { Canvas } from '@react-three/fiber'
import { useState, createContext } from 'react';
import { OrbitControls } from '@react-three/drei'
import Paper from '@mui/material/Paper';
import ControlPanel from './components/ControlPanel.js'
import { defaultVertices } from './constants.js';
// import Slider from '@mui/material/Slider';

// const dummy = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
// for (let i = 0; i < 9; i++) {
//   defaultVertices[i] = dummy[i];
// }

const ControlsContext = createContext();

function App() {
  const [vertices, setVertices] = useState(defaultVertices);
  const [vertexCount, setVertexCount] = useState(9);
  const [triangleCount, setTriangleCount] = useState(1);
  const [triangleSize, setTriangleSize] = useState(1);

  return (
    <ControlsContext.Provider 
      value={{ 
        vertices, setVertices, 
        vertexCount, setVertexCount, 
        triangleCount, setTriangleCount, 
        triangleSize, setTriangleSize 
      }}
    >
      <div className="App">
        <Header className="header" />
        <div className="content"> 
          <Paper className="canvas-container">
              <Canvas>
                <OrbitControls />
                <Model 
                  position={[0, 0, 0]}
                  vertices={vertices} 
                  vertexCount={vertexCount}
                />
              </Canvas>
          </Paper>
          <ControlPanel />
        </div>
      </div>
    </ControlsContext.Provider>
  );
}

export { ControlsContext };
export default App;
