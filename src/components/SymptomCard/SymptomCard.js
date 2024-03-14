//TODO Implement Binary search algorithm O(log n) for finding data in state arrays. Currently linear search O(n) is implemented and is slow depending on length of array.

//TODO Implement restore function to bring back deleted cards

//TODO Implement ability to check off and delete multiple cards at once

//TODO add inputs for symptom frequency, duration, mood, and list of medication taken,

//& TODO: replace all uniqueKey logic with the cards index

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

  // Redux state arrays
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
    date: props.date,
    time: props.time,
    title: props.title,
    intensity: props.intensity,
    note: props.note,
    accentColor: props.accentColor,
    // stateLength: symptomCardData.length,
  };

  console.log(
    "currentData  -> only shows last item in array, for all data look at symptomCard state arr ",
    currentData
  );
  // console.log("newData ", newData);

  let uniqueKeyIndex = getMatchingIndexInUniqueKeys(
    currentData.uniqueKey,
    listOfUniqueKeyData
  );

  const sendUpdatedData = (newData, currentData) => {
    //& check if any data has been altered, if true send date to redux
    //& do this by populating currentData variable (hardcode is fine) then compare it to newData

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
          currentData.uniqueKey,
          symptomCardData
        ),
        // check if user provided new values, if false revert to currentData
        date: populateNewDataValues("date", newData, props.date),
        time: populateNewDataValues("time", newData, props.time),
        title: populateNewDataValues("title", newData, props.title),
        //check that user entered intensity is between 1 -> 10
        intensity: checkIntensityValid(
          newData,
          currentData,
          populateNewDataValues,
          props.intensity
        ),

        note: populateNewDataValues("note", newData, props.note),
        //! change accentColor to newData.accentColor once ability to change from edit mode is color in implemented
        accentColor: currentData.accentColor,
      })
    );

    // Delete the duplicate symptomCard created by editSymptom in Redux
    dispatch(
      deleteDuplicateSymptom({
        index: getIndexInSymptomsByUniqueKey(
          currentData.uniqueKey,
          symptomCardData
        ),
        uniqueKeyToDelete: currentData.uniqueKey,
        uniqueKeyIndex: uniqueKeyIndex,
      })
    );
  };

  // get the uniqueKey of the component on render
  useEffect(() => {
    // setCurrentSymptomCardKey(myElementRef.current.textContent);
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
              onClick={() => {
                //get index of current card by matching its unique key
                // console.log(currentData.uniqueKey, uniqueKeyIndex);

                dispatch(
                  deleteSymptomCard({
                    // indexToDelete: indexViaUniqueKey,
                    indexToDelete: getIndexInSymptomsByUniqueKey(
                      currentData.uniqueKey,
                      symptomCardData
                    ),
                    uniqueKeyToDelete: currentData.uniqueKey,
                    indexOfUniqueKey: getMatchingIndexInUniqueKeys(
                      currentData.uniqueKey,
                      listOfUniqueKeyData
                    ),
                  })
                );
                // finally reset edit enabled back to false
                // this keeps the remaining undeleted cards from accidentally going into edit mode automatically
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
                  setNewData,
                  currentData,
                  symptomCardData,
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
              // placeholder={props.time}
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
              value={populateNewDataValues("note", newData, props.note)}
              onChange={(event) => {
                handleInputUpdate(event, "note-field", newData, setNewData);
              }}
            ></textarea>
            <div className='footer-text-display'>
              <p ref={myElementRef} className='unique-key-text'>
                {props.uniqueKey}
              </p>
              <p className='card-index-display'>
                Index: {props.thisCardsIndex}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
