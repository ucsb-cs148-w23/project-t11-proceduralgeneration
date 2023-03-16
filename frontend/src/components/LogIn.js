import { useContext } from 'react';
import { ControlsContext } from '../App.js';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function LogIn() {
  const { 
    setUserEmail,
    setLoggedIn,
    setUser,
  } = useContext(ControlsContext);

  function onSignIn(user_email) {
    // -> local testing
    // const domain = "http://127.0.0.1";
    // -> server testing
    // const domain = "3.132.124.203";
    // -> prod
    const domain = "https://shadydomain.click";
    
    const logInUrl = new URL(`${domain}:8080/login`);
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
