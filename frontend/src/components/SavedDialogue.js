import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { TextField, Grid } from '@mui/material';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DOMAIN } from "../constants.js";
// import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  // const [modelName, setModelName] = React.useState();
  const modelName = React.useRef('');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  function saveModel() {
    // save model to user by calling endpoinit
    // pass in email & json of vertices
    // console.log("user is saving a model");
  
    const saveModelUrl = new URL(`${DOMAIN}:8080/save_model`);
    // console.log(saveModelUrl);
    console.log("model name ", modelName);
  
    const postData = {
        "email": props.userEmail,
        "name": modelName.current.value,
        "model": props.modelTiles
    }
  
    // console.log(JSON.stringify(postData));
    
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
        // console.log(data);
        // console.log("yay! 2");
        setOpen(true);
        //now turn sign in button to user dropdown
    });
    
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item>
          <TextField 
            label="Model Name" 
            placeholder="Model Name"
            variant="outlined" 
            inputRef={modelName}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={saveModel}>
            Save Model
          </Button>
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
