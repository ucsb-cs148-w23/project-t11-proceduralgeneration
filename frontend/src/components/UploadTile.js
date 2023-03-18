import { useContext, useState } from 'react';
import { ControlsContext } from '../Root.js';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '30%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UploadTile(props) {
  const {
    tiles, setTiles,
    file2id, setFile2id,
    name2file, setName2file,
  } = useContext(ControlsContext);

  const [file, setFile] = useState();
  const [symmetry, setSymmetry] = useState(-1);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  function addNewTile(filename, fileObject) {
    // - create new id
    const id = `${filename}_id`;
    // - get url and store in fileTileMap
    const url = URL.createObjectURL(fileObject);
    name2file[filename] = url;
    setName2file(name2file);
    // - add entry to file2id
    file2id[filename] = id;
    setFile2id(file2id);
    // - add empty entry to tiles
    tiles[id] = {
      "mesh": filename,
      "label": filename,
      "weight": 1,
      "include": true,
      "ground": true,
      "rotation": 0,
      "symmetry": 0,
      "valid_neighbors": {
        "px": [],
        "nx": [],
        "py": [],
        "ny": [],
        "pz": [],
        "nz": []
      }
    };
    setTiles(tiles);
    setUploadSuccess(true);
  }

  function handleFileChange(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  function handleUploadClick() {
    if (symmetry === -1) {
      alert("Please select a rotational symmetry");
      return;
    }
    addNewTile(file.name, file);
  }

  function onClose() {
    props.setOpen(false);
    setUploadSuccess(false);
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload a new tile (.gltf)
          </Typography>
          <p>Please ensure:</p>
          <ul>
            <li>the file name is unique (from previous uploads)</li>
            <li>the model conforms to the 2x2x2 grid unit</li>
          </ul>
          

          <InputLabel id="demo-simple-select-label">Rotational Symmetry (About Vertical Axis)</InputLabel>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={symmetry}
              onChange={(event) => {
                const value = event.target.value;
                setSymmetry(value);
              }}
            >
              <MenuItem value={-1}>Select an option</MenuItem>
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={2}>2-way (identical when rotating 180 degrees)</MenuItem>
              <MenuItem value={4}>4-way (identical when rotating 90 degrees)</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{marginBottom: 2}}></Box>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                component="label"
              >
                Choose File
                <input
                  type="file"
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleUploadClick}
              >
                Upload
              </Button>
            </Grid>
            <Grid item>
              <Typography>
                {file ? file.name : "No file selected"}
              </Typography>
            </Grid>
            {
              uploadSuccess &&
              <Grid item>
                <Alert severity="success">Uploaded Succesfully!</Alert>
              </Grid>
            }
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
