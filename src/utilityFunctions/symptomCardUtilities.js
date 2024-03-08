//! KNOWN BUGS
// When going into edit mode. Editing the date, then the time, then clicking save (in that order), the new date value will reset to the currentDate value

//TODO: refactor all functions to use state / set state with newData state obj

function getCurrentIndex(
  newData,
  currentData,
  symptomCardData,
  currentSymptomCardKey,
  setCardIndex
) {
  //   console.log("currentStateLength ", currentData.stateLength);

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
      console.log("some data found - title:: ", symptomCardData[i].title);

      newData.index = symptomCardData[i].cardIndex;
      currentData.index = i;

      break;
    } else if (i !== symptomCardData.length) {
      continue;
    }
    return i;
  }
  return 0;
}

//
//
//
//

// function for updating the data on an input when it edited
export const handleInputUpdate = (
  event,
  inputField,
  currentData,
  newData,
  setNewData
) => {
  //check which input in symptomCard the data is coming from
  console.log("currentData:", currentData);

  //!edge case - If user goes into edit mode but doesn't change data
  // if currentData === newData
  if (!inputField) {
    alert("nothing changed");
  }

  // update newDataState key values by seeing what input the data is coming from
  switch (inputField) {
    case "date-field":
      alert("key is date");
      setNewData((prevState) => ({
        // ...prevState,
        date: event.target.value,
      }));
      break;

    case "symptom-title-field":
      alert("key is title");
      setNewData(() => ({
        title: event.target.value,
      }));
      break;

    case "intensity-field":
      alert("key is intensity");
      setNewData(() => ({
        intensity: event.target.value,
      }));
      break;

    default:
      alert("error in switch case");
  }

  //^ if all fail ...
  //   else {
  //     throw new Error(
  //       "Error in handleInputUpdate while trying to match the inputField value"
  //     );
  //   }
  console.log("newData from", inputField.toUpperCase(), ":", newData);

  return;
};

//
//
//
//

// function for handling edit button on click
export const handleEditButton = (
  e,
  newData,
  currentData,
  symptomCardData,
  currentSymptomCardKey,
  editEnabled,
  setEditEnabled,
  setCardIndex,
  sendUpdatedData
) => {
  //edge case
  if (e.target.value === "" && e.target.textContent === "Edit") {
    // trigger content editable attributes
    setEditEnabled(!editEnabled);
    // check what state editEnabled is in, if 'Edit', get all new input data
  }
  if (e.target.textContent === "Save") {
    //^ update all inputs state
    //! be careful, e = the button event, not the data you're dealing with

    //check if editEnabled is turned back off then send all data to redux

    getCurrentIndex(
      currentData,
      newData,
      symptomCardData,
      currentSymptomCardKey,
      setCardIndex
    );

    // Update all properties in NewDataState as a safeguard, this will prevent propertied from going back to their currentData value when attempting to edit multiple form inputs

    //add same switch case logic from above

    sendUpdatedData(newData, currentData);
  }
};

//
//
//
//

// function for handling decision making for new data and current data directly before its sent to redux in sendUpdatedData
export const evaluateDataValues = (currentData, newData) => {
  //* This logic prevents values from being overwritten by empty strings when edit mode is enabled, then immediately closed without user updating any values

  //TODO add all other inputs tot his logic
  // Edge case for all input elements
  if (newData.date === "" || !newData.date) {
    newData.date = currentData.date;
  }
  if (newData.title === "" || !newData.title) {
    newData.title = currentData.title;
  }
  if (newData.intensity === "" || !newData.intensity) {
    newData.intensity = currentData.intensity;
  }
  if (newData.note === "" || !newData.note) {
    newData.note = currentData.note;
  }

  //TODO: refactor the if expressions into a for in loop
  //   for (let key in newData) {
  //     console.log(newData[key]);
  //     console.log(key);
  //     alert("pause for key");
  //     if (newData[key] === "" || !newData[key]) {
  //       newData[key] = currentData[key];
  //     }
  //   }

  console.log("new date at end of evaluateDataValues", newData.date);

  return;
};

//
//
//