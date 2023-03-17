import { React } from 'react';
import { Grid } from '@mui/material';
import SavedModel from './SavedModel.js';


export default function SavedModels(props) {
  return (
    <Grid container spacing={4} justifyContent="center">
      {Object.entries(props.savedModels).map(([id, model]) => (
        <Grid item>
          <SavedModel
            savedModels={props.savedModels}
            setSavedModels={props.setSavedModels}
            userEmail={props.userEmail}
            model={model}
            id={id}
            setAlertMsg={props.setAlertMsg}
          />
        </Grid>
      ))}
    </Grid>
  )
}
