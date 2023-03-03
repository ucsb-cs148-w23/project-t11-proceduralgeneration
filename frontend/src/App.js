import './App.css';
import ControlPanel from './components/ControlPanel.js';
import TilePanel from './components/TilePanel.js';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header.js'
import Lato from "./fonts/Lato-Regular.ttf";
import ModelTile from './components/ModelTile.js'
import Paper from '@mui/material/Paper';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo, useRef, useState, createContext } from 'react';
import { fileTileMap, defaultCollapsed } from './defaultTiles.js';

const ControlsContext = createContext();

function App() {
  const [scaleX, setScaleX] = useState(8);
  const [scaleY, setScaleY] = useState(8);
  const [scaleZ, setScaleZ] = useState(8);
  // const [color, setColor] = useState("#FEFBEA");
  const [numDownload, setNumDownload] = useState(0);
  const [mode, setMode] = useState("light");;
  const [modelTiles, setModelTiles] = useState([]);
  const [tilePanel, setTilePanel] = useState(false); // [true, false
  const [tile, setTile] = useState(null);
  const [neighbor, setNeighbor] = useState(null);
  const [tiles, setTiles] = useState(defaultCollapsed);
  const meshRef = useRef();

  // light/dark mode toggle
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

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
        tilePanel, setTilePanel,
        tile, setTile,
        tiles, setTiles,
        neighbor, setNeighbor,
        colorMode,
        meshRef
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header className="header" />
          <div className="content"> 
            <Paper className="canvas-container">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[20, 20, 20]} />
                  <OrbitControls />
                  <group ref={meshRef}>
                  { 
                    tilePanel?
                    (
                      tile && 
                      <ModelTile 
                        modelPath={fileTileMap[tile]} 
                        position={[0, 0, 0]} 
                        rotation={[0, 0, 0]} 
                      />
                    )
                    : modelTiles.map((tile, i) => {
                      return (
                        <ModelTile 
                          modelPath={fileTileMap[tile["file"]]} 
                          position={tile["position"]}
                          rotation={[0, tile["rotation"] * Math.PI / 2, 0]}
                        />
                      );
                    })
                  }
                  </group>
                </Canvas>
            </Paper>
            {
              tilePanel? <TilePanel /> : <ControlPanel />
            }
          </div>
        </div>
      </ThemeProvider>
    </ControlsContext.Provider>
  );
}

export { ControlsContext };
export default App;
