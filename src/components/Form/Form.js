import React from "react";
import { useState } from "react";
import "./Form.css";

// Redux imports
import { useDispatch } from "react-redux";
import { addSymptomCard } from "../../redux/countReducer";

//utility imports
import {
  displayAccentColors,
  generateUniqueKey,
  getDateAndTime,
  clearFormInputValues,
  toggleColorClassNames,
} from "../../utilityFunctions/FormUtilities";

export default function Form(props) {
  const [symptom, setSymptom] = useState("");
  const [intensity, setIntensity] = useState("");
  const [date, setDate] = useState(getDateAndTime()[0]);
  // To get time with seconds call (getDateAndTime()[2])
  const [time, setTime] = useState(getDateAndTime()[1]);
  const [note, setNote] = useState("");
  const [isColorSelected, setIsColorSelected] = useState(false);
  const [userSelectedAccentColor, setUserSelectedAccentColor] =
    useState("blue");

  const dispatch = useDispatch();
  const listOfAccentColors = displayAccentColors();

  //TODO: check if generated unique key exists in state.listOfUniqueKeys, if false continue code, else generate a new one

  let uniqueKey = generateUniqueKey();

  const handleFormSubmission = (e) => {
    // Do not submit the form
    e.preventDefault();

    // create new symptomCard component
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

  //TODO: add inputs for symptom frequency, duration, mood, and list of medication taken,

  return (
    <form className={`form ${props.className}`}>
      <div className='form-date-time-wrapper'>
        <label>
          <input
            // Does not accept placeholder attribute
            className='date-picker'
            type='date'
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              // console.log(date);
            }}
          />
        </label>
        <label>
          <input
            className='time-picker'
            type='time'
            value={time}
            contentEditable='true'
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </label>
      </div>
      <div className='form-symptom-and-intensity-wrapper'>
        <label>
          <input
            //
            className='symptom-input'
            type='text'
            placeholder='Symptom'
            value={symptom}
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
            value={intensity}
            placeholder='Intensity'
            min={1}
            max={10}
            onChange={(e) => {
              setIntensity(e.target.value);
              // console.log(intensity);
            }}
          />
        </label>
      </div>

      <div className='form-bottom-wrapper'>
        <label>
          <textarea
            name='notes'
            id='notes'
            cols='38'
            rows='5'
            value={note}
            placeholder='Notes'
            onChange={(e) => {
              setNote(e.target.value);
            }}
          ></textarea>

          {/* //& COLOR PICKER */}
          {/*the 'color' className in Form.css is separate from the accent color classNames in SymptomCard.css */}
          <div className='color-picker-wrapper'>
            <div
              className={`selected-color-view ${userSelectedAccentColor}`}
            ></div>
            {listOfAccentColors.map((color, index) => (
              <div
                key={index}
                className={`color-block ${color} ${toggleColorClassNames(
                  isColorSelected,
                  userSelectedAccentColor,
                  color
                )}`}
                onClick={() => {
                  console.log(color);
                  //on click outside of color box turn it to false ?
                  setIsColorSelected(true);
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
        onClick={(e) => {
          // create new SymptomCard
          handleFormSubmission(e, symptom, intensity, date, time, note);

          // clear all form inputs
          clearFormInputValues(setSymptom, setIntensity, setNote);

          //close form modal
          props.closeBtnOnClick();

          //reset date and time inputs
          setDate(getDateAndTime()[0]);
          setTime(getDateAndTime()[1]);
        }}
      />
      <button
        //
        className='close-btn'
        onClick={(e) => {
          e.preventDefault();

          // close form modal
          props.closeBtnOnClick();

          // remove these lines to keep data in the form on close, may be useful to the end user
          // reset form modal data
          clearFormInputValues(setSymptom, setIntensity, setNote);
          setDate(getDateAndTime()[0]);
          setTime(getDateAndTime()[1]);
        }}
      >
        Close
      </button>
    </form>
  );
}
