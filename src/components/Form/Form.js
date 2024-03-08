import React from "react";
import { useState, useEffect } from "react";
import "./Form.css";
import { useDispatch } from "react-redux";
import { addSymptomCard } from "../../redux/countReducer";

//TODO: from should reset all its inputs each

//utility imports
import {
  displayAccentColors,
  generateUniqueKey,
  getDateAndTime,
  clearFormInputValues,
} from "../../utilityFunctions/FormUtilities";
import { clear } from "@testing-library/user-event/dist/clear";

export default function Form(props) {
  const [symptom, setSymptom] = useState("");
  const [intensity, setIntensity] = useState("");
  const [date, setDate] = useState(getDateAndTime()[0]);
  const [time, setTime] = useState(getDateAndTime()[1]);
  const [note, setNote] = useState("");
  const [colorSelected, setColorSelected] = useState(false);
  const [userSelectedAccentColor, setUserSelectedAccentColor] =
    useState("blue");

  // get local time zones, then set the local time wherever user is at

  const dispatch = useDispatch();
  const listOfAccentColors = displayAccentColors();

  //TODO: check if generated unique key exists in state.listOfUniqueKeys, if false continue code, else generate a new one
  let uniqueKey = generateUniqueKey();

  const handleFormSubmission = (e) => {
    // Do not submit the form
    e.preventDefault();
    //* Create new symptomCard by sending data to redux
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
      <div className='form-date-time-wrapper'>
        <label>
          <input
            // Does not accept placeholder attribute
            className='date-picker'
            type='date'
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              //! undefined error
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
              // console.log(e.target.value);
              setTime(e.target.value);
              console.log(time);
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
          {/* <input className='text-area' type='text' placeholder='Notes' /> */}
          <textarea
            name='notes'
            id='notes'
            cols='38'
            rows='5'
            value={note}
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

          // reset form modal data
          clearFormInputValues(
            setSymptom,
            setIntensity,
            setDate,
            setTime,
            setNote,
            setColorSelected,
            setUserSelectedAccentColor
          );

          //close form modal
          props.closeBtnOnClick();
        }}
      />
      <button
        //
        className='close-btn'
        onClick={() => {
          // reset form modal data
          clearFormInputValues(
            setSymptom,
            setIntensity,
            setDate,
            setTime,
            setNote,
            setColorSelected,
            setUserSelectedAccentColor
          );

          // close form modal
          props.closeBtnOnClick();
        }}
      >
        Close
      </button>
    </form>
  );
}
