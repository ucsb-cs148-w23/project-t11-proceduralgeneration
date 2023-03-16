import { useState, useContext } from 'react';
import { ControlsContext } from '../App.js';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import SavedModels from './SavedModels.js';

export default function UserDropdown(props) {
    const [option, setOption] = useState(0);      
    const [open, setOpen] = useState(false);
    const [savedModels, setSavedModels] = useState();
    const { 
        setLoggedIn
    } = useContext(ControlsContext);
    
    function getSavedModels() {
        // const domain = "http://127.0.0.1"
        // -> server testing
        // const domain = "3.132.124.203"
        // -> prod
        const domain = "https://shadydomain.click"
        
        const getSavedUrl = new URL(`${domain}:8080/get_saved`);
      
        const postData = {
            "email": props.userEmail
        }
        
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
        if (opt?.target?.value === 10) {
            getSavedModels();
        } else if (opt?.target?.value === 20) {
            window.location.reload(true);
            setLoggedIn(false);
        }
    }
    
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
