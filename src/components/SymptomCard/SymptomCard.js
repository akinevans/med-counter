// Was able to track each symptomCards index across the Redux state array. This takes the old search process via uniqueKey from an O(n) operation down to 0(1) 😎

//TODO Implement restore function to bring back deleted cards

//TODO Implement ability to check off and delete multiple cards at once

//TODO* add inputs for symptom frequency, duration, mood, and list of medication taken
//TODO* add inputs for symptom frequency, duration, mood, and list of medication taken
//TODO& edit symptomCard so it folds in on itself until clicked. Then reveals more data
//TODO& edit symptomCard so it folds in on itself until clicked. Then reveals more data

import React from "react";
import { useState } from "react";
import "./SymptomCard.css";
import AccentColorPicker from "../AccentColorPicker/AccentColorPicker";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  editSymptom,
  deleteDuplicateSymptom,
  deleteSymptomCard,
} from "../../redux/medicalDataReducer";

// utility imports
import {
  handleEditButton,
  handleInputUpdate,
  evaluateDataValues,
  populateNewDataValues,
  checkIntensityValid,
} from "../../utilityFunctions/symptomCardUtilities";

export default function SymptomCard(props) {
  console.clear();

  // state variables
  const [editEnabled, setEditEnabled] = useState(false);
  const [selectedColor, setSelectedColor] = useState();

  // Redux state arrays
  const symptomCardData = useSelector((state) => state.medicalData.symptomList);
  console.log("symptomCardData", symptomCardData);

  const dispatch = useDispatch();

  // Define the initial new data state obj
  const [newData, setNewData] = useState({
    // All data will be set from Redux state.
    // Hard coding initial values will break the logic
  });

  const currentData = {
    index: props.thisCardsIndex,
    date: props.date,
    time: props.time,
    title: props.title,
    intensity: props.intensity,
    note: props.note,
    accentColor: props.accentColor,
  };

  console.log(
    "currentData  -> only shows last item in array, for all data look at symptomCard state arr ",
    currentData
  );
  // console.log("newData ", newData);

  const sendUpdatedData = (newData, currentData) => {
    //& check if any data has been altered, if true send date to redux
    //& do this by populating currentData variable (hardcode is fine) then compare it to newData

    setEditEnabled(false);
    evaluateDataValues(currentData, newData, setNewData);

    // console.log("in sendUpdatedData here is currentData:", currentData);
    // console.log("in sendUpdatedData here is NewData:", newData);

    //payload variables names must match exactly in redux
    dispatch(
      editSymptom({
        index: props.thisCardsIndex,
        // check if user provided new values, if false revert to currentData
        date: populateNewDataValues("date", newData, props.date),
        time: populateNewDataValues("time", newData, props.time),
        title: populateNewDataValues("title", newData, props.title),
        //check that user entered intensity is between 1 -> 10
        intensity: checkIntensityValid(
          newData,
          populateNewDataValues,
          props.intensity
        ),

        note: populateNewDataValues("note", newData, props.note),
        accentColor: populateNewDataValues(
          "accentColor",
          newData,
          props.accentColor
        ),
      })
    );

    // Delete the duplicate symptomCard created by editSymptom in Redux
    dispatch(
      deleteDuplicateSymptom({
        index: props.thisCardsIndex,
      })
    );
  };

  return (
    <div className={`symptom-card-wrapper ${editEnabled ? "edit-mode" : ""}`}>
      <div className='symptom-card-inner-wrapper'>
        <div
          className={`card-accent-color ${
            selectedColor ? selectedColor : props.accentColor
          }`}
        ></div>
        <div className='symptom-card-data-wrapper'>
          {/* //TODO change edit button to an edit icon */}
          <div className='delete-edit-btn-wrapper'>
            <button
              className={`delete-btn ${editEnabled ? "" : "hidden"}`}
              onClick={() => {
                dispatch(
                  deleteSymptomCard({
                    indexToDelete: props.thisCardsIndex,
                  })
                );
                // finally reset edit enabled back to false
                // this keeps the remaining cards from accidentally going into edit mode automatically
                setEditEnabled(false);
              }}
            >
              Delete Card
            </button>
            <button
              //
              className='edit-btn'
              onClick={(e) => {
                handleEditButton(
                  e,
                  newData,
                  currentData,
                  editEnabled,
                  setEditEnabled,
                  sendUpdatedData
                );
              }}
            >
              {editEnabled ? "Save" : "Edit"}
            </button>
          </div>

          <div className='date-time-wrapper'>
            {/* //& DATE  */}
            <input
              type='date'
              className={`date ${editEnabled ? "" : "non-selectable"}`}
              value={populateNewDataValues("date", newData, props.date)}
              onChange={(event) => {
                handleInputUpdate(event, "date-field", newData, setNewData);
              }}
            ></input>

            {/* //& TIME  */}
            <input
              type='time'
              className={`time ${editEnabled ? "" : "non-selectable"}`}
              value={populateNewDataValues("time", newData, props.time)}
              onChange={(event) => {
                handleInputUpdate(event, "time-field", newData, setNewData);
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
                // placeholder={"Symptom"}
                value={populateNewDataValues("title", newData, props.title)}
                onChange={(event) => {
                  handleInputUpdate(
                    event,
                    "symptom-title-field",
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
                // contentEditable={false}
                className={`symptom-intensity ${
                  editEnabled ? "" : "non-selectable"
                }`}
                // placeholder={props.intensity}
                value={populateNewDataValues(
                  "intensity",
                  newData,
                  props.intensity
                )}
                onChange={(event) => {
                  handleInputUpdate(
                    event,
                    "intensity-field",
                    newData,
                    setNewData
                  );
                }}
              ></input>
            </div>
          </div>

          <div className='note-wrapper'>
            {/* //& NOTE  */}
            <textarea
              className={`note-text-area ${
                editEnabled ? "" : "non-selectable"
              }`}
              name='note'
              id='note'
              cols='5'
              rows='4'
              placeholder='Notes...'
              // readOnly={editEnabled ? false : true}
              value={populateNewDataValues("note", newData, props.note)}
              onChange={(event) => {
                handleInputUpdate(event, "note-field", newData, setNewData);
              }}
            ></textarea>
            <div className='footer-text-display'>
              <p className='card-index-display'>
                index: {props.thisCardsIndex}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Accent Color Picker */}
      <div
        className={`color-picker-component-wrapper ${
          editEnabled ? "" : "hidden"
        }`}
      >
        <AccentColorPicker
          utilityClass1='wrapper-vertical-layout'
          utilityClass2='hide-selected-color'
          utilityClass3='color-block-alt-size'
          colorOnClick={(passedColor) => {
            setSelectedColor(passedColor);

            handleInputUpdate(
              null,
              "accent-color",
              newData,
              setNewData,
              passedColor
            );
          }}
        />
      </div>
    </div>
  );
}
