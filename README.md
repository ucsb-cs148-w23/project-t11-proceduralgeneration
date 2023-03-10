# project-t11-proceduralgeneration
Project Name (temp): Procedural City Generator

One line description: Create a creative tool to procedurally generate a city model using the wave function collapse algorithm.


| Team Member  | Github Username |
| -----------  | --------------- |
| Bryan Zheng  | Bryanz2019     |
| Anderson Liu | AndyMcGamer    |
| Matthew Ho   | msho-student   |
| Richard Gao  | boopa5         |
| Shuning Liu  | shuningliu     |
| Christine Tu | christinetu15  |


## Tech stack 
- front-end: React.js
- front-end deployment: firebase
- back-end: Flask (Python)
- back-end deployment: AWS EC2
- database/store: Firebase Cloud Storage or MongoDB

## Approach
We're planning to make a web app with interface elements to generate a 3D city model, download model files, and get/create a link for sharing.
As a stretch goal we would like to have options to manually edit tiles.
For the generation, we're planning to deploy a flask (python) back-end on an EC2 instance.

## User role
We have one user role. Our tool is designed for game developers who want to create city environment for video game 
but lack the time or knowledge to model an entire city environment.
This user wants to use procedural generation algorithms but without needing to learn game-engine specifics or buying permissions from commercial software.

## Permissions
We may later choose to implement login and authorization for sharing with permissions. 

## Installation

### Prerequisites
Git - 2.31.1 or better
React - 18.2.0 or better
Flask - 2.2.2 or better

### Dependencies
open3D - purpose: used for dealing with 3D data in the backend
threeJS - purpose: renders the vertices to create a 3D model in the frontend

### Installation Steps
for backend:
- clone this repo, `cd` into it
- run `pip install -r requirements.txt` in top level of repo (where `requirements.txt` lives)
- `cd backend`
- either 
  1. `flask run --host=0.0.0.0 --port=8080`
  2. `python app.py`

for fronted:
 - clone this repo, `cd` into it
 - `cd frontend`
 - `npm start`

### Functionality
To generate a model, navigate to the site. Set x, y, and z parameters (how large the model will be in the x, y, and z dimensions). Click on the generate button. Verify that a model is generated. 

To download a model, after generating a model (see steps above), click on the download button to the right of the generate button. Verify that a file has been downloaded (should be a .gltf file).

Extra add-ons:
 - To change the color of your model: 
After generating a model, users can change the color of the model. In the box with several color squares, click on the desired color you want to change the model color to. Alternatively, you can also input a unique color in the box on the bottom right.
 - To use site in dark mode: 
 Click on the dark mode toggle in the top right corner.

### Known Problems
Sometimes when using a browser other than Safari (such as Chrome), rendering is spotty when using large inputs for X, Y, and Z.

Steps to reproduce issue: (not guaranteed to happen)
1. Open the site on a browser other than Safari
2. Set the X, Y, and Z inputs to the maximum value (or a value larger than 15)
3. Click on the Generate button
4. The generated model could have missing vertices (appears as empty triangles)

### Contributing
1. Fork it!
2. reate your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -m 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

### Unit Test Documentation
 - unit test for wfc helper functions are located in the backend folder, called wfc_unit_tests.py
