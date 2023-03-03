import { useContext, useState, Fragment } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import { TwitterPicker } from 'react-color';

import { ControlsContext } from '../App.js';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InputSlider from './InputSlider.js'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function TilePanel() {
  const { 
    setTilePanel,
    tile, setTile,
    neighbor, setNeighbor,
    tiles, setTiles,
    file2id, setFile2id
  } = useContext(ControlsContext);

  const [w, setW] = useState(1);
  const [addNeighborMode, setAddNeighborMode] = useState(false);
  const [newNeighborDirection, setNewNeighborDirection] = useState(null);
  const [newNeighborRotation, setNewNeighborRotation] = useState(0);

  function toggleAddNeighborMode() {
    setAddNeighborMode(!addNeighborMode);
  }

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
              setTilePanel(false);
              setTile(null);
              setNeighbor(null);
            }}
          >
            Back
          </Button>
          <Button 
            startIcon={<AddIcon />}
          >
            New Tile
          </Button>
        </ButtonGroup>
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
            // console.log(newValue["mesh"]);
            setTile(newValue["mesh"]);
            setNeighbor(null);
          }}
          renderInput={(params) => <TextField {...params} label="Tile" />}
        />
      </Grid>
      {
        tile &&
        <Fragment>
          <Grid item>
            <FormControlLabel control={<Switch defaultChecked />} label="Include in Generation?" />
          </Grid>
          <Grid item>
            <InputSlider 
              value={w} 
              setValue={setW} 
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
                  options={getNeighbors(tile)}
                  onChange={(event, newValue) => {
                    console.log(newValue);
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
                      console.log(event.target.value);
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
                    // console.log(newValue["mesh"]);
                    const id = file2id[newValue["mesh"]];
                    const updated = {
                      "label": newValue["mesh"],
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
    </Grid>
  );
}
