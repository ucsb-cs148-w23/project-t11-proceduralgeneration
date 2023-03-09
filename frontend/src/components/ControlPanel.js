import { useContext, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputSlider from './InputSlider.js'
import { ControlsContext } from '../App.js';
import { MAX_POINTS } from '../constants.js';
import { defaultExpanded, defaultCollapsed } from '../defaultTiles.js';
import SavedDialogue from './SavedDialogue.js';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import LoopIcon from '@mui/icons-material/Loop';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { defaultCollapsed } from '../defaultTiles.js';

export default function ControlPanel(props) {
  const { 
    numDownload, setNumDownload,
    scaleX, setScaleX,
    scaleY, setScaleY,
    scaleZ, setScaleZ,
    setModelTiles,
    setShowTileSettings,
    meshRef
  } = useContext(ControlsContext);
  //
  // create persistent variable, initialize once
  const link = useRef();
  useEffect(() => {
    link.current = document.createElement('a');
    link.current.style.display = 'none';
    document.body.appendChild(link.current);
  })

  // ---------------------
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
  
  // numDownload change ~= set download flag
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

  function requestGeneration() {
    console.log("clicked generate");
    
    // -> local testing
    const domain = "http://127.0.0.1"
    // -> server testing
    // const domain = "3.132.124.203"
    // -> prod
    // const domain = "https://deez.mturk.monster"
    
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
        setModelTiles(data["tiles"]);
        // console.log(data);
        // console.log("model tiles:", modelTiles)
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

  // function saveModel() {
  //   // save model to user by calling endpoinit
  //   // pass in email & json of vertices
  //   console.log("user is saving a model");
  
  //   // -> local testing
  //   const domain = "http://127.0.0.1"
  //   // -> server testing
  //   // const domain = "3.132.124.203"
  //   // -> prod
  //   // const domain = "https://deez.mturk.monster"
    
  //   const saveModelUrl = new URL(`${domain}:8080/save_model`);
  //   console.log(saveModelUrl);
  
  //   const postData = {
  //       "email": props.userEmail,
  //       "model": modelTiles
  //   }
  
  //   console.log(JSON.stringify(postData));
    
  //   fetch(saveModelUrl, {
  //       method: 'POST',
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(postData)
  //     })
  //     .then(r => r.json())
  //     .then(data => {
  //       console.log(data);
  //       console.log("yay!");
  //       //now turn sign in button to user dropdown
  //   });
    
  // }

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
      {/* 
      <Grid item>
        <Typography sx={{marginBottom: 2}} gutterBottom>
          Mesh Color
        </Typography>
        <TwitterPicker
          color={color}
          onChangeComplete={handleColorChange}
        />
      </Grid> 
      */}
      <Grid item></Grid>
      <Grid item >
        <Button 
          variant="outlined" 
          startIcon={<EditIcon />}
          onClick={() => {setShowTileSettings(true)}}
        >
          Customize
        </Button>
      </Grid>
      <Grid item >
        <Button 
          variant="outlined" 
          startIcon={<LoopIcon />}
          onClick={requestGeneration}
        >
          Generate
        </Button>
      </Grid>
      <Grid item >
        <Button 
          variant="outlined" 
          startIcon={<DownloadIcon />}
          onClick={requestDownload}
        >
          Download
        </Button>
      </Grid> 
      {(props.isLoggedIn) ?       
      <Grid item>
        {/* <Button variant="outlined" color="secondary" onClick={saveModel}>
          Save Model
        </Button> */}
        <SavedDialogue userEmail={props.userEmail} modelTiles={modelTiles} />
      </Grid> : null}
    </Grid>
  );
}
