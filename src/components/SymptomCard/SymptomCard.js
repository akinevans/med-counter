//TODO Implement Binary search algorithm O(log n) for finding data in state arrays. Currently linear search O(n) is implemented and is slow depending on length of array.

//TODO Implement restore function to bring back deleted cards

//FIXME: make it so only one card can be in edit mode at a time. Try using state in App.js for this functionality

//TODO: add inputs for symptom frequency, duration, mood, and list of medication taken,

import React from "react";
import { useState, useEffect, useRef } from "react";
import "./SymptomCard.css";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  editSymptom,
  deleteDuplicateSymptom,
  deleteSymptomCard,
} from "../../redux/countReducer";

// utility imports
import {
  handleEditButton,
  handleInputUpdate,
  evaluateDataValues,
  populateNewDataValues,
  getIndexInSymptomsByUniqueKey,
  getMatchingIndexInUniqueKeys,
  checkIntensityValid,
} from "../../utilityFunctions/symptomCardUtilities";

export default function SymptomCard(props) {
  console.clear();

  // state variables
  const [editEnabled, setEditEnabled] = useState(false);
  const [currentSymptomCardKey, setCurrentSymptomCardKey] = useState("");

  // get data from Redux
  const symptomCardData = useSelector((state) => state.count.symptomList);
  const listOfUniqueKeyData = useSelector(
    (state) => state.count.listOfUniqueKeys
  );

  console.log("symptomCardData", symptomCardData);
  console.log("listOfUniqueKeys", listOfUniqueKeyData);

  const dispatch = useDispatch();
  const myElementRef = useRef(null);

  // Define the initial new data state obj
  const [newData, setNewData] = useState({
    uniqueKey: props.uniqueKey,
    // All data will be set from Redux state. No need to hard code initial values.
    // Hard coding initial values will break the logic
  });

  const currentData = {
    uniqueKey: props.uniqueKey,
    // index: cardIndex,
    date: props.date,
    time: props.time,
    title: props.title,
    intensity: props.intensity,
    note: props.note,
    accentColor: props.accentColor,
    // stateLength: symptomCardData.length,
  };

  // console.log("uniqueKeyIndex", uniqueKeyIndex);

  console.log(
    "currentData  -> only shows last item in array, for all data look at symptomCard state arr ",
    currentData
  );
  // console.log("newData ", newData);

  const sendUpdatedData = (newData, currentData) => {
    //& check if any data has been altered, if true send date to redux
    //& do this by populating currentData variable (hardcode is fine) then compare it to newData

    const uniqueKeyIndex = getMatchingIndexInUniqueKeys(
      currentData.uniqueKey,
      listOfUniqueKeyData
    );
    console.log(currentData.uniqueKey);
    console.log("index of uKey", uniqueKeyIndex);

    setEditEnabled(false);

    //& check if any data has been altered, if true send date to redux
    //& do this by populating currentData variable (hardcode is fine) then compare it to newData

    evaluateDataValues(currentData, newData, setNewData);

    // console.log("in sendUpdatedData here is currentData:", currentData);
    // console.log("in sendUpdatedData here is NewData:", newData);

    //payload variables names must match exactly in redux
    dispatch(
      editSymptom({
        index: getIndexInSymptomsByUniqueKey(
          currentSymptomCardKey,
          symptomCardData
        ),
        // check if user provided new values, if false revert to currentData
        date: populateNewDataValues("date", newData, null, props.date),
        time: populateNewDataValues("time", newData, null, props.time),
        title: populateNewDataValues("title", newData, null, props.title),
        //check that user entered intensity is between 1 -> 10
        intensity: checkIntensityValid(
          newData,
          currentData,
          populateNewDataValues,
          props.intensity
        ),

        note: populateNewDataValues("note", newData, null, props.note),
        //! change accentColor to newData.accentColor once ability to change from edit mode is color in implemented
        accentColor: currentData.accentColor,
      })
    );

    // Delete the duplicate symptomCard created by editSymptom in Redux
    dispatch(
      deleteDuplicateSymptom({
        index: getIndexInSymptomsByUniqueKey(
          currentSymptomCardKey,
          symptomCardData
        ),
        uniqueKey: currentData.uniqueKey,
        uniqueKeyIndex: uniqueKeyIndex,
      })
    );
  };

  // get the uniqueKey of the component on render
  useEffect(() => {
    setCurrentSymptomCardKey(myElementRef.current.textContent);
  }, []);

  // console.log("CURRENT uniqueKey: ", currentSymptomCardKey);

  return (
    <div className={`symptom-card-wrapper ${editEnabled ? "edit-mode" : ""}`}>
      <div className='symptom-card-inner-wrapper'>
        <div className={`card-accent-color ${props.accentColor} red`}></div>
        <div className='symptom-card-data-wrapper'>
          {/* //TODO change edit button to an edit icon */}
          <div className='delete-edit-btn-wrapper'>
            <button
              className={`delete-btn ${editEnabled ? "" : "hidden"}`}
              onClick={(uniqueKeyIndex) => {
                //get index of current card by matching its unique key
                const indexViaUniqueKey = getIndexInSymptomsByUniqueKey(
                  currentSymptomCardKey,
                  symptomCardData
                );

                dispatch(
                  deleteSymptomCard({
                    indexToDelete: indexViaUniqueKey,
                    uniqueKeyToDelete: currentData.uniqueKey,
                    indexOfUniqueKey: uniqueKeyIndex,
                  })
                );
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
                  setNewData,
                  currentData,
                  symptomCardData,
                  currentSymptomCardKey,
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
              value={populateNewDataValues("date", newData, null, props.date)}
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
              type='time'
              className={`time ${editEnabled ? "" : "non-selectable"}`}
              // placeholder={props.time}
              value={populateNewDataValues("time", newData, null, props.time)}
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
                // placeholder={"Symptom"}
                value={populateNewDataValues(
                  "title",
                  newData,
                  null,
                  props.title
                )}
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
                // contentEditable={false}
                className={`symptom-intensity ${
                  editEnabled ? "" : "non-selectable"
                }`}
                // placeholder={props.intensity}
                value={populateNewDataValues(
                  "intensity",
                  newData,
                  currentData,
                  props.intensity
                )}
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
              placeholder='Notes...'
              // readOnly={editEnabled ? false : true}
              value={populateNewDataValues("note", newData, null, props.note)}
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
