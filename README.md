# project-t11-proceduralgeneration
Project Name: 3D Environment Generator 

One line description: a creative tool for procedurally generating 3D environments using the wave function collapse algorithm.


| Team Member  | Github Username |
| -----------  | --------------- |
| Bryan Zheng  | Bryanz2019     |
| Anderson Liu | AndyMcGamer    |
| Matthew Ho   | matt-seb-ho   |
| Richard Gao  | boopa5         |
| Shuning Liu  | shuningliu     |
| Christine Tu | christinetu15  |

## Tech stack 
- front-end: React.js
- front-end deployment: Firebase
- back-end: Flask
- back-end deployment: AWS EC2
- database/store: MongoDB

## Repo Organization
- Project Code resides primarily in the `/backend` and `/frontend` directories
  - the backend folder contains the main API entry in `app.py` and the main generator class in `wfc.py`
  - the frontend folder is react app with code mostly in `src` and `src/components` and supporting assets elsewhere
- Supporting assets such as 3D models live in `/CityModels` and `/lavaBlocks` while default adjacency data is in `/prototypes`

## Approach
We made a web app with GUI elements to generate arbitrary 3D environment models with powerful customization and the ability to easily save configurations, download and upload generated environments to the cloud, as well as easy link sharing. We used an EC2 instance as our backend server and MongoDB for saving progress to the cloud.

## User role
We have one user role. Our tool is intended for designers who want to create and iterate on 3D environments quickly and easily with fine-grained control.
This user wants to use procedural generation algorithms but without needing to learn game-engine specifics or buying permissions from commercial software.

## Installation (for Testing/Running Locally)
### Prerequisites
Git - 2.31.1 or better
React - 18.2.0 or better
Flask - 2.2.2 or better

### Dependencies
threeJS - purpose: renders the vertices to create a 3D model in the frontend

### Functionality (heavily abbreviated)
To generate a model, navigate to the site. 
- Set the dimensions of the environemnt. 
- Add tiles and customize constraints under the customize menu (click CUSTOMIZE).
- Click on the generate button.
- Name the model in a text field and download as .gltf
- Login in to save/load models to/from the cloud
Complete details are available in the [manual](https://docs.google.com/document/d/164QHBM2JcjjnHsfeIHww2jYJZYaF_qPwue93dyXSlxs/edit?usp=sharing).

Extra add-ons:
 - Add a water feature to the canvas with the 'water toggle' 
 - To use site in dark mode: 
 Click on the dark mode toggle in the top right corner.

### Known Problems
- cloud-saves with user-uploaded tiles require the custom tiles to be re-uploaded in order to be used.
- browser-side rendering is limited: using large generations strains the browser.
- adding a rotated empty/"none" tile as an adjacency does not work. Do not rotate the empty block.

### Contributing
1. Fork it!
2. reate your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -m 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

### Unit Test Documentation
 - unit test for wfc helper functions are located in the backend folder, called wfc_unit_tests.py
 
## Deployment
Prod: [https://helloworld-66bb0.web.app/](https://helloworld-66bb0.web.app/)

Instructions for running the frontend/backend locally are available in `/docs/DEPLOY.md`
