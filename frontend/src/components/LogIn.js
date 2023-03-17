import { useContext } from 'react';
import { ControlsContext } from '../Root.js';
import { GoogleLogin } from '@react-oauth/google';
import { DOMAIN } from "../constants.js";
import jwt_decode from 'jwt-decode';

export default function LogIn() {
  const { 
    setUserEmail,
    setLoggedIn,
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
    let userObject = jwt_decode(response.credential);
    onSignIn(userObject.email);
    setUserEmail(userObject.email);
  }

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <GoogleLogin onSuccess={handleCallbackResponse} onError={errorMessage} />
  )
}
