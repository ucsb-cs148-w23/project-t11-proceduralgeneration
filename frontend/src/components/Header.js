import { useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Box from '@mui/material/Box';
import { ControlsContext } from '../Root.js';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import LogIn from './LogIn.js';
import UserDropdown from './UserDropdown.js'

import NavBar from './NavBar';

export default function Header(props) {
  const { colorMode } = useContext(ControlsContext);
  const theme = useTheme();

  return (
    <Toolbar
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <ViewInArIcon />
      <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
          className="title"
        >
          3D Environment Procedural Generator
      </Typography>
      
      {(props.isLoggedIn) ? <UserDropdown userEmail={props.userEmail} /> : <LogIn />}
      <NavBar></NavBar>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        {theme.palette.mode} mode
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Toolbar>
  );
}
