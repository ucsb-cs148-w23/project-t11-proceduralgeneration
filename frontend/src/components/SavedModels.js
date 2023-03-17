import { React } from 'react';
import { Grid } from '@mui/material';
import SavedModel from './SavedModel.js';


export default function SavedModels(props) {
    // console.log("passed in: ", props.savedModels);
    return (
        <div className="saved-models-dialog">
            <Grid container spacing={4} fullWidth>
                {Object.entries(props.savedModels).map(([id, model]) => (
                    <Grid item>
                        <SavedModel
                            userEmail={props.userEmail}
                            model={model}
                            id={id}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}