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
import InputSlider from './InputSlider.js'


export default function TilePanel() {
  const { 
    tilePanel, setTilePanel,
    tile, setTile,
    tiles, setTiles,
    neighbor, setNeighbor
  } = useContext(ControlsContext);

  const [w, setW] = useState(1);
  
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
            onClick={() => {setTilePanel(false)}}
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
        <Typography>
          Choose a tile to examine or customize.
        </Typography>
      </Grid>
      <Grid item>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Object.values(tiles)}
          onChange={(event, newValue) => {
            console.log(newValue["mesh"]);
            setTile(newValue["mesh"]);
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
    </Grid>
  );
}
