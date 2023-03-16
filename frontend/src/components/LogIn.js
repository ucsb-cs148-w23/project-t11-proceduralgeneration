import { useContext } from 'react';
import { ControlsContext } from '../App.js';
import { GoogleLogin } from '@react-oauth/google';
import { DOMAIN } from "../constants.js";
import jwt_decode from 'jwt-decode';

export default function LogIn() {
  const { 
    setUserEmail,
    setLoggedIn,
    setUser,
  } = useContext(ControlsContext);

  function onSignIn(user_email) {
    const logInUrl = new URL(`${DOMAIN}:8080/login`);
    const postData = {
        "email": user_email
    }

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
        setLoggedIn(true);
    });
  }

  function handleCallbackResponse(response){
    // console.log("encoded JWT ID token: "+ response.credential);
    let userObject = jwt_decode(response.credential);
    // console.log(userObject);
    setUser(userObject);
    onSignIn(userObject.email);
    setUserEmail(userObject.email);
  }

  const errorMessage = (error) => {
    console.log(error);
  };

  // const { loginBoxRef } = useContext(ControlsContext);


  return (
    // <Box ref={loginBoxRef} ></Box>
    <GoogleLogin onSuccess={handleCallbackResponse} onError={errorMessage} />
  )
}
