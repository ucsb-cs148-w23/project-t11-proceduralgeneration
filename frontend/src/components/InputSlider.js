import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Input = styled(MuiInput)`
  width: 42px;
`;

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 24;

export default function InputSlider(props) {
  const handleSliderChange = (event, newValue) => {
    props.setValue(newValue);
  };

  const handleInputChange = (event) => {
    props.setValue(event.target.value === '' ? '' : Number(event.target.value));
  };
  
  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        {props.label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof props.value === 'number' ? props.value : 0}
            min={props.min || DEFAULT_MIN}
            max={props.max || DEFAULT_MAX}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={props.value}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 1,
              min: props.min || DEFAULT_MIN,
              max: props.max || DEFAULT_MAX,
              type: 'text',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
