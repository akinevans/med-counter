import React from "react";
import { useState } from "react";
import "./Form.css";

//utility imports
import { handleFormSubmission } from "../../utilityFunctions/utilityFunctions";

export default function Form(props) {
  const [symptom, setSymptom] = useState("");
  const [intensity, setIntensity] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [note, setNote] = useState("");

  const minIntensity = 1;
  const maxIntensity = 5;
  const todaysDate = new Date();
  // console.log(todaysDate);

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
              console.log(symptom);
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
              console.log(intensity);
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
              console.log(newDate);
              setDate(newDate);
              //! undefined error
              console.log(date);
            }}
          />
        </label>
        <label>
          <input
            className='time-picker'
            type='time'
            onChange={(e) => {
              console.log(e.target.value);
              setTime(e.target.value);
              console.log(time);
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
            cols='30'
            maxLength='350'
            rows='5'
            placeholder='Notes'
            onChange={(e) => {
              console.log(e.target.value);
              setNote(e.target.value);
              console.log(note);
            }}
          ></textarea>
        </label>
      </div>
      <input
        className='submit-btn'
        type='text'
        value='Create new entry'
        //TODO: update onchange logic
        onChange={null}
        onClick={(e) => {
          // Create new SymptomCard
          handleFormSubmission(e);
        }}
      />
    </form>
  );
}
