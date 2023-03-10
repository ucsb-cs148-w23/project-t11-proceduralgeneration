import { useState, useEffect, useRef, useContext, Suspense } from 'react';
import { Grid, Button } from '@mui/material';
import ModelTile from './ModelTile.js';
import Paper from '@mui/material/Paper';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { fileTileMap } from '../defaultTiles.js';
import { ControlsContext } from '../App.js';
// import Loader from './Loader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

export default function SavedModels(props) {
    // console.log("rendering saved model");
    // console.log(props.model);
    const { numDownload, setNumDownload } = useContext(ControlsContext);
    const meshRef = useRef();

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
    // each saved model has a box for the model (small box), button to download, button to share a link
    useEffect(() => {
        // console.log("useEffect reached");
        // console.log(numDownload);
        if (numDownload > 0) {
          const exporter = new GLTFExporter();
          exporter.parse(
            meshRef.current, 
            (gltf) => {
              const output = JSON.stringify(gltf, null, 2);
            //   console.log('File gltf stringified', output);
              saveString(output, 'model.gltf');
            }, 
            (error) => {
            //   console.log('Error when parsing', error);
            },
            {} // options
          );
        }
      }, [numDownload]);

    function requestDownload() {
        // console.log("download requested");
        setNumDownload(numDownload+1);
    }
    return (
        <div>
            <Grid container spacing={2}>
                {/* {
                  props.model.map((tile, i) => {
                    return (
                        <Grid item>
                            <Suspense fallback={<Loading />}>
                                <ModelTile 
                                    modelPath={fileTileMap[tile["file"]]} 
                                    position={tile["position"]}
                                    rotation={[0, tile["rotation"] * Math.PI / 2, 0]}
                                />
                            </Suspense>
                        </Grid>
                        
                    );
                  })
                } */}
                <div className="saved-content"> 
                    <Paper className="canvas-container">
                        <Canvas>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[20, 20, 20]} />
                        <OrbitControls />
                        { 
                        props.model.map((tile, i) => {
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
                    <Button variant="outlined" onClick={requestDownload}>Download</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined">Get Share Link</Button>
                </Grid>
            </Grid>
        </div>
    )
}