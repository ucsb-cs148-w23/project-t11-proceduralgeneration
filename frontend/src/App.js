import './App.css';
import { ControlsContext } from './Root.js';
import ControlPanel from './components/ControlPanel.js';
import TileSettings from './components/TileSettings.js';
import Header from './components/Header.js'
import ModelTile from './components/ModelTile.js'
import WaterPlane from './components/WaterPlane.js'
import Loader from './components/Loader.js'
import Paper from '@mui/material/Paper';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { 
  useEffect,
  useContext,
  Fragment, 
  Suspense 
} from 'react';
import { DOMAIN, DIR2POS } from "./constants.js";
import { filterMissingTiles } from './utils';


function App() {

  const {
    scaleX,
    scaleZ,
    modelTiles, setModelTiles,
    showTileSettings,
    tile,
    tiles,
    name2file,
    neighbor,
    clickedTile,
    meshRef,
    promiseInProgress,
    showWater,
    showSunset,
    loggedIn,
    userEmail,
  } = useContext(ControlsContext);

  useEffect(() => {
    function getUrlParams() {
      const url = new URL(window.location.href);
      const email = url.searchParams.get("userEmail");
      const id = url.searchParams.get("modelId");

      if (email && id) {
        const getUpdateNameUrl = new URL(`${DOMAIN}:8080/get_model`);
        
        const postData = {
            "email": email,
            "id": id,
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
            let model = data?.model;
            if (model) {
              filterMissingTiles(model, name2file);
              setModelTiles(model.tiles);
            }
        });
      }
    }
    getUrlParams();
  }, [])

  return (
    <div className="App">
      <Header className="header" isLoggedIn={loggedIn} userEmail={userEmail} />
      <div className="content"> 
        <Paper className="canvas-container">
          <Canvas>
            <Loader/>  
            { !promiseInProgress && (
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[20, 20, 20]} />
                <OrbitControls />
                
                {
                  showWater &&
                  <WaterPlane xSize={scaleX} zSize={scaleZ}/>
                }

                { 
                  showTileSettings?
                  (
                    tile && 
                    <group>
                      <ModelTile 
                        modelPath={name2file[tile]} 
                        position={[0, 0, 0]} 
                        rotation={[0, 0, 0]} 
                        onClick={() => null}
                      />
                      {
                        (neighbor && (neighbor["id"] !== "m9")) &&
                        <ModelTile
                          modelPath={name2file[tiles[neighbor["id"]]["mesh"]]}
                          position={DIR2POS[neighbor["direction"]].map(x => x * 2)}
                          rotation={[0, neighbor["rotation"] * Math.PI / 2, 0]}
                          onClick={() => null}
                        />
                      }
                    </group>
                  )
                  :
                  <Fragment>
                    <group ref={meshRef}>
                      { 
                        modelTiles.map((tile, i) => {
                          return (
                            <ModelTile 
                              key={i}
                              idx={i}
                              modelPath={name2file[tile["file"]]} 
                              position={tile["position"]}
                              rotation={[0, tile["rotation"] * Math.PI / 2, 0]}
                            />
                          );
                        })
                      }
                    </group>
                    {
                      (
                        clickedTile !== null
                        && clickedTile < modelTiles.length
                      ) &&
                      <mesh position={modelTiles[clickedTile]["position"]} scale={2.05}>
                        <boxGeometry />
                        <meshPhongMaterial color="#ff0000" opacity={0.1} transparent />
                      </mesh>
                    }
                  </Fragment>
                }
              </Suspense>
            )}
          </Canvas>
        </Paper>
        {
          showTileSettings? 
          <TileSettings /> 
          : <ControlPanel isLoggedIn={loggedIn} userEmail={userEmail} />
        }
      </div>
    </div>
  );
}

export default App;
