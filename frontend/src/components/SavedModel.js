import { useState, useEffect, useRef, useContext } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import ModelTile from './ModelTile.js';
import Paper from '@mui/material/Paper';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { fileTileMap } from '../defaultTiles.js';
import { ControlsContext } from '../App.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';


export default function SavedModels(props) {
    const { numDownload, setNumDownload } = useContext(ControlsContext);
    const meshRef = useRef();
    const [modelName, setModelName] = useState(props.model.name);

    const handleChangeModelName = event => {
        setModelName(event.target.value);
        //make a post request to change in backend too

        // const domain = "http://127.0.0.1"
        // -> server testing
        // const domain = "3.132.124.203"
        // -> prod
        const domain = "https://shadydomain.click"
        
        const getUpdateNameUrl = new URL(`${domain}:8080/update_model_name`);
      
        const postData = {
            "email": props.userEmail,
            "id": props.id,
            "name": event.target.value,
        }
        
        fetch(getUpdateNameUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
          })
          .then(r => r.json())
          .then(data => {
            return true;
        });

    }
    const link = useRef();
    useEffect(() => {
      link.current = document.createElement('a');
      link.current.style.display = 'none';
      document.body.appendChild(link.current);
    })

    function saveFile(blob, filename) {
        link.current.href = URL.createObjectURL(blob);
        link.current.download = filename;
        link.current.click();
    }
    
    function saveString(text, filename) {
        saveFile( new Blob( [ text ], { type: 'text/plain' } ), filename );
    }

    function exportLink() {
        //TODO
        // create url with id, user email

        if (props.userEmail && props.id) {
            const url = new URL(window.location.href);
            url.searchParams.append("modelId", props.id);
            url.searchParams.append("userEmail", props.userEmail);
            // console.log(url);
            
            //should await this...
            navigator.clipboard.writeText(url.toString());
            window.alert("Copied sharable link " + url.toString() + " to clipboard :D");


        } else {
            window.alert("Couldn't create sharable link :(");
        }
    }

    // each saved model has a box for the model (small box), button to download, button to share a link
    // later add ability to give model a name (reconfigure from list to dict in backend), delete model
    useEffect(() => {
        if (numDownload > 0) {
          const exporter = new GLTFExporter();
          exporter.parse(
            meshRef.current, 
            (gltf) => {
              const output = JSON.stringify(gltf, null, 2);
              saveString(output, 'model.gltf');
            }, 
            (error) => {
            },
            {} 
          );
        }
      }, [numDownload]);

    function requestDownload() {
        setNumDownload(numDownload+1);
    }
    return (
        <div className="saved-model">
            <Grid container spacing={2}>
                <div className="saved-content"> 
                    <Paper className="canvas-container">
                        <Canvas>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[20, 20, 20]} />
                        <OrbitControls />
                        { 
                        props.model.tiles.map((tile, i) => {
                            return (
                            <ModelTile 
                                modelPath={fileTileMap[tile["file"]]} 
                                position={tile["position"]}
                                rotation={[0, tile["rotation"] * Math.PI / 2, 0]}
                            />
                            );
                        })
                        }

                        </Canvas>
                    </Paper>
                </div>
                <Grid item>
                    <TextField
                        label={modelName}
                        placeholder={modelName}
                        value={modelName}
                        variant='outlined'
                        onChange={handleChangeModelName}
                    />
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={requestDownload}>Download</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={exportLink}>Get Share Link</Button>
                </Grid>
            </Grid>
        </div>
    )
}