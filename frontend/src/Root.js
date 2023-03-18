import { Routes, Route } from "react-router-dom";
import App from "./App";
import NoMatch from "./NoMatch";
import About from "./About";
import CssBaseline from '@mui/material/CssBaseline';
import Lato from "./fonts/Lato-Regular.ttf";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  useMemo, 
  useRef, 
  useState, 
  createContext
} from 'react';
import { fileTileMap, defaultCollapsed, defaultFile2id } from './defaultTiles.js';
import { usePromiseTracker } from "react-promise-tracker";
import './App.css';

const ControlsContext = createContext();

function Root() {
  
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
  const [showSunset, setShowSunset] = useState(false);
  const [modelName, setModelName] = useState("Untitled");

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
        showSunset, setShowSunset,
        loggedIn, setLoggedIn,
        userEmail, setUserEmail,
        modelName, setModelName
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="Root">
          <Routes>
            <Route path="/" element={ <App/> } />
            <Route path="/About" element={ <About/> } />
            <Route path="*" element={ <NoMatch/> } />
          </Routes>
        </div>
      </ThemeProvider>
    </ControlsContext.Provider>
  );
}

export { ControlsContext };
export default Root;
