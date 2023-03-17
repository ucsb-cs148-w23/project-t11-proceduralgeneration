import { useState, useContext } from 'react';
import { ControlsContext } from '../App.js';
import { 
  Alert,
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Button, 
  Modal,
  Box,
  Typography
} from '@mui/material';
import { DOMAIN } from "../constants.js";
import SavedModels from './SavedModels.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UserDropdown(props) {
  const [option, setOption] = useState(0);      
  const [open, setOpen] = useState(false);
  const [savedModels, setSavedModels] = useState();
  const [alertMsg, setAlertMsg] = useState('');

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

  function onCloseMsg() {
    setAlertMsg('');
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
      { 
        open && 
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style} display="flex" flexDirection="column">
            <Typography variant="h4" component="h2">Saved Models</Typography>
            {alertMsg !== '' && <Alert severity="info" onClose={onCloseMsg}>{alertMsg}</Alert> }
            <Box sx={{marginBottom: 4}}></Box>
            <SavedModels 
              savedModels={savedModels} 
              setSavedModels={setSavedModels}
              userEmail={props.userEmail} 
              setAlertMsg={setAlertMsg}
            />
          </Box>
        </Modal>
      }
    </div>
  );
}
