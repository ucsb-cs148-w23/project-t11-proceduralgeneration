import { Fragment, useContext } from 'react';
import { ControlsContext } from '../Root.js';
import { Grid, Switch, FormControlLabel } from '@mui/material';

export default function WaterSettings(){
  const { showWater, setShowWater, showSunset, setShowSunset } = useContext(ControlsContext);
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
            label="Water" 
          />
          { 
            showWater && 
            <FormControlLabel 
              control={
                <Switch 
                  checked={showSunset}
                  onClick={() => {
                    setShowSunset(!showSunset);
                  }}
                />
              } 
              label="Sunset" 
            />
          }
      </Grid>
    </Fragment>
  )
}
