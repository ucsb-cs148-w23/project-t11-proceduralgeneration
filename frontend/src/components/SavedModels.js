import { useState, React } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Grid } from '@mui/material';
import SavedModel from './SavedModel.js';


export default function SavedModels(props) {
    console.log("passed in: ", props.savedModels);
    return (
        <div className="saved-models-dialog">
            <Grid container spacing={4} fullWidth>
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