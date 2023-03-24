# Deployment
The prod deployment is live at https://helloworld-66bb0.web.app/

## Local Deployment Instructions
1. clone repo
2. `cd frontend`
3. `npm start`

### Optional Instructions for Running API Locally
3. spin up flask server
  - install requirements: `pip install -r requirements.txt`
  - start server: `cd backend` then `python app.py --dev`
4. point frontend at local API: change `/frontend/src/constants.js`'s `DOMAIN` to the url specified by flask 
