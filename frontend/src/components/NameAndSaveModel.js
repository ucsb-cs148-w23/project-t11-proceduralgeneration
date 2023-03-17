import * as React from 'react';
import { useState, useContext, Fragment } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import Divider from '@mui/material/Divider';
import { TextField, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { ControlsContext } from '../Root.js';
import { DOMAIN } from "../constants.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NameAndSaveModel(props) {
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { 
    userEmail, 
    modelTiles, 
    loggedIn,
    numDownload, setNumDownload,
    modelName, setModelName
  } = useContext(ControlsContext);

  function saveModel() {
    // save model to user by calling endpoinit
    // pass in email & model tiles
  
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
        setShowAlert(true);
      });
  }

  function requestDownload(){
    setNumDownload(numDownload + 1);
  }

  return (
    <div>
      <Divider />
      <Typography 
        variant="h6" 
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        Save Model
      </Typography>
      {
        showAlert && 
        <Fragment>
          <Alert 
            severity="info" 
            sx={{ marginBottom: 2 }}
            onClose={() => {setShowAlert(false)}}
          >
            Model Saved to Cloud!
          </Alert>
        </Fragment>
      }
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
    </div>
  );
}
