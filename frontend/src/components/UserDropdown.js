import { useRef, useEffect, useContext, useState, createContext } from 'react';
import { FormControl, InputLabel, NativeSelect, Select, MenuItem } from '@mui/material';
import { Modal, Grid, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import SavedModel from './SavedModel.js';
// import { diffProps } from '@react-three/fiber/dist/declarations/src/core/utils';
import SavedModels from './SavedModels.js';

export default function UserDropdown(props) {
    const [option, setOption] = useState(0);      
    const [open, setOpen] = useState(false);
    // let savedModels = [];
    const [savedModels, setSavedModels] = useState();
    
    function getSavedModels() {
        // console.log("retrieving saved models");      
        // -> local testing
        const domain = "http://127.0.0.1"
        // -> server testing
        // const domain = "3.132.124.203"
        // -> prod
        // const domain = "https://deez.mturk.monster"
        
        const getSavedUrl = new URL(`${domain}:8080/get_saved`);
        // console.log(getSavedUrl);
      
        const postData = {
            "email": props.userEmail
        }
      
        // console.log(JSON.stringify(postData));
        
        fetch(getSavedUrl, {
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
            // console.log("yay! 3");
            // quick popup saying your model has been saved
            setSavedModels(data.models);
            setOpen(true);
            return data.models;

        });
        
    }

    const handleClose = () => {
        setOpen(false);
        setOption(0);
    };

    function handleSelect(opt) {
        setOption(opt?.target?.value);

        // setOption(opt?.target?.value);
        // console.log(option);
        if (opt?.target?.value === 10) {
            //go to saved models
            // console.log("going to user's saved models");
            // savedModels = getSavedModels();
            getSavedModels();
            // console.log("open: ", open);
            // setOpen(true);
        } else if (opt?.target?.value === 20) {
            //sign out
            // console.log("signing out");
            //just reload to logout and maybe show popup
            window.location.reload(true);
        }
    }

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
    }

    // function signOut() {
    //     var auth2 = gapi.auth2.getAuthInstance();
    //     auth2.signOut().then(function() {
    //         console.log("User signed out.");
    //     });
    // }
    
    return (
        <div id="user-dropdown">
            <FormControl id="user-dropdown-form" style={{minWidth: 150}}>
                <InputLabel 
                    id="user-dropdown-label" 
                    fullWidth={true}
                >
                    User Options
                </InputLabel>
                <Select
                    id="select-user-dropdown"
                    label="UserName"
                    autoWidth={true}
                    value={option}
                    onChange={handleSelect}
                >
                    <MenuItem value={10}>Saved Models</MenuItem>
                    <MenuItem value={20}>Sign Out</MenuItem>
                </Select>

            </FormControl>
            {/* <SavedModels open={open} userEmail={props.userEmail} /> */}
            {(open) ? <Dialog
                fullWidth
                maxWidth="xl"
                open={open}
                keepMounted
                onClose={handleClose}
            >
                <div>
                    <DialogTitle>{"Your saved models!"}</DialogTitle>
                </div>
                <div>
                    <DialogContent>
                        {/* <Grid container spacing={3}>
                            {
                                savedModels.map((model) => (
                                <SavedModel
                                    file={model}
                                />
                            ))}
                        </Grid> */}
                        <SavedModels savedModels={savedModels} userEmail={props.userEmail} />
                    </DialogContent>
                </div>
                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog> : null}
        </div>
    );
}