import { useContext, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import { TwitterPicker } from 'react-color';

import { ControlsContext } from '../App.js';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import InputSlider from './InputSlider.js'


export default function TilePanel() {
  const { 
    tilePanel, setTilePanel,
    tile, setTile,
    tiles, setTiles,
    neighbor, setNeighbor,
    file2id, setFile2id
  } = useContext(ControlsContext);

  const [w, setW] = useState(1);

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
            variant="outlined"
            color="error"
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
            color="info"
          >
            New Tile
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Typography 
          variant="h6" 
          sx={{marginBottom: 1}}
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
        <Grid item>
          <FormControlLabel control={<Switch defaultChecked />} label="Include in Generation?" />
        </Grid>
      }
      {
        tile &&
        <Grid item>
          <InputSlider 
            value={w} 
            setValue={setW} 
            label="Random Selection Weight" 
          />
        </Grid>
      }
      {
        tile &&
        <Grid item>
          <Typography 
            variant="h6" 
            sx={{marginbottom: 3}}
          >
            View or Delete Allowed Neighbors
          </Typography>
          <Autocomplete
            disablePortal
            options={getNeighbors(tile)}
            onChange={(event, newValue) => {
              console.log(newValue);
              setNeighbor(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Neighbor" />}
          />
          <Button startIcon={<AddIcon />}>
            Add Allowed Neighbor
          </Button>

        </Grid>
      }
      {
        neighbor &&
        <Grid item>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color="error">Delete Neighbor</Button>
            <Button
              onClick={() => {setNeighbor(null)}}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Grid>
      }
    </Grid>
  );
}
