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

export default function SymptomCard(props) {
  // console.clear();

  // state variables
  const [cardIndex, setCardIndex] = useState(0);
  const [editEnabled, setEditEnabled] = useState(false);
  const [currentSymptomCardKey, setCurrentSymptomCardKey] = useState("");

  // get data from Redux
  const symptomCardData = useSelector((state) => state.count.symptomList);
  console.log("symptomCardData", symptomCardData);

  const dispatch = useDispatch();
  const myElementRef = useRef(null);

  // Define the initial state obj
  //* replace newData with this object
  const [newData, setNewData] = useState({
    uniqueKey: props.uniqueKey,
    // All data will be set from Redux state. No need to hard code initial values.
    // Hard coding initial values will break the logic
  });

  const currentData = {
    uniqueKey: props.uniqueKey,
    index: cardIndex,
    title: props.title,
    intensity: props.intensity,
    date: props.date,
    time: props.time,
    note: props.note,
    accentColor: props.accentColor,
    stateLength: symptomCardData.length,
  };

  console.log("currentData", currentData);
  console.log("newData ", newData);

  const sendUpdatedData = (newData, currentData) => {
    //TODO refactor data decision making into a module in symptomCardUtilities

    setEditEnabled(false);

    //& check if any data has been altered, if true send date to redux
    //& do this by populating currentData variable (hardcode is fine) then compare it to newData

    evaluateDataValues(currentData, newData);

    console.log("in sendUpdatedData here is currentData:", currentData);
    console.log("in sendUpdatedData here is NewData:", newData);
    alert("pause for console ");

    //payload variables names must match exactly in redux
    dispatch(
      editSymptom({
        index: newData.index,
        date: newData.date,
        time: newData.time,
        title: newData.title,
        intensity: newData.intensity,
        note: newData.note,
        //! change accentColor to newData.accentColor once ability to change from edit mode is color in implemented
        accentColor: currentData.accentColor,
      })
    );

    // Delete the duplicate symptomCard created by editSymptom in Redux
    dispatch(
      deleteDuplicateSymptom({
        index: cardIndex,
      })
    );
  };

  // get the uniqueKey
  useEffect(() => {
    setCurrentSymptomCardKey(myElementRef.current.textContent);
  }, []);
  // console.log("CURRENT uniqueKey: ", currentSymptomCardKey);

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
              handleEditButton(
                e,
                newData,
                currentData,
                symptomCardData,
                currentSymptomCardKey,
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
            {/* //& DATE  */}
            <input
              className={`date ${editEnabled ? "" : "non-selectable"}`}
              type='date'
              value={newData.date ? newData.date : props.date}
              onChange={(event) => {
                handleInputUpdate(
                  event,
                  "date-field",
                  currentData,
                  newData,
                  setNewData
                );
              }}
            ></input>

            {/* //& TIME  */}
            <input
              className={`time ${editEnabled ? "" : "non-selectable"}`}
              type='time'
              placeholder={props.time}
              value={newData.time ? newData.time : props.time}
              onChange={(event) => {
                handleInputUpdate(
                  event,
                  "time-field",
                  currentData,
                  newData,
                  setNewData
                );
              }}
            ></input>
          </div>
          <div className='symptom-and-intensity-wrapper'>
            <div className='symptom-title-wrapper'>
              <h1 className='symptom-header'>Symptom</h1>

              {/* //& TITLE  */}
              <input
                type='text'
                className={`symptom-title ${
                  editEnabled ? "" : "non-selectable"
                }`}
                placeholder={props.title}
                onChange={(event) => {
                  handleInputUpdate(
                    event,
                    "symptom-title-field",
                    currentData,
                    newData,
                    setNewData
                  );
                }}
              ></input>
            </div>
            <div className='intensity-title-and-value-wrapper'>
              <h1 className='intensity-header'>Intensity</h1>

              {/* //& INTENSITY  */}
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
                    newData,
                    setNewData
                  );
                }}
              ></input>
            </div>
          </div>
          <div className='note-wrapper'>
            {/* //& NOTE  */}
            {/* //! KNOWN BUG - cant fully delete existing note when in edit mode*/}
            <textarea
              className={`note-text-area ${
                editEnabled ? "" : "non-selectable"
              }`}
              name='note'
              id='note'
              cols='5'
              rows='4'
              value={newData.note ? newData.note : props.note}
              placeholder='Notes...'
              readOnly={editEnabled ? false : true}
              onChange={(event) => {
                handleInputUpdate(
                  event,
                  "note-field",
                  currentData,
                  newData,
                  setNewData
                );
              }}
            ></textarea>
            <p ref={myElementRef} className='unique-key-text'>
              {props.uniqueKey}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
