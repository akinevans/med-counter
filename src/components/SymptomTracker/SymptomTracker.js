import React from "react";
import { useState } from "react";
import "../SymptomTracker/SymptomTracker.css";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { updateIntensity, addSymptom } from "../../redux/countReducer";

export default function SymptomTracker(props) {
  const stateList = useSelector((state) => state.intensityData);
  console.log("list: " + stateList);

  const [intensity, setIntensity] = useState(1);
  const [symptoms, setSymptoms] = useState("Write here...");
  const dispatch = useDispatch();

  const handleIntensityChange = (e) => {
    let updatedIntensity = e.target.innerText;
    alert(updatedIntensity);
    // console.log(intensity);

    dispatch(
      updateIntensity({
        data: updatedIntensity,
      })
    );
  };
  console.log(intensity);

  return (
    <div className='tracker-wrapper'>
      <div className='intensity-wrapper'>
        <p className='intensity-title'>Intensity: </p>
        <p
          //
          className='intensity'
          contentEditable='true'
          onInput={(e) => {
            // console.log(e);
            // setIntensity(e.target.innerText);
            handleIntensityChange(e);
          }}
        >
          {props.intensity}
        </p>
      </div>

      <p
        //
        className='symptom'
        contentEditable='true'
        onChange={props.symptomOnChange}
      >
        {props.symptoms}
      </p>
    </div>
  );
}
