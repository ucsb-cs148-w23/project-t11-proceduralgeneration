import { useContext } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TwitterPicker } from 'react-color';


import InputSlider from './InputSlider.js'
import { ControlsContext } from '../App.js';
import { MAX_POINTS } from '../constants.js';
import { defaultExpanded, defaultCollapsed } from '../defaultTiles.js';

export default function ControlPanel() {
  const { 
    numDownload, setNumDownload,
    scaleX, setScaleX,
    scaleY, setScaleY,
    scaleZ, setScaleZ,
    modelTiles, setModelTiles
  } = useContext(ControlsContext);

  function requestGeneration() {
    console.log("clicked generate");
    
    // -> local testing
    // const domain = "http://127.0.0.1"
    // -> server testing
    // const domain = "3.132.124.203"
    // -> prod
    const domain = "https://deez.mturk.monster"
    
    const generateUrl = new URL(`${domain}:8080/generate`);
    const postData = {
      "scale": {
        "x": scaleX,
        "y": scaleY,
        "z": scaleZ
      },
      "expand_rotation": true,
      "tile_data": defaultCollapsed
    };
    
    fetch(generateUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      .then(r => r.json())
      .then(data => {
        console.log(data);
        setModelTiles(data["tiles"]);
        console.log("model tiles:", modelTiles)
      }
    );
  }

  function requestDownload(){
    // console.log("download requested");
    setNumDownload(numDownload + 1);
  }

  /**
  function handleColorChange(color, event) {
    console.log("clicked color!");
    setColor(color.hex);
  }
  */

  return (
    <Grid 
      container
      className="control-panel"
      direction="column"
      rowSpacing={3}
    >
      <Grid item>
        <Typography>
          Choose the dimensions of the generated environment.
        </Typography>
      </Grid>
      <Grid item>
          <InputSlider 
            value={scaleX} 
            setValue={setScaleX} 
            label="X Scale" 
            className="control-panel-item"
          />
      </Grid>
      <Grid item>
        <InputSlider 
          value={scaleY} 
          setValue={setScaleY}
          label="Y Scale" 
          className="control-panel-item"
        />
      </Grid>
      <Grid item>
        <InputSlider 
          value={scaleZ} 
          setValue={setScaleZ}
          label="Z Scale"
          className="control-panel-item"
        />
      </Grid>
      <Grid item>
        <Typography sx={{marginBottom: 2}} gutterBottom>
          Mesh Color
        </Typography>
        <TwitterPicker
          color={color}
          onChangeComplete={handleColorChange}
        />
      </Grid>
      <Grid item></Grid>
      <Grid
        container
        direction="row"
        columnSpacing={3}>
        <Grid item>
          <Button variant="outlined" onClick={requestGeneration}>
            Generate
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={requestDownload}>
            Download
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
