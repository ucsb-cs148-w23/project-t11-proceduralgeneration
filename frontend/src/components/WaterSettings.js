import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { ControlsContext } from '../App.js';
import { Switch } from '@mui/material';

export default function WaterSettings(){
    const { setShowWater } = useContext(ControlsContext);

    return (
        <div>
            <Switch onChange={(event) => {
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