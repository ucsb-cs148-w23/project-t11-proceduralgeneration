import { useContext } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import InputSlider from './InputSlider.js'
import { ControlsContext } from '../App.js';
import { MAX_POINTS } from '../constants.js';

export default function ControlPanel() {
  const { 
    vertices, setVertices, 
    vertexCount, setVertexCount, 
    triangleCount, setTriangleCount, 
    triangleSize, setTriangleSize 
  } = useContext(ControlsContext);

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
    <Grid 
      container
      className="control-panel"
      direction="column"
      rowSpacing={3}
    >
      <Grid item>
        <Typography>
          The current placeholder endpoint generates random triangles
        </Typography>
      </Grid>
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
  );
}
