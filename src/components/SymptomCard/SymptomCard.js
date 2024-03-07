import React from "react";
import { useState, useEffect, useRef } from "react";
import "./SymptomCard.css";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { editSymptom, deleteDuplicateSymptom } from "../../redux/countReducer";
//TODO make it so only one card can be in edit mode at a time. Try using state in App.js for this functionality

//TODO: make date, time, symptom, intensity, and notes content editable.
//! NEXT - Continue working on edit functionality. Right now only the title can be edited. May need a handler function for each input

//^ all p tags with data must be changed to input elements
//^ all p tags with data must be changed to input elements
//^ all p tags with data must be changed to input elements

export default function SymptomCard(props) {
  console.clear();

  const [currentSymptomCardKey, setCurrentSymptomCardKey] = useState("");
  const [cardIndex, setCardIndex] = useState(0);

  // get data from Redux
  const symptomCardData = useSelector((state) => state.count.symptomList);
  console.log("symptomCardData", symptomCardData);

  const dispatch = useDispatch();
  const [editEnabled, setEditEnabled] = useState(false);
  const myElementRef = useRef(null);

  const currentData = {
    index: cardIndex,
    stateLength: symptomCardData.length,
    // title: symptomCardData[getCurrentIndex()[0]].title,
  };

  console.log("currentData", currentData);

  const newData = {};
  newData.title = "";

  console.log("newData ", newData);

  function getCurrentIndex() {
    // console.log("currentStateLength ", currentStateLength);
    console.log("currentStateLength ", currentData.stateLength);

    //edge case
    if (symptomCardData.length === 0) {
      setCardIndex(0);
      newData.index = 0;
      currentData.index = 0;
      return 0;
    }

    // find the correct data in symptomCard state array by matching the unique id property
    for (let i = 0; i < symptomCardData.length; i++) {
      if (symptomCardData[i].uniqueKey === currentSymptomCardKey) {
        console.log("i: ", i);
        console.log("data FOUND in: ", symptomCardData[i]);
        console.log("some found data:: ", symptomCardData[i].title);
        console.log("some found data:: ", symptomCardData[i].accentColor);
        newData.index = symptomCardData[i].cardIndex;

        console.log("newData index: ", newData.index);

        currentData.index = i;
        break;
      } else if (i !== symptomCardData.length) {
        continue;
      }
      return i;
    }
    return 0;
    // throw new Error("akin - getCurrentIndex failed for some reason");
  }

  console.log("cardIndex state var ", cardIndex);

  const handleSymptomUpdate = (event) => {
    //& create a new util function for each input
    //& create a new util function for each input
    //& create a new util function for each input

    console.log(event.target.value);

    // set the updated values for newData
    newData.title = event.target.value;
    console.log("newData from handleSymptomUpdate", newData);
  };

  // function for sending updated symptom card data to redux
  const handleEdit = (e) => {
    //! IMPORTANT - you will have to accept data from ALL inputs and send it all to redux

    //edge case
    if (e === null || e === undefined) {
      return false;
    }

    setEditEnabled(false);

    //& check if any data has been altered, if true send date to redux

    //& do this by populating currentData variable (hardcode is fine) then compare it to newData

    console.log("newData right before send to Redux: ", newData);
    alert("Pause to see console data");
    //finally send newData to redux
    sendUpdatedData(newData);
  };

  const sendUpdatedData = (newData) => {
    //!BUG when clicking edit then immediately save, data gets erased in SymptomCard
    //^ FIX - By comparing if currentData !== newData you can decide if dispatch/editSymptom should be called or not

    // Redux state is immutable so editSymptom creates a new object in state arr
    dispatch(
      editSymptom({
        index: newData.index,
        newTitle: newData.title,
        newIntensity: "X",
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
              //edge case
              if (e.target.value === "" && e.target.textContent === "Edit") {
                // trigger content editable attributes
                setEditEnabled(!editEnabled);
                // check what state editEnabled is in
                // if true get all new input data
              }
              if (e.target.textContent === "Save") {
                //^ update all inputs state
                //! be careful, e = the button event, not the data you're dealing with

                //check if editEnabled is turned back off then send all data to redux
                let INDEX = getCurrentIndex();
                handleEdit(e, INDEX);
              }
            }}
          >
            {editEnabled ? "Save" : "Edit"}
          </button>
          <div className='date-time-wrapper'>
            <p className='date'>Date: {props.date}</p>
            <p className='time'>Time: {props.time}</p>
          </div>
          <div className='symptom-intensity-wrapper'>
            {/* //! you can make a new content editable effect by triggering user select:none */}
            <input
              className={`symptom-title ${editEnabled ? "" : "non-selectable"}`}
              placeholder={props.title}
              // contentEditable={editEnabled}
              onChange={handleSymptomUpdate}
            ></input>

            <p className='symptom-intensity' contentEditable='true'>
              Intensity: {props.intensity}
            </p>
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
