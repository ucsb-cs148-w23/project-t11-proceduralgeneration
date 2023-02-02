import ReactSlider from "react-slider";
import React, {useState} from "react"

function Slider(){
  const [state, setState] = useState({
    value:50
  });
  function handleChange(evt){
    setState({ value: evt.value});
  }
  return (
    <div>
    <ReactSlider
      className="scale-slider"
      thumbClassName="scale-thumb"
      trackClassName="scale-track"
      min={10}
      max={100}
      defaultValue={50}
      step={1}
      onChange={handleChange}
      


    />
    </div>
    
  );
};
export default Slider;