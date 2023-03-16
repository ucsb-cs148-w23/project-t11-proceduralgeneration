import './App.css';
import ControlPanel from './components/ControlPanel.js';
import TileSettings from './components/TileSettings.js';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header.js'
import Lato from "./fonts/Lato-Regular.ttf";
import ModelTile from './components/ModelTile.js'
import WaterPlane from './components/WaterPlane.js'
// import onSignIn from './components/LogIn.js';
import Loader from './components/Loader.js'
import Paper from '@mui/material/Paper';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  useEffect, 
  useMemo, 
  useRef, 
  useState, 
  createContext, 
  Fragment, 
  Suspense 
} from 'react';
import { fileTileMap, defaultCollapsed, defaultFile2id } from './defaultTiles.js';
import { usePromiseTracker } from "react-promise-tracker";

const dir2pos = {
  "px": [1, 0, 0],
  "nx": [-1, 0, 0],
  "pz": [0, 1, 0],
  "nz": [0, -1, 0],
  "py": [0, 0, 1],
  "ny": [0, 0, -1]
};
const ControlsContext = createContext();

function App() {
  const [scaleX, setScaleX] = useState(8);
  const [scaleY, setScaleY] = useState(8);
  const [scaleZ, setScaleZ] = useState(8);
  const [numDownload, setNumDownload] = useState(0);
  const [mode, setMode] = useState("light");
  const [modelTiles, setModelTiles] = useState([]);
  const [showTileSettings, setShowTileSettings] = useState(false); // [true, false
  const [tile, setTile] = useState(null);
  const [neighbor, setNeighbor] = useState(null);
  const [tiles, setTiles] = useState(defaultCollapsed);
  const [file2id, setFile2id] = useState(defaultFile2id);
  const [name2file, setName2file] = useState(fileTileMap);
  const [clickedTile, setClickedTile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [showWater, setShowWater] = useState(false);

  const meshRef = useRef();
  const loginBoxRef = useRef();
  const { promiseInProgress } = usePromiseTracker();

  // light/dark mode toggle
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  function getUrlParams() {
    const url = new URL(window.location.href);
    // console.log(window.location.href);
    const email = url.searchParams.get("userEmail");
    const id = url.searchParams.get("modelId");

    if (email && id) {
      //make get request to get model vertices 
      // const domain = "http://127.0.0.1"
      // -> server testing
      // const domain = "3.132.124.203"
      // -> prod
      const domain = "https://shadydomain.click";
      
      const getUpdateNameUrl = new URL(`${domain}:8080/get_model`);
      
      const postData = {
          "email": email,
          "id": id,
      }
      // console.log(postData);
      
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
          // console.log("save data: ", data);
          setModelTiles(data?.model?.tiles);
          // return data;
      });

  }

  }
  
  useEffect(() => {

    getUrlParams();

  }, [])


  // custom MUI theme
  const theme = useMemo(
    () => createTheme({
      palette: { mode },
      typography: {
        fontFamily: 'Lato, Arial'
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'Lato';
              font-style: 'normal';
              font-display: swap;
              src: url(${Lato}) format('truetype');
            }
          `,
        }
      }
    }),
    [mode],
  );

  return (
    <ControlsContext.Provider 
      value={{ 
        scaleX, setScaleX,
        scaleY, setScaleY,
        scaleZ, setScaleZ,
        modelTiles, setModelTiles,
        numDownload, setNumDownload,
        showTileSettings, setShowTileSettings,
        tile, setTile,
        tiles, setTiles,
        file2id, setFile2id,
        name2file, setName2file,
        neighbor, setNeighbor,
        clickedTile, setClickedTile,
        colorMode,
        meshRef,
        loginBoxRef,
        promiseInProgress,
        showWater, setShowWater,
        user, setUser,
        loggedIn, setLoggedIn,
        userEmail, setUserEmail,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
                            (neighbor && (neighbor["label"] !== "none")) &&
                            <ModelTile
                              modelPath={name2file[tiles[neighbor["id"]]["mesh"]]}
                              position={dir2pos[neighbor["direction"]].map(x => x * 2)}
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
                          clickedTile &&
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
      </ThemeProvider>
    </ControlsContext.Provider>
  );
}

export { ControlsContext };
export default App;
