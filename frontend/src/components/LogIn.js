import Box from '@mui/material/Box';
import { useContext } from 'react';
import { ControlsContext } from '../App.js';

export default function LogIn() {
  const { loginBoxRef } = useContext(ControlsContext);
  return (
    <Box ref={loginBoxRef} ></Box>
  )
}
