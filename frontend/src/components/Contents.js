import './style.css';
import Image1 from '../resources/FrontPage.png'
import Image2 from '../resources/ErrorPage.png'
import Image3 from '../resources/p1.png'
import Image4 from '../resources/p2.png'
import Image5 from '../resources/p3.png'
import Image6 from '../resources/p4.png'
import Image7 from '../resources/p5.png'
import Image8 from '../resources/p6.png'
import Image9 from '../resources/p7.png'
import Image10 from '../resources/p8.png'

function Contents(){
    return(
      <div className="c">
        <h1>Wiki</h1>
        <h2 id="header2-1">About This App</h2>
            <h3 id="header3-1">Product Purpose</h3>
                <p>This product helps users to procedurally generate custom 3D environments through a graphical interface. As a web app, no software download or installation is required to hit the ground running. It requires no knowledge of algorithms behind the generation and it has a friendly user interface.</p>
            <h3 id="header3-2">Intended User Audience</h3>
                <p>This tool is built for designers inexperienced with code-oriented tools to iterate on environments quickly. The tool allows designers to create larger models much faster than by hand, and through an easier and more accessible tool than game engines or other design software.</p>
        <h2 id="header2-2">User Manual</h2>
            <h3 id="header3-3">Basic Operation</h3>
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
                    <img src={Image3} className="Img"/>
                    <ul>
                        <li>Click the light/dark mode toggle on the right to change the theme</li>
                    </ul>
            <h3 id="header3-4">Editing the Generation</h3>
                <ul>
                    <li>Click on a tile in the generated environment to select it</li>
                        <ul>
                            <li>Selecting a tile highlights it in red</li>
                        </ul>
                    <img src={Image4} className="Img"/>
                    <li>Use the selected tile menu to perform actions</li>
                        <ul>
                            <li>Click the back arrow to unselect</li>
                            <li>Click the delete button to delete the tile</li>
                            <li>Click the rotate button to rotate the tile</li>
                            <li>Select a replacement in the dropdown and click the swap button to replace the selected tile</li>
                        </ul>
                    <img src={Image5} className="Img"/>
                </ul>
            <h3 id="header3-5">Tile Customization</h3>
                <p>Our prototype tiles are rudimentary. The real power of the application is in the level of customization we provide to users. Click the “CUSTOMIZE” button to access the Tile Settings Menu.</p>
                <h4>Adding New Tiles</h4>
                    <img src={Image6} className="Img"/>
                    <ol>
                        <li>Click the “NEW TILE” button to add custom tiles</li>
                        <li>Click the CHOOSE FILE button to select a .gltf file</li>
                        <li>Use the dropdown to describe the new block’s rotational symmetry</li>
                            <ul>
                                <li>If the block is identical when rotating 90, 180, or 270 degrees, then select 4-way</li>
                                <li>If the block is identical when rotating 180 degrees, then select 2-way</li>
                                <li>For all other cases, select 1-way</li>
                            </ul>
                        <li>Click UPLOAD to complete the upload</li>
                    </ol>
                <h4>Editing Tile Generation Properties</h4>
                    <p>Select a tile from the dropdown to get started.</p>
                    <img src={Image7} className="Img"/>
                    <ul>
                        <li>Use the switches to control whether to use a block in the generation (and at what heights)</li>
                        <li>Use the Random Selection Weight slider to bias the algorithm in favour of certain tiles when randomly selecting from a remaining option list (use higher weight for higher generation frequency).</li>
                    </ul>
                <h4>Editing Neighbor Constraints</h4>
                    <p>The Wave Function Collapse Algorithm is a constraint solver. We informed the algorithm that on the +x-axis face, block A can have neighbors of block B with rotation r. To allow users to fully control generation, we provide an interface for editing these constraints.</p>
                    <h5>Viewing and Removing Existing Neighbor</h5>
                        <img src={Image8} className="Img"/>
                        <ul>
                            <li>Select a tile from the dropdown under “Add or Remove Allowed Neighbors” to view the neighbor relation</li>
                            <li>Click the “DELETE NEIGHBOR” button to remove the relation</li>
                        </ul>
                    <h5>Adding a New Neighbor </h5>
                        <img src={Image9} className="Img"/>
                        <ul>
                            <li>Click the “+ ADD ALLOWED NEIGHBOR” button to begin</li>
                            <li>Select a direction for the new neighbor in the direction dropdown</li>
                            <li>Select a tile from the new neighbor dropdown</li>
                            <li>Click the Rotate Button to rotate the new neighbor tile</li>
                            <li>Click the SAVE button to add the new neighbor</li>
                        </ul>
            <h3 id="header3-6">Account</h3>
            <img src={Image10} className="Img"/>
                <p>Click the sign-in button, to choose the Google account you want to choose to log in. Then you can upload your own models for creating city models, or you can save your generated city models to your accounts.</p>
        <h2 id="header2-3">Meet the Team</h2>
            <img src={Image1} className="Img"/>
            <p></p>
      </div>
    );
}

export default Contents;