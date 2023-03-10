import { useState } from 'react';
import { Modal, Grid, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import SavedModel from './SavedModel.js';

export default function SavedModels(props) {
    // get saved models (pass in email key as props)
    console.log("passed in: ", props.savedModels);
    return (
        <div>
            <Grid container spacing={4} fullWidth>
                {/* for loop over all the saved models */}
                {props.savedModels.map((m) => (
                    <Grid item>
                        <SavedModel
                            model={m}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}