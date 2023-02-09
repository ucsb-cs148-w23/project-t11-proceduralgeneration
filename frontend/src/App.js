import './App.css';
import ControlPanel from './components/ControlPanel.js'
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header.js'
import Lato from "./fonts/Lato-Regular.ttf";
import Model from './components/Model.js'
import Paper from '@mui/material/Paper';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { defaultVertices, defaultVertexCount } from './constants.js';
import { useState, useMemo, createContext } from 'react';

const ControlsContext = createContext();

function App() {
  const [vertices, setVertices] = useState(defaultVertices);
  const [vertexCount, setVertexCount] = useState(defaultVertexCount);
  const [scaleX, setScaleX] = useState(8);
  const [scaleY, setScaleY] = useState(8);
  const [scaleZ, setScaleZ] = useState(8);
  const [color, setColor] = useState("#FEFBEA");
  const [numDownload, setNumDownload] = useState(0);
  const [mode, setMode] = useState("light");;

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

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
        vertices, setVertices, 
        vertexCount, setVertexCount, 
        numDownload, setNumDownload,
        scaleX, setScaleX,
        scaleY, setScaleY,
        scaleZ, setScaleZ,
        color, setColor,
        colorMode
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header className="header" />
          <div className="content"> 
            <Paper className="canvas-container">
                <Canvas>
                  <ambientLight intensity={1} />
                  <pointLight position={[20, 20, 20]} />
                  <OrbitControls />
                  <Model 
                    position={[0, 0, 0]}
                    vertices={vertices} 
                    vertexCount={vertexCount}
                  />
                </Canvas>
            </Paper>
            <ControlPanel />
          </div>
        </div>
      </ThemeProvider>
    </ControlsContext.Provider>
  );
}

export { ControlsContext };
export default App;
