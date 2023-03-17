import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavBar from './components/NavBar';
import './components/style.css';
import { useLocation, useNavigate } from 'react-router-dom';

import Image1 from './resources/FrontPage.png'
import Image2 from './resources/ErrorPage.png'

function About() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname);
    // onClick={()=>navigate(-1)}

    return (
      <div className="About">
        <Toolbar
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
            <IconButton onClick={()=>navigate(-1)}>
                <ArrowBackIcon/>
            </IconButton>
            <ViewInArIcon />

            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                sx={{ flex: 1 }}
                >
                3D Environment Procedural Generator
            </Typography>

            <NavBar></NavBar>
        </Toolbar>
        <h1>About</h1>
        <h2>About This App</h2>
            <h3>Product Purpose</h3>
                <p>This product helps users to procedurally generate custom 3D environments through a graphical interface. As a web app, no software download or installation is required to hit the ground running. It requires no knowledge of algorithms behind the generation and it has a friendly user interface.</p>
            <h3>Intended User Audience</h3>
                <p>This tool is built for designers inexperienced with code-oriented tools to iterate on environments quickly. The tool allows designers to create larger models much faster than by hand, and through an easier and more accessible tool than game engines or other design software.</p>
        <h2>User Manual</h2>
            <h3>Basic Operation</h3>
                <img src={Image1} className="Img"/>
                <h4>Control Panel (Right)</h4>
                    <ul>
                        <li>Use the sliders to adjust the size of the generated environment</li>
                        <li>Click the “GENERATE” button to create a new model using our default tiles which are prototypes for a simple city design</li>
                        <li>Click the “DOWNLOAD” button to download the generated model as in .gltf file format</li>
                    </ul>
                <h4>Canvas (Left)</h4>
                    <ul>
                        <li>Drag the mouse on the canvas to control the camera and view the model from different angles</li>
                    </ul>
                <h4>Header Bar (Top)</h4>
                    <ul>
                        <li>Click the light/dark mode toggle on the right to change the theme</li>
                    </ul>
            <h3>Editing the Generation</h3>
                <ul>
                    <li>Click on a tile in the generated environment to select it</li>
                        <ul>
                            <li>Selecting a tile highlights it in red</li>
                        </ul>
                    <li>Use the selected tile menu to perform actions</li>
                        <ul>
                            <li>Click the back arrow to unselect</li>
                            <li>Click the delete button to delete the tile</li>
                            <li>Click the rotate button to rotate the tile</li>
                            <li>Select a replacement in the dropdown and click the swap button to replace the selected tile</li>
                        </ul>
                </ul>
            <h3>Tile Customization</h3>
                <p>Our prototype tiles are rudimentary. The real power of the application is in the level of customization we provide to users. Click the “CUSTOMIZE” button to access the Tile Settings Menu.</p>
                <p>For more info, check out the link:</p>
                <a href="https://docs.google.com/document/d/164QHBM2JcjjnHsfeIHww2jYJZYaF_qPwue93dyXSlxs/">MANUL</a>
            <h3>Account</h3>
                <p>Click the sign-in button, to choose the Google account you want to choose to log in. Then you can upload your own models for creating city models, or you can save your generated city models to your accounts.</p>
        <h2>Meet the Team</h2>
            <img src={Image2} className="Img"/>
            <p></p>
      </div>
    );
}

export default About;