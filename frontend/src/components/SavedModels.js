import { React } from 'react';
import { Grid } from '@mui/material';
import SavedModel from './SavedModel.js';


export default function SavedModels(props) {
  return (
    <Grid container spacing={4} direction="column" alignItems="center">
      {Object.entries(props.savedModels).map(([id, model]) => (
        <Grid item>
          <SavedModel
            key={id}
            id={id}
            savedModels={props.savedModels}
            setSavedModels={props.setSavedModels}
            userEmail={props.userEmail}
            model={model}
            setAlertMsg={props.setAlertMsg}
          />
        </Grid>
      ))}
    </Grid>
  )
}
