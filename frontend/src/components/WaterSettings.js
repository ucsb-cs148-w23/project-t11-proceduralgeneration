import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { ControlsContext } from '../App.js';
import { Switch } from '@mui/material';

export default function WaterSettings(){
    const { setShowWater } = useContext(ControlsContext);
    const theme = useTheme();

    return (
        <div>
            <Switch onChange={(event) => {
                console.log(event.target.checked);
                setShowWater(event.target.checked);
            }}/>
            <Typography
                component="h5"
                variant="a"
                color="inherit"
                align="center"
                noWrap
                sx={{ flex: 1 }}
            >
                Toggle Water
            </Typography>
        </div>
    );
}