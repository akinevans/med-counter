import React from "react";
import "./Form.css";

//utility imports
import { handleFormSubmission } from "../../utilityFunctions/utilityFunctions";

export default function Form(props) {
  const minIntensity = 1;
  const maxIntensity = 5;

  return (
    <form className={`form ${props.className}`}>
      <div className='form-top-wrapper'>
        <label>
          <input
            //
            className='symptom-input'
            type='text'
            placeholder='Symptom'
          />
        </label>
        <label>
          <input
            className='intensity-picker'
            type='number'
            placeholder='Intensity'
            min={minIntensity}
            max={maxIntensity}
          />
        </label>
      </div>
      <div className='form-date-time-wrapper'>
        <label>
          <input
            //
            className='date-picker'
            type='date'
            placeholder='Date'
          />
        </label>
        <label>
          <input className='time-picker' type='time' />
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
