import './App.css';
import Header from './components/Header.js'
import Model from './components/Model.js'
import { Canvas } from '@react-three/fiber'
import { useState, createContext, useContext } from 'react';
import { OrbitControls } from '@react-three/drei'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputSlider from './components/InputSlider.js'
import Grid from '@mui/material/Grid';
// import Slider from '@mui/material/Slider';

const MAX_POINTS = 500;
const defaultVertices = new Float32Array(MAX_POINTS * 3);
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

  function requestGeneration() {
    console.log("clicked generate");
    // local machine + stub endpoint
    const generateUrl = new URL("http://127.0.0.1:5000/random_triangles");
    generateUrl.searchParams.append("count", triangleCount);
    generateUrl.searchParams.append("scale", triangleSize);
    
    fetch(generateUrl)
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
        <Grid 
          container
          className="control-panel"
          direction="column"
          rowSpacing={3}
        >
          <Grid item>
              <InputSlider 
                value={triangleCount} 
                setValue={setTriangleCount} 
                label="Triangle Count" 
                className="control-panel-item"
              />
          </Grid>
          <Grid item>
            <InputSlider 
              value={triangleSize} 
              setValue={setTriangleSize} 
              label="Triangle Size" 
              className="control-panel-item"
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={requestGeneration}>
              Generate
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
