# project-t11-proceduralgeneration
Project Name (temp): Procedural City Generator
Create a creative tool to procedurally generate a city model using the wave function collapse algorithm.


| Team Member  | Github Username |
| -----------  | --------------- |
| Bryan Zhang  | Bryanz2019     |
| Anderson Liu | AndyMcGamer    |
| Matthew Ho   | msho-student   |
| Richard Gao  | boopa5         |
| Shuning Liu  | shuningliu     |
| Christine Tu | christinetu15  |

# Lab01 Hello World Web App
Deployed website link: [https://cs148hello.web.app](https://cs148hello.web.app)

## Deploying this Hello World Webapp
1. Sign in and create a new project at https://firebase.google.com
2. On local machine: `npm install --location=global firebase-tools`
3. `firebase login`, then sign into google account
4. In web app directory (`/matthew-hello-world`) run `firebase init`
  - select "Hosting: Configure files for Firebase Hosting..."
  - select account (if multiple accounts saved to firebase CLI tool)
  - select project created in step 1 from list
  - type "build" for public directory
  - select yes for single-page app
  - select no for automatic builds and deploys with Github
5. Run `npm run build`
6. Run `firebase deploy`
