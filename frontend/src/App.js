import './App.css';
import ControlPanel from './components/ControlPanel.js'
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header.js'
import Lato from "./fonts/Lato-Regular.ttf";
import Model from './components/Model.js'
import ModelTile from './components/ModelTile.js'
// import onSignIn from './components/LogIn.js';
import Paper from '@mui/material/Paper';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { defaultVertices, defaultVertexCount } from './constants.js';
import { useState, useMemo, createContext } from 'react';
import { fileTileMap } from './defaultTiles.js';
import { getOptionGroupUnstyledUtilityClass } from '@mui/base';
import{ useEffect} from 'react';
import jwt_decode from 'jwt-decode';

const ControlsContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState();

  function onSignIn(user_email) {
    console.log("user is signing in");
  
    // -> local testing
    const domain = "http://127.0.0.1"
    // -> server testing
    // const domain = "3.132.124.203"
    // -> prod
    // const domain = "https://deez.mturk.monster"
    
    const logInUrl = new URL(`${domain}:8080/login`);
    console.log(logInUrl);
  
    const postData = {
        "email": user_email
    }
  
    console.log(JSON.stringify(postData));
    
    fetch(logInUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      .then(r => r.json())
      .then(data => {
        console.log(data);
        console.log("yay!");
        //now turn sign in button to user dropdown
        setLoggedIn(true);
    });
    
  }

  function handleCallbackResponse(response){
    console.log("encoded JWT ID token: "+ response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    // send email to backend to add account
    // const user_email = ;
    // console.log(user_email);
    onSignIn(userObject.email);
    setUserEmail(userObject.email);
  }
  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:"971264102154-4lp0bdl42fgvpatk5933gvsg6kk36quf.apps.googleusercontent.com",
      callback: handleCallbackResponse


    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline",size:"large"}
    );

  },[])
  const [vertices, setVertices] = useState(defaultVertices);
  const [vertexCount, setVertexCount] = useState(defaultVertexCount);
  const [scaleX, setScaleX] = useState(8);
  const [scaleY, setScaleY] = useState(8);
  const [scaleZ, setScaleZ] = useState(8);
  const [color, setColor] = useState("#FEFBEA");
  const [numDownload, setNumDownload] = useState(0);
  const [mode, setMode] = useState("light");;
  const [modelTiles, setModelTiles] = useState([]);

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
        colorMode,
        modelTiles, setModelTiles
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header className="header" isLoggedIn={loggedIn} userEmail={userEmail} />
          <div className="content"> 
            <Paper className="canvas-container">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[20, 20, 20]} />
                  <OrbitControls />

                  {/* <Model 
                    position={[0, 0, 0]}
                    vertices={vertices} 
                    vertexCount={vertexCount}
                  /> */}
                { 
                  modelTiles.map((tile, i) => {
                    return (
                      <ModelTile 
                        modelPath={fileTileMap[tile["file"]]} 
                        position={tile["position"]}
                        rotation={[0, tile["rotation"] * Math.PI / 2, 0]}
                      />
                    );
                  })
                }
                {/*
                  modelTiles.length && 
                  <ModelTile
                    modelPath={fileTileMap[modelTiles[0]["file"]]}
                    position={modelTiles[0]["position"]}
                    rotation={[0, modelTiles[0]["rotation"] * Math.PI / 2, 0]}
                  />
                */}

                </Canvas>
            </Paper>
            <ControlPanel isLoggedIn={loggedIn} userEmail={userEmail} />
          </div>
        </div>
      </ThemeProvider>
    </ControlsContext.Provider>
  );
}

export { ControlsContext };
export default App;
