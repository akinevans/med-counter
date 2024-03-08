import React from "react";
import { useState } from "react";
import "./Form.css";
import { useDispatch } from "react-redux";
import { addSymptomCard } from "../../redux/countReducer";

//utility imports
import {
  displayAccentColors,
  generateUniqueKey,
} from "../../utilityFunctions/FormUtilities";

export default function Form(props) {
  const [symptom, setSymptom] = useState("");
  const [intensity, setIntensity] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [note, setNote] = useState("");
  const [colorSelected, setColorSelected] = useState(false);
  const [userSelectedAccentColor, setUserSelectedAccentColor] =
    useState("blue");

  const minIntensity = 1;
  const maxIntensity = 5;
  const todaysDate = new Date();
  // console.log(todaysDate);
  const dispatch = useDispatch();
  const listOfAccentColors = displayAccentColors();
  let uniqueKey = generateUniqueKey();

  const handleFormSubmission = (e) => {
    // Do not submit the form
    e.preventDefault();
    // alert("Send data to Redux, Pull data into new Symptom card component");

    dispatch(
      addSymptomCard({
        uniqueKey: uniqueKey,
        title: symptom,
        intensity: intensity,
        date: date,
        time: time,
        note: note,
        accentColor: userSelectedAccentColor,
      })
    );
  };

  return (
    <form className={`form ${props.className}`}>
      <div className='form-top-wrapper'>
        <label>
          <input
            //
            className='symptom-input'
            type='text'
            placeholder='Symptom'
            onChange={(e) => {
              setSymptom(e.target.value);
              // console.log(symptom);
            }}
          />
        </label>
        <label>
          <input
            className='intensity-picker'
            type='number'
            placeholder='Intensity'
            min={minIntensity}
            max={maxIntensity}
            onChange={(e) => {
              setIntensity(e.target.value);
              // console.log(intensity);
            }}
          />
        </label>
      </div>
      <div className='form-date-time-wrapper'>
        <label>
          <input
            //
            className='date-picker'
            type='date'
            // placeholder={todaysDate}
            onChange={(e) => {
              const newDate = e.target.value;
              // console.log(newDate);
              setDate(newDate);
              //! undefined error
              // console.log(date);
            }}
          />
        </label>
        <label>
          <input
            className='time-picker'
            type='time'
            onChange={(e) => {
              // console.log(e.target.value);
              setTime(e.target.value);
              // console.log(time);
            }}
          />
        </label>
      </div>
      <div className='form-bottom-wrapper'>
        <label>
          {/* <input className='text-area' type='text' placeholder='Notes' /> */}
          <textarea
            name='notes'
            id='notes'
            cols='38'
            rows='5'
            placeholder='Notes'
            onChange={(e) => {
              // console.log(e.target.value);
              setNote(e.target.value);
              // console.log(note);
            }}
          ></textarea>
          {/* //& COLOR PICKER */}
          {/* //! the 'color' className in Form.css is separate from the accent color classNames in SymptomCard.css */}
          <div className='color-picker-wrapper'>
            <div
              className={`selected-color-view ${userSelectedAccentColor}`}
            ></div>
            {listOfAccentColors.map((color) => (
              <div
                className={`color-block ${color} ${
                  colorSelected ? "selected" : ""
                }`}
                onClick={() => {
                  // console.log(color);
                  //on click outside turn it to false ?
                  setColorSelected(!colorSelected);
                  setUserSelectedAccentColor(color);
                }}
              ></div>
            ))}
          </div>
        </label>
      </div>
      <input
        className='submit-btn'
        type='text'
        value='Create new entry'
        //TODO: update onchange logic
        // onChange={null}
        onClick={(e) => {
          // Create new SymptomCard
          handleFormSubmission(e, symptom, intensity, date, time, note);
          //close modal
          props.closeBtnOnClick();
        }}
      />
      <button
        //
        className='close-btn'
        onClick={props.closeBtnOnClick}
      >
        Close
      </button>
    </form>
  );
}
