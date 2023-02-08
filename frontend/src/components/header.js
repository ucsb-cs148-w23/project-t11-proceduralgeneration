import { useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { ControlsContext } from '../App.js';

export default function Header() {
  // const { title } = props;
  const { prodEndpoint, setProdEndpoint } = useContext(ControlsContext);

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
        >
          3D Environment Procedural Generator
      </Typography>
      {/* <Button variant="outlined" size="small">
        Login
      </Button> */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>localhost</Typography>
        <Switch
          checked={prodEndpoint}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography>prod endpoint</Typography>
      </Stack>
    </Toolbar>
  );
}
