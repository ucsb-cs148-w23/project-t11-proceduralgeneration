import { useContext, useEffect, useState, useRef } from 'react';
import { ControlsContext } from '../App.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import JSZip from 'jszip';

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

export default function ConfigFile(props) {
  const {
    tiles, setTiles,
    file2id, setFile2id,
    name2file, setName2file,
    setTile,
    setNeighbor
  } = useContext(ControlsContext);

  const [file, setFile] = useState();
  const [symmetry, setSymmetry] = useState(-1);
  //
  // create persistent variable, initialize once
  const link = useRef();
  useEffect(() => {
    link.current = document.createElement('a');
    link.current.style.display = 'none';
    document.body.appendChild(link.current);
  }, [])
  // save file functions
  function saveFile(blob, filename) {
    link.current.href = URL.createObjectURL(blob);
    link.current.download = filename;
    link.current.click();
  }

  async function uploadConfig(fileObject) {
    // update tiles, file2id, name2file
    JSZip.loadAsync(fileObject).then(function(zip) {
      // read tiles.json
      zip.file("tiles.json").async("string").then(function (data) {
        const newTiles = JSON.parse(data);
        setTiles(newTiles);
      });

      // read file2id.json
      zip.file("file2id.json").async("string").then(function (data) {
        const newFile2id = JSON.parse(data);
        setFile2id(newFile2id);
      });

      // read name2file.json
      // zip.file("name2file.json").async("string").then(function (data) {
      //   const newName2file = JSON.parse(data);
      //   setName2file(newName2file);
      // });

      // read tile_models
      zip.folder("tile_models").forEach(function (relativePath, file) {
        // console.log(relativePath, file);
        file.async("blob").then(function (data) {
          const url = URL.createObjectURL(data);
          name2file[relativePath] = url;
          setName2file(name2file);
        });
      });
      
      setTile(null);
      setNeighbor(null);
    });
  }

  async function downloadConfig() {
    // zip three config objects into single file, then download
    const zip = new JSZip();
    zip.file("tiles.json", JSON.stringify(tiles));
    zip.file("file2id.json", JSON.stringify(file2id));
    // zip.file("name2file.json", JSON.stringify(name2file));
    // need to download the files there
    zip.folder("tile_models");
    for (const [key, value] of Object.entries(name2file)) {
      const response = await fetch(value);
      const data = await response.blob();
      zip.file(`tile_models/${key}`, data);
    }
    
    zip.generateAsync({type:"blob"}).then(function(content) {
      saveFile(content, "config.zip");
    });
  }

  function handleFileChange(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  function handleUploadClick() {
    uploadConfig(file);
  }
  

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => {props.setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Download and Upload Config Files
          </Typography>
          <Typography>
            Download the config files to save your current configuration.
            Upload the config files to load a previous configuration.
            Please note that uploading a configuration overrides the current one.
          </Typography>

          <Box sx={{marginBottom: 2}}></Box>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                component="label"
                onClick={downloadConfig}
              >
                Download
              </Button>
            </Grid>
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
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
