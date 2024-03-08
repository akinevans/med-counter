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
      console.log("newData index: ", newData.index);

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
  updateNewDataState,
  setNewData
) => {
  //check which input in symptomCard the data is coming from
  console.log("currentData:", currentData);

  //!edge case - If user goes into edit mode but doesn't change data
  // if currentData === newData
  if (!inputField) {
    alert("nothing changed");
  }

  switch (inputField) {
    case "date-field":
      // update newData state object
      updateNewDataState("date", event.target.value, setNewData);
      break;
    case "symptom-title-field":
      newData.title = event.target.value;
      break;
    case "intensity-field":
      newData.intensity = event.target.value;
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

  updateNewDataState(null, event, setNewData);
  // return;
};

//
//
//
//

// function for sending the updated symptom card data (newData) to redux
function handleEdit(e, newData, currentData, setEditEnabled, sendUpdatedData) {
  //! IMPORTANT - you will have to accept data from ALL inputs and send it all to redux

  //edge case
  if (e === null || e === undefined) {
    return false;
  }

  setEditEnabled(false);

  //& check if any data has been altered, if true send date to redux
  //& do this by populating currentData variable (hardcode is fine) then compare it to newData

  console.log("newData right before send to Redux: ", newData);
  //   alert("Pause to see console data");

  // send the updated data, newData, to redux
  sendUpdatedData(newData, currentData);
}

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
    handleEdit(e, newData, currentData, setEditEnabled, sendUpdatedData);
  }
};

//
//
//
//

// function for handling decision making for new data and current data directly before its sent to redux in sendUpdatedData
export const evaluateDataValues = (currentData, newData) => {
  // //!BUG when clicking edit then immediately save, data gets erased in SymptomCard
  //^ FIX - By comparing if currentData !== newData you can decide if dispatch/editSymptom should be called or not
  // Edge case for all input elements
  // if new title is empty, set it to current title to prevent it from being overwritten as an empty string when sending data to redux

  //TODO: refactor the if expressions into a for in loop
  //   for (let key in newData) {
  //     console.log(newData[key]);
  //     console.log(key);
  //     alert("pause for key");
  //     if (newData[key] === "" || !newData[key]) {
  //       newData[key] = currentData[key];
  //     }
  //   }

  // do them in this order -> date, time, title, intensity, note

  // date
  if (newData.date === "" || !newData.date) {
    newData.date = currentData.date;
  }
  // title
  if (newData.title === "" || !newData.title) {
    newData.title = currentData.title;
  }
  // intensity
  if (newData.intensity === "" || !newData.intensity) {
    newData.intensity = currentData.intensity;
  }
  // note
  if (newData.note === "" || !newData.note) {
    newData.note = currentData.note;
  }
  console.log("new date at end of evaluateDataValues", newData.date);

  return;
};

//
//
//
// function for updating newDataState object
export const updateNewDataState = (key, value, setNewData) => {
  if (key === "date") {
    alert("key is date");
    setNewData((prevState) => ({
      // ...prevState,

      date: value,
    }));
  }
};
