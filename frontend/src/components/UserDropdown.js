import { useState, useContext } from 'react';
import { ControlsContext } from '../Root.js';
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
  paddingTop: "1%",
  paddingBottom: "1%",
  paddingLeft: "5%",
  paddingRight: "5%",
  minWidth: "700px",
  height: "80%",
  overflow: "auto",
};

export default function UserDropdown(props) {
  const [option, setOption] = useState(0);      
  const [open, setOpen] = useState(false);
  const [savedModels, setSavedModels] = useState();
  const [alertMsg, setAlertMsg] = useState('');

  const { 
    setLoggedIn,
    name2file
  } = useContext(ControlsContext);
  
  function getSavedModels() {
    const getSavedUrl = new URL(`${DOMAIN}:8080/get_saved`);
  
    const postData = {
      "email": props.userEmail
    }
    
    let missingTiles = new Set();

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
        let cpy = {};
        Object.entries(data.models).forEach(([id, model]) => {
          let ok = true;
          for (let i = 0; i < model.tiles.length; i++) {
            if (!(model.tiles[i].file in name2file)) {
              ok = false;
              missingTiles.add(model.tiles[i].file);
            }
          }
          if (ok) {
            cpy[id] = model;
          }
        });
        missingTiles = [...missingTiles];
        if (missingTiles.length > 0) {
          setAlertMsg(
            `The following tiles are missing from your current instance: ${missingTiles.join(', ')}. `
            + `Please upload these models to view the models containing them.`
          );
        }
        setSavedModels(cpy);
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
          sx={{overflow: "auto"}}
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
