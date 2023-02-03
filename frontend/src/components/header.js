import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

export default function Header() {
  // const { title } = props;
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
      <Button variant="outlined" size="small">
        Login
      </Button>
    </Toolbar>
  );
}
