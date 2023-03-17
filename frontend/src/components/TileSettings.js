import { useContext, useState, Fragment } from 'react';
import { ControlsContext } from '../Root.js';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import InputSlider from './InputSlider.js'
import LoopIcon from '@mui/icons-material/Loop';
import MenuItem from '@mui/material/MenuItem';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import UploadTile from './UploadTile.js';
import ConfigFile from './ConfigFile.js';
import WaterSettings from './WaterSettings.js'

// order for rotation += 1
const directionOrder = ["ny", "nx", "py", "px"];
const oppositeDirection = {
  "px": "nx",
  "nx": "px",
  "py": "ny",
  "ny": "py",
  "pz": "nz",
  "nz": "pz"
};

export default function TileSettings() {
  const { 
    setShowTileSettings,
    tile, setTile,
    neighbor, setNeighbor,
    tiles, setTiles,
    file2id
  } = useContext(ControlsContext);

  const [openAddTile, setOpenAddTile] = useState(false);
  const [openConfigFile, setOpenConfigFile] = useState(false);
  const [w, setW] = useState(1);
  const [addNeighborMode, setAddNeighborMode] = useState(false);
  const [newNeighborDirection, setNewNeighborDirection] = useState(null);
  const [newNeighborRotation, setNewNeighborRotation] = useState(0);
  const [tileInclusion, setTileInclusion] = useState(true);
  const [groundStatus, setGroundStatus] = useState(false);

  function getNeighbors() {
    const tid = file2id[tile];
    const fmtd = [];
    const neighbors = tiles[tid]["valid_neighbors"];
    for (const direction in neighbors) {
      for (const neighbor of neighbors[direction]) {
        const nname = tiles[neighbor[0]]["mesh"]
        fmtd.push({
          "label": `${direction}, r${neighbor[1]}: ${nname}`,
          "id": neighbor[0],
          "rotation": neighbor[1],
          "direction": direction
        });
      }
    }
    return fmtd;
  }


  function updateWeight(w) {
    const tid = file2id[tile];
    tiles[tid]["weight"] = w;
    setW(w);
    setTiles(tiles);
  }
  
  function toggleTileInclusion() {
    const tid = file2id[tile];
    tiles[tid]["include"] = !tileInclusion;
    setTileInclusion(!tileInclusion);
    setTiles(tiles);
  }

  function toggleGroundStatus() {
    setGroundStatus(!groundStatus);
    const tid = file2id[tile];
    // default ~= true
    if (tiles[tid]["ground"] === undefined) {
      tiles[tid]["ground"] = true;
    } else {
      tiles[tid]["ground"] = !tiles[tid]["ground"];
    }
    setTiles(tiles);
  }
  
  function addNewNeighborRelation() {
    const tid = file2id[tile];
    const nid = neighbor.id;

    // ----------------------
    // target to neighbor
    const neighbors = tiles[tid]["valid_neighbors"];
    if (neighbors[newNeighborDirection] === undefined) {
      neighbors[newNeighborDirection] = [];
    }
    neighbors[newNeighborDirection].push([nid, newNeighborRotation]);
    
    // ----------------------
    // neighbor to target
    const neighbors2 = tiles[nid]["valid_neighbors"];
    let neighborDir = oppositeDirection[newNeighborDirection];
    // get initial rotation number corresponding to neighbor -> target direction
    const remainingRotations = (4 - newNeighborRotation) % 4;
    if (neighborDir === "pz" || neighborDir === "nz") {
      neighbors2[neighborDir].push([tid, remainingRotations]);
    } else {
      for (let i = 0; i < directionOrder.length; i++) {
        if (directionOrder[i] === neighborDir) {
          neighborDir = i;
          break;
        }
      }
      // finish rotating neighbor so it has 0 rotation, update 
      // - the neighbor -> target direction 
      // - the rotation of the target
      neighborDir = directionOrder[(neighborDir + remainingRotations) % 4];
      neighbors2[neighborDir].push([tid, remainingRotations]);
    }
    setTiles(tiles);
  }

  return (
    <Grid 
      container
      className="control-panel"
      direction="column"
      rowSpacing={3}
    >
      <Grid item>
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              setShowTileSettings(false);
              setTile(null);
              setNeighbor(null);
              setAddNeighborMode(false);
            }}
          >
            Back
          </Button>
          <Button 
            startIcon={<AddIcon />}
            onClick={() => setOpenAddTile(true)}
          >
            New Tile
          </Button>
          <Button 
            startIcon={<FileCopyIcon />}
            onClick={() => setOpenConfigFile(true)}
          >
            Config File
          </Button>
        </ButtonGroup>
        <UploadTile open={openAddTile} setOpen={setOpenAddTile} />
        <ConfigFile open={openConfigFile} setOpen={setOpenConfigFile} />
      </Grid>
      <Grid item>
        <Typography 
          variant="h6" 
          sx={{marginBottom: 2}}
        >
          Choose a tile to examine or customize.
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Object.values(tiles)}
          onChange={(event, newValue) => {
            setTile(newValue["mesh"]);
            setNeighbor(null);
            setW(newValue["weight"] || 1);
            if (newValue["include"] === undefined) {
              setTileInclusion(true);
            } else {
              setTileInclusion(newValue["include"]);
            }
            // setTileInclusion(newValue["include"]);
            setGroundStatus(newValue["ground"] === false);
          }}
          renderInput={(params) => <TextField {...params} label="Tile" />}
        />
      </Grid>
      {
        tile &&
        <Fragment>
          <Grid item>
            <FormControlLabel 
              control={
                <Switch 
                  checked={tileInclusion}
                  onClick={toggleTileInclusion}
                />
              } 
              label="Include in Generation?" 
            />
          </Grid>
          <Grid item>
            <FormControlLabel 
              control={
                <Switch 
                  checked={tiles[file2id[tile]]["ground"]}
                  onClick={toggleGroundStatus}
                />
              } 
              label="Allowed to be on lowest level?" 
            />
          </Grid>
          <Grid item>
            <InputSlider 
              value={w} 
              setValue={updateWeight}
              label="Random Selection Weight" 
            />
          </Grid>
          <Divider />
          <Grid item>
            <Typography 
              variant="h6" 
            >
              Add or Remove Allowed Neighbors
            </Typography>
            <Box sx={{marginBottom: 2}}></Box>
            {
              !addNeighborMode ?
              <Fragment>
                <Autocomplete
                  disablePortal
                  options={getNeighbors()}
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  onChange={(event, newValue) => {
                    setNeighbor(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Neighbor" />}
                />
                <Button 
                  startIcon={<AddIcon />} 
                  onClick={() => {
                    setNeighbor(null);
                    setAddNeighborMode(true);
                  }} >
                  Add Allowed Neighbor
                </Button>
              </Fragment>
              : 
              <Fragment>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Direction</InputLabel>
                  <Select
                    label="Direction"
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    value={newNeighborDirection}
                    onChange={(event) => {
                      setNewNeighborDirection(event.target.value);
                      if (neighbor) {
                        const updated = {...neighbor};
                        updated["direction"] = event.target.value;
                        setNeighbor(updated);
                      }
                    }}
                  >
                    <MenuItem value={"px"}>Front (px)</MenuItem>
                    <MenuItem value={"nx"}>Back (nx)</MenuItem>
                    <MenuItem value={"py"}>Right (py)</MenuItem>
                    <MenuItem value={"ny"}>Left (ny)</MenuItem>
                    <MenuItem value={"pz"}>Above (pz)</MenuItem>
                    <MenuItem value={"nz"}>Below (nz)</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{marginBottom: 2}}></Box>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Object.values(tiles)}
                  onChange={(event, newValue) => {
                    const id = file2id[newValue["mesh"]];
                    const updated = {
                      "label": newValue["mesh"] || "none",
                      "id": id,
                      "direction": newNeighborDirection,
                      "rotation": newNeighborRotation
                    };
                    setNeighbor(updated);
                  }}
                  renderInput={(params) => <TextField {...params} label="New Neighbor" />}
                />
              </Fragment>
            }

          </Grid>
        </Fragment>
      }
      {
        neighbor &&
        <Grid item>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                setNeighbor(null);
                setAddNeighborMode(false);
              }}
              startIcon={<ArrowBackIcon />}
            >
              Cancel
            </Button>
            {
              addNeighborMode ?
              <Fragment>
                <Button
                  startIcon={<LoopIcon />}
                  onClick={() => {
                    if (neighbor) {
                      const updated = {...neighbor};
                      updated["rotation"] = (updated["rotation"] + 1) % 4;
                      setNeighbor(updated);
                      setNewNeighborRotation(updated["rotation"]);
                    }
                  }}
                >
                  Rotate
                </Button>
                <Button
                  startIcon={<SaveIcon />}
                  onClick={addNewNeighborRelation}
                >
                  Save
                </Button>
              </Fragment>
              : <Button
                startIcon={<DeleteIcon />}
              >
                Delete Neighbor
              </Button>
            }
          </ButtonGroup>
        </Grid>
      }
      <WaterSettings />
    </Grid>
  );
}
