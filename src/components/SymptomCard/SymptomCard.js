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

  //TODO hardcode all current data with info from redux symptomCard state, may have to get index
  //TODO hardcode all current data with info from redux symptomCard state, may have to get index
  //TODO hardcode all current data with info from redux symptomCard state, may have to get index
  const currentData = {
    uniqueKey: props.uniqueKey,
    index: cardIndex,
    stateLength: symptomCardData.length,
    // title: props.title ? props.title : symptomCardData.title,
    title: props.title,
    intensity: props.intensity,
    date: props.date,
    time: props.time,
    note: props.note,
    accentColor: props.accentColor,
  };

  console.log("currentData", currentData);

  const newData = {
    // title: "",
  };

  console.log("newData ", newData);

  // console.log("cardIndex state var ", cardIndex);

  const sendUpdatedData = (newData, currentData) => {
    //TODO refactor data decision making into a module in symptomCardUtilities

    //!BUG when clicking edit then immediately save, data gets erased in SymptomCard
    //^ FIX - By comparing if currentData !== newData you can decide if dispatch/editSymptom should be called or not
    // Edge case - if new title is empty, set it to current title to prevent it from being overwritten as an empty string
    if (newData.title === "" || !newData.title) {
      newData.title = currentData.title;
    }

    if (newData.title !== currentData.title) {
      alert("title is the same");
      //set new title = current title so it doesn't get erased in redux
      // newData.title = currentData.title;
    } else if (newData.title === currentData.title) {
      newData.title = currentData.title;
    }
    // else if (event.target.value === "" || event.target.value === false) {
    //   newData.title = currentData.title;
    // }

    console.log("in sendUpdatedData here is currentData:", currentData);
    console.log("in sendUpdatedData here is NewData:", newData);
    alert("pause for console ");

    const titleEmpty = newData.title === "" || newData.title === false;
    // Redux state is immutable so editSymptom creates a new object in state arr
    // first check if currentData === newData, if true, send data to redux
    dispatch(
      editSymptom({
        index: newData.index,
        // newTitle: titleEmpty ? currentData.title : newData.title,
        //! newData title is undefined here, work backwards
        newTitle: newData.title,
        newIntensity: newData.intensity,
        // date: date,
        // time: time,
        // note: note,
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
            <p className='date'>Date: {props.date}</p>
            <p className='time'>Time: {props.time}</p>
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
              className='note-text-area'
              name='note'
              id='note'
              cols='5'
              rows='4'
              value={props.note}
              placeholder='Notes...'
              contentEditable='true'
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
