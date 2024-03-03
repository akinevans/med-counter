import React from "react";
import "./SymptomCard.css";

//TODO: make date, time, symptom, intensity, and notes contenteditable.
//TODO when content is changed onChange send new data to redux via an update function

export default function SymptomCard(props) {
  return (
    <div className='symptom-card-wrapper'>
      <div className='symptom-card-inner-wrapper'>
        {/* Have a delete entry button that appears when editing btn is pressed */}

        <div className={`card-accent-color ${props.accentColor}`}></div>
        {/* //& add a btn to edit the card data */}
        {/* <button>Edit</button> */}
        <div className='symptom-card-data-wrapper'>
          <div className='date-time-wrapper'>
            <p className='date'>Date: {props.date}</p>
            <p className='time'>Time: {props.time}</p>
          </div>
          <div className='symptom-intensity-wrapper'>
            <p className='symptom-title'>Symptom: {props.title}</p>

            <p className='symptom-intensity' contentEditable='true'>
              Intensity: {props.intensity}
            </p>
          </div>
          <div className='note-wrapper'>
            <p className='note-title'>Notes:</p>
            <textarea
              className='note-text-area'
              name='note'
              id='note'
              cols='5'
              rows='4'
              // value={props.note}
              contentEditable='true'
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
