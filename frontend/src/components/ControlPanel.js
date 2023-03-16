import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ControlsContext } from '../App.js';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputSlider from './InputSlider.js'
import LoopIcon from '@mui/icons-material/Loop';
import SavedDialogue from './SavedDialogue.js';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import WaterSettings from './WaterSettings.js'
import { defaultCollapsed } from '../defaultTiles.js';
import { trackPromise } from 'react-promise-tracker';
import { useContext, useEffect, useRef, useState, Fragment } from 'react';

export default function ControlPanel(props) {
  const { 
    numDownload, setNumDownload,
    scaleX, setScaleX,
    scaleY, setScaleY,
    scaleZ, setScaleZ,
    modelTiles, setModelTiles,
    setShowTileSettings,
    clickedTile, setClickedTile,
    tiles,
    meshRef
  } = useContext(ControlsContext);

  const [current, setCurrent] = useState(null);
  const [replacement, setReplacement] = useState("");

  // create persistent variable, initialize once
  const link = useRef();
  useEffect(() => {
    link.current = document.createElement('a');
    link.current.style.display = 'none';
    document.body.appendChild(link.current);
  })

  useEffect(() => {
    if (clickedTile !== null) {
      setCurrent(modelTiles[clickedTile]["file"]);
    }
    setReplacement("");
  }, [clickedTile, modelTiles]);

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
    // const domain = "http://127.0.0.1";
    // -> server testing
    // const domain = "3.132.124.203";
    // -> prod
    const domain = "https://shadydomain.click";
    
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
    
    trackPromise(
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
        for (let i = 0; i < data["tiles"].length; i++) {
          data["tiles"][i]["idx"] = i;
        }
        setModelTiles(data["tiles"]);
        // console.log(data);
        // console.log("model tiles:", modelTiles)
      }
    ));
  }

  function deleteClickedTile() {
    if (clickedTile !== null) {
      setModelTiles(modelTiles => modelTiles.filter((tile, idx) => idx !== clickedTile));
      setClickedTile(null);
    }
  }

  function requestDownload(){
    setNumDownload(numDownload + 1);
  }

  return (
    <Grid 
      container
      className="control-panel"
      direction="column"
      rowSpacing={2}
    >
      <Grid item>
        <Typography variant="h6">
          Environment Dimensions
        </Typography>
      </Grid>
      <Grid item>
          <InputSlider 
            value={scaleX} 
            setValue={setScaleX} 
            label="Width" 
            className="control-panel-item"
          />
      </Grid>
      <Grid item>
        <InputSlider 
          value={scaleY} 
          setValue={setScaleY}
          label="Height" 
          className="control-panel-item"
        />
      </Grid>
      <Grid item>
        <InputSlider 
          value={scaleZ} 
          setValue={setScaleZ}
          label="Depth"
          className="control-panel-item"
        />
      </Grid>
      <WaterSettings />
      { clickedTile !== null &&
        <Fragment>
          <Grid item>
            <Typography variant="h6">
              Selected Tile
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Object.values(tiles)}
              value={current}
              onChange={(event, newValue) => {
                setReplacement(newValue["mesh"]);
              }}
              isOptionEqualToValue={(option, value) => option["mesh"] === value}
              renderInput={(params) => <TextField {...params} />}
            />
            <ButtonGroup
              variant="outlined" 
            >
              <Tooltip title="Unselect">
                <IconButton
                  onClick={() => {setClickedTile(null)}}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={deleteClickedTile}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Rotate">
                <IconButton
                  onClick={() => {
                    let prevRotation = modelTiles[clickedTile]["rotation"];
                    modelTiles[clickedTile]["rotation"] = (prevRotation + 1) % 4;
                    setModelTiles([...modelTiles]);
                  }}
                >
                  <LoopIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Replace">
                <IconButton
                  onClick={() => {
                    if (replacement !== "" && replacement !== "none") {
                      modelTiles[clickedTile]["file"] = replacement;
                      setModelTiles([...modelTiles]);
                      setCurrent(replacement);
                    }
                  }}
                >
                  <SwapHorizIcon />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </Grid>
        </Fragment>
      }
      <Grid item></Grid>
      <Grid item >
        <Button 
          variant="outlined" 
          startIcon={<EditIcon />}
          onClick={() => {
            setShowTileSettings(true);
            setClickedTile(null);
          }}
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
      {
        (props.isLoggedIn) &&       
        <Grid item>
          <SavedDialogue userEmail={props.userEmail} modelTiles={modelTiles} />
        </Grid>
      }
    </Grid>
  );
}
