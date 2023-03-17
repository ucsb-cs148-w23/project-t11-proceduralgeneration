import { useState, useContext } from 'react';
import { ControlsContext } from '../Root.js';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { DOMAIN } from "../constants.js";
import SavedModels from './SavedModels.js';

export default function UserDropdown(props) {
    const [option, setOption] = useState(0);      
    const [open, setOpen] = useState(false);
    const [savedModels, setSavedModels] = useState();
    const { 
        setLoggedIn
    } = useContext(ControlsContext);
    
    function getSavedModels() {
        const getSavedUrl = new URL(`${DOMAIN}:8080/get_saved`);
      
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
                  Account Options
                </InputLabel>
                <Select
                    id="select-user-dropdown"
                    label="Account Options"
                    autoWidth={true}
                    value={option}
                    onChange={handleSelect}
                    size="small"
                >
                    <MenuItem value={0}>{props.userEmail}</MenuItem>
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
