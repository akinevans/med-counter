import React from "react";
import "./SymptomCard.css";

export default function SymptomCard(props) {
  return (
    <div className='symptom-card-wrapper'>
      <div className='symptom-card-top-wrapper'>
        <p className='symptom-title'>Symptom: {props.title}</p>
        <p className='symptom-intensity'> Intensity: {props.intensity}</p>
      </div>
      <div className='date-time-wrapper'>
        <p>Date: {props.date}</p>
        <p>Time: {props.time}</p>
      </div>
      <div className='notes-wrapper'>
        <p className='notes-text'>{props.notes}</p>
      </div>
    </div>
  );
}
