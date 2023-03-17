import { useState, useEffect, useRef, useContext } from 'react';
import { Alert, Grid, Box, Button, ButtonGroup, TextField, IconButton, Tooltip, Paper } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { fileTileMap } from '../defaultTiles.js';
import { ControlsContext } from '../Root.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { DOMAIN, HOMEURL } from '../constants.js';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import ModelTile from './ModelTile.js';


export default function SavedModels(props) {
  const { setModelTiles } = useContext(ControlsContext);
  const meshRef = useRef();
  const [modelName, setModelName] = useState(props.model.name);

  const handleChangeModelName = event => {
    setModelName(event.target.value);
  }
    
  function clickRename() {
    // make a post request to change in backend too
    const getUpdateNameUrl = new URL(`${DOMAIN}:8080/update_model_name`);
    const postData = {
        "email": props.userEmail,
        "id": props.id,
        "name": modelName
    }
    fetch(getUpdateNameUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      .then(r => r.json())
      .then(data => {
        return true;
    });
  }

  const link = useRef();
  useEffect(() => {
    link.current = document.createElement('a');
    link.current.style.display = 'none';
    document.body.appendChild(link.current);
  })

  function saveFile(blob, filename) {
    link.current.href = URL.createObjectURL(blob);
    link.current.download = filename;
    link.current.click();
  }
  
  function saveString(text, filename) {
    saveFile( new Blob( [ text ], { type: 'text/plain' } ), filename );
  }

  function exportLink() {
    if (props.userEmail && props.id) {
    //   const url = new URL(window.location.href);
      const url = new URL(HOMEURL);
      url.searchParams.append("modelId", props.id);
      url.searchParams.append("userEmail", props.userEmail);
      
      navigator.clipboard.writeText(url.toString());

      props.setAlertMsg("Copied shareable link to clipboard:\n" + url.toString());
      // window.alert("Copied sharable link " + url.toString() + " to clipboard :D");
    } else {
      props.setAlertMsg("Couldn't create sharable link");
      // window.alert("Couldn't create sharable link :(");
    }
  }

  function downloadModel() {
    console.log("hello download");
    const exporter = new GLTFExporter();
    exporter.parse(
      meshRef.current, 
      (gltf) => {
        const output = JSON.stringify(gltf, null, 2);
        saveString(output, `${modelName}.gltf`);
      }, 
      (error) => {
        console.log('Error when parsing', error);
      },
      {} 
    );
  }

  function clickDelete() {
    const getDeleteUrl = new URL(`${DOMAIN}:8080/delete_saved_model`);
    const postData = {
      "email": props.userEmail,
      "id": props.id
    };
    fetch(getDeleteUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    let filtered = Object.assign({}, props.savedModels);
    delete filtered[props.id];
    props.setSavedModels(filtered);
  }


  function onOpenModel() {
    setModelTiles(props.model.tiles);
  }

  return (
    <div className="saved-model">
      <Grid container spacing={2}>
        <div className="saved-content"> 
          <Paper className="canvas-container">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[20, 20, 20]} />
              <OrbitControls />
              <group ref={meshRef}>
                { props.model.tiles.map((tile, i) => {
                  return (
                    <ModelTile 
                      modelPath={fileTileMap[tile["file"]]} 
                      position={tile["position"]}
                      rotation={[0, tile["rotation"] * Math.PI / 2, 0]}
                      onClick={() => {}}
                    />
                  );
                })}
              </group>
            </Canvas>
          </Paper>
        </div>
        <Grid item>
          <Box display="flex" flexDirection="column">
            <TextField
              label="model name"
              placeholder={modelName}
              value={modelName}
              variant='outlined'
              size="small"
              onChange={handleChangeModelName}
              sx={{marginBottom: 2}}
            />
            <ButtonGroup
              variant="outlined" 
            >
              <Tooltip title="Open">
                <IconButton
                  onClick={onOpenModel}
                >
                  <OpenInBrowserIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download">
                <IconButton
                  onClick={downloadModel}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Get Share Link">
                <IconButton
                  onClick={exportLink}
                >
                  <LinkIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Rename Model">
                <IconButton
                  onClick={clickRename}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Model">
                <IconButton
                  onClick={clickDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
