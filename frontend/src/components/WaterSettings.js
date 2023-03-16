import { Fragment, useContext } from 'react';
import { ControlsContext } from '../App.js';
import { Grid, Switch, FormControlLabel } from '@mui/material';

export default function WaterSettings(){
  const { showWater, setShowWater } = useContext(ControlsContext);
  return (
    <Fragment>
      <Grid item>
          <FormControlLabel 
            control={
              <Switch 
                checked={showWater}
                onClick={() => {
                  setShowWater(!showWater);
                }}
              />
            } 
            label="Toggle Water" 
          />
      </Grid>
    </Fragment>
  )
}
