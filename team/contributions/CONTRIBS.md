# Andy:
# Contributions
- Created and implemented first version of WFC algorithm
- Modeled 3d blocks for starter tileset as a basis for the algorithm
- Tested and helped make bugfixes to the frontend
- Added plane with water shader with toggles for changing water color
- Created additional detailed tiles for demo/testing

# Bryan:
Contributions

- Frontend
    - Implemented routing
        - Refactored frontend
        - Created custom 404 page
        - Created wiki page with user navigation support
    - Implemented model download logic
    - Added loading screen for fetch requests
- Testing
    - Frontend unit-testing and Threejs component-testing
    - Investigated the plausibility for integration & end-to-end testing
    - User-testing new features as they release
- Documents
    - MVP presentation
    - App design document

Explanation for low lines added: Most of my code build on top of the existing structures, so there’s little need to introduce new files/libraries/packages

# Christine
# Contributions
## Frontend
 - implemented user accounts
    - refactored google login with react google oauth
    - create account, login, and logout
    - user options dropdown
 - implemented saved models
    - view saved models
    - download/share/rename saved model
 - implemented link sharing for saved models
 - tested and helped with frontend bug fixes
 - cleanup code

## Backend
 - connected backend to mongodb
 - added endpoints to save/retrieve saved model, update model name, create users, login
 - cleanup code

## Testing
 - added frontend component tests

# Matthew
Contributions
- frontend
  - implemented tile customization
    - view tile
    - upload new tile
    - adjust weight/inclusion
    - view/add/delete neighbor (+ frontend logic to adjust constraint data)
  - created upload/download tile configuration functionality
  - added tile selection + single tile edits
    - rotate/delete/replace individual tiles in the generation
  - revised UI for Saved Models
  - bugfixes
 - backend
   - setup flask backend
   - optimized the WFC algorithm to run up to dim=20 on micro EC2 instance
   - deployed backend (register domain, obtain SSL certificates)
   - updated backend to accept tile constraint data from the frontend
   - implemented rotation expansion (takes constraint data and expands symmetrical possibilities)
   - added delete saved model endpoint

# Richard
## Contributions

- Helped test and debug frontend features
- Designed labeling scheme for adjacency rules through model sockets and prototypes.
- Labeled initial set of sockets for default models.
- Created script for generating adjacency rules given labeled model sockets
- Created scripts to automate model socket labeling and adjacency generation to pass into the final constraint solver

# Shuning
Register google cloud account and try to make a google login function
Help to write some doc
Try to add input slider and log in button
