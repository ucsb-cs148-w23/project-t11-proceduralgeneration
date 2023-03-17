import * as React from 'react';
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { TextField, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { ControlsContext } from '../App.js';
import { DOMAIN } from "../constants.js";

const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NameAndSaveModel(props) {
  const [open, setOpen] = useState(false);
  const { 
    userEmail, 
    modelTiles, 
    loggedIn,
    numDownload, setNumDownload,
    modelName, setModelName
  } = useContext(ControlsContext);

  function saveModel() {
    // save model to user by calling endpoinit
    // pass in email & json of vertices
  
    const saveModelUrl = new URL(`${DOMAIN}:8080/save_model`);
  
    const postData = {
        "email": userEmail,
        "name": modelName,
        "model": modelTiles
    }
  
    fetch(saveModelUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
      .then(r => r.json())
      .then(data => {
        setOpen(true);
      });
  }

  function requestDownload(){
    setNumDownload(numDownload + 1);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Divider />
      <Typography 
        variant="h6" 
        sx={{
          marginTop: 2,
          marginBottom: 2
        }}
      >
        Save Model
      </Typography>
      <Grid container spacing={1}>
        <Grid item>
          <TextField 
            label="Model Name" 
            placeholder="Model Name"
            variant="outlined" 
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              onClick={requestDownload}
            >
              Download
            </Button>
            { 
              loggedIn &&
              <Button 
                variant="outlined" 
                onClick={saveModel}
                startIcon={<CloudUploadIcon />}
              >
               Cloud 
              </Button>
            }
          </ButtonGroup>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Your model has been saved!"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
