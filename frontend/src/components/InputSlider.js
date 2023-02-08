import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Input = styled(MuiInput)`
  width: 42px;
`;


export default function InputSlider(props) {
  const handleSliderChange = (event, newValue) => {
    props.setValue(newValue);
  };

  const handleInputChange = (event) => {
    props.setValue(event.target.value === '' ? '' : Number(event.target.value));
  };
  
  const handleBlur = () => {
    if (props.value < 0) {
      props.setValue(0);
    } else if (props.value > 100) {
      props.setValue(100);
    }
  }

  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        {props.label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof props.value === 'number' ? props.value : 0}
            min={props.min || 0}
            max={props.max || 100}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={props.value}
            size="small"
            onChange={handleInputChange}
            handleBlur={handleBlur}
            inputProps={{
              step: 1,
              min: props.min || 0,
              max: props.max || 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
