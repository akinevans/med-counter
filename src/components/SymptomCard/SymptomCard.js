//TODO Make modals for editing date, time, title, intensity - not for notes

import React from "react";
import { useState, useEffect, useRef } from "react";
import "./SymptomCard.css";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { editSymptom, deleteDuplicateSymptom } from "../../redux/countReducer";

// utility imports
import {
  handleEditButton,
  handleInputUpdate,
  evaluateDataValues,
} from "../../utilityFunctions/symptomCardUtilities";
//TODO make it so only one card can be in edit mode at a time. Try using state in App.js for this functionality

//TODO: make date, time, symptom, intensity, and notes content editable.
//! NEXT - Continue working on edit functionality. Right now only the title can be edited. May need a handler function for each input

//^ all p tags with data must be changed to input elements
//^ all p tags with data must be changed to input elements
//^ all p tags with data must be changed to input elements

export default function SymptomCard(props) {
  console.clear();

  // state variables
  const [cardIndex, setCardIndex] = useState(0);
  const [editEnabled, setEditEnabled] = useState(false);
  const [currentSymptomCardKey, setCurrentSymptomCardKey] = useState("");

  // get data from Redux
  const symptomCardData = useSelector((state) => state.count.symptomList);
  console.log("symptomCardData", symptomCardData);

  const dispatch = useDispatch();
  const myElementRef = useRef(null);

  const newData = {};
  //^ newData must use the exact same key names
  const currentData = {
    index: cardIndex,
    title: props.title,
    intensity: props.intensity,
    date: props.date,
    time: props.time,
    note: props.note,
    accentColor: props.accentColor,
    uniqueKey: props.uniqueKey,
    stateLength: symptomCardData.length,
  };

  console.log("currentData", currentData);
  console.log("newData ", newData);

  const sendUpdatedData = (newData, currentData) => {
    //TODO refactor data decision making into a module in symptomCardUtilities

    evaluateDataValues(currentData, newData);

    console.log("in sendUpdatedData here is currentData:", currentData);
    console.log("in sendUpdatedData here is NewData:", newData);
    alert("pause for console ");

    // Redux state is immutable so editSymptom creates a new object in state arr
    // check if new data == current data, if false, send data to redux, if true do nothing
    dispatch(
      editSymptom({
        index: newData.index,
        newTitle: newData.title,
        newIntensity: newData.intensity,
        date: newData.date,
        // time: time,
        note: newData.note,
        // // blue by default
        // accentColor: userSelectedAccentColor,
      })
    );

    // Next delete the duplicate entry created by editSymptom redux function
    dispatch(
      deleteDuplicateSymptom({
        index: cardIndex,
      })
    );
  };

  // helper for getting the current text inside of the p element with ref='unique-key-text'
  useEffect(() => {
    // Access the DOM element by using the current property of the ref
    setCurrentSymptomCardKey(myElementRef.current.textContent);
  }, []);

  console.log("CURRENT uniqueKey: ", currentSymptomCardKey);

  return (
    <div className={`symptom-card-wrapper ${editEnabled ? "edit-mode" : ""}`}>
      <div className='symptom-card-inner-wrapper'>
        {/* //TODO Have a delete entry button that appears when editing btn is pressed */}

        <div className={`card-accent-color ${props.accentColor} red`}></div>

        <div className='symptom-card-data-wrapper'>
          {/* //TODO change edit button to an edit icon */}
          <button
            //
            className='edit-btn'
            onClick={(e) => {
              //TODO maybe...
              // set edit mode?
              // decide if edit mode is true? then handleEditBtn, if false...?
              handleEditButton(
                e,
                newData,
                currentData,
                symptomCardData,
                currentSymptomCardKey,
                // state variables
                editEnabled,
                setEditEnabled,
                setCardIndex,
                sendUpdatedData
              );
            }}
          >
            {editEnabled ? "Save" : "Edit"}
          </button>
          <div className='date-time-wrapper'>
            <input
              className='date'
              type='date'
              // value={currentData.date ? currentData.date : props.date}
              value={props.date}
              // value='2024-03-12'
            ></input>

            <input
              className='time'
              type='time'
              placeholder={props.time}
            ></input>
          </div>
          <div className='symptom-and-intensity-wrapper'>
            {/* //! you can make a new content editable effect by triggering user select:none */}
            <div className='symptom-title-wrapper'>
              <h1 className='symptom-header'>Symptom</h1>

              <input
                type='text'
                className={`symptom-title ${
                  editEnabled ? "" : "non-selectable"
                }`}
                placeholder={props.title}
                // contentEditable={editEnabled}
                onChange={(event) => {
                  handleInputUpdate(
                    event,
                    "symptom-title-field",
                    currentData,
                    newData
                  );
                }}
              ></input>
            </div>
            <div className='intensity-title-and-value-wrapper'>
              <h1 className='intensity-header'>Intensity</h1>
              <input
                type='number'
                min='1'
                max='10'
                className={`symptom-intensity ${
                  editEnabled ? "" : "non-selectable"
                }`}
                placeholder={props.intensity}
                onChange={(event) => {
                  handleInputUpdate(
                    event,
                    "intensity-field",
                    currentData,
                    newData
                  );
                }}
              ></input>
            </div>
          </div>
          <div className='note-wrapper'>
            {/* <p className='note-title'>Notes:</p> */}
            <textarea
              className={`note-text-area ${
                editEnabled ? "" : "non-selectable"
              }`}
              name='note'
              id='note'
              cols='5'
              rows='4'
              value={props.note}
              placeholder='Notes...'
              readOnly={editEnabled ? false : true}
            ></textarea>
            <p
              ref={myElementRef}
              // id='unique-key-text'
              className='unique-key-text'
            >
              {props.uniqueKey}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
