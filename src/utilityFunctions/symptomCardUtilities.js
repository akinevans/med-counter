//! KNOWN BUGS
// When going into edit mode. Editing multiple fields then clicking save only the last edited field will update

//TODO: refactor all functions to use state / set state with newData state obj

export const getIndexInSymptomsByUniqueKey = (key, symptomStateArr) => {
  // edge case
  if (!symptomStateArr) {
    throw new Error("akin - symptomStateArr parameter is null or undefined");
    // return null;
  }

  // by this point you've already added 1 symptomCard
  if (symptomStateArr.length === 1) {
    return 0;
  }

  // loop over state array and find the index where the matching key, (uniqueKey), resides
  for (let i = 0; i < symptomStateArr.length; i++) {
    if (symptomStateArr[i].uniqueKey === key) {
      console.log("FOUND KEY AT", i);
      return i;
    }
  }
  return false;
};

//
//
//
//

export const getMatchingIndexInUniqueKeys = (key, uniqueKeyStateArr) => {
  //edge case

  if (uniqueKeyStateArr.length === 0 || !uniqueKeyStateArr) {
    return null;
  }

  for (let i = 0; i < uniqueKeyStateArr.length; i++) {
    if (uniqueKeyStateArr[i].uniqueKey === key) {
      console.log("FounD indeX", i);
      return i;
    }
  }
  return null;
};

//
//
//
//

function getCurrentIndex(
  newData,
  currentData,
  symptomCardData,
  currentSymptomCardKey
  // setCardIndex
) {
  //edge case
  if (symptomCardData.length === 0) {
    // setCardIndex(0);
    newData.index = 0;
    currentData.index = 0;
    return 0;
  }

  // find the correct data in symptomCard state array by matching the uniqueKey property
  for (let i = 0; i < symptomCardData.length; i++) {
    if (symptomCardData[i].uniqueKey === currentSymptomCardKey) {
      // console.log("i: ", i);
      // console.log("data FOUND in: ", symptomCardData[i]);
      // console.log("some data found - title:: ", symptomCardData[i].title);

      newData.index = symptomCardData[i].cardIndex;
      currentData.index = i;
      // setCardIndex(i);

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

// function for updating the data on an input field when it is changed
export const handleInputUpdate = (
  event,
  inputField,
  currentData,
  newData,
  setNewData
) => {
  //check which input in symptomCard the data is coming from
  // console.log("currentData:", currentData);

  // edge case - If user goes into edit mode but doesn't change data
  //TODO: this block needs reworking
  if (!inputField) {
    alert("nothing changed");
  }

  //! try multiple if blocks, no 'else if'
  // see what input the data is coming from, update that inputs state
  switch (inputField) {
    case "date-field":
      // alert("key is date");
      setNewData((prevState) => ({
        date: event.target.value,
      }));
      break;

    case "symptom-title-field":
      // alert("key is title");
      setNewData(() => ({
        title: event.target.value,
      }));
      break;

    case "time-field":
      // alert("key is time");
      setNewData(() => ({
        time: event.target.value,
      }));
      break;

    case "intensity-field":
      // alert("key is intensity");
      setNewData(() => ({
        intensity: event.target.value,
      }));
      break;

    case "note-field":
      // alert("key is note");
      setNewData(() => ({
        note: event.target.value,
      }));
      break;

    default:
      throw new Error("akin - Error when deciding what input is being updated");
  }
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
  // setCardIndex,
  sendUpdatedData
) => {
  //edge case
  if (e.target.value === "" && e.target.textContent === "Edit") {
    // trigger edit mode
    setEditEnabled(!editEnabled);
  }

  // check what state editEnabled is in, if 'Edit', get all new input data
  if (e.target.textContent === "Save") {
    //^ update all inputs state
    //! be careful, e = the button event, not the data you're dealing with

    getCurrentIndex(
      currentData,
      newData,
      symptomCardData,
      currentSymptomCardKey
      // setCardIndex
    );

    // Update all properties in NewDataState as a safeguard, this will hopefully prevent propertied from going back to their currentData value when attempting to edit multiple form inputs

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

  //TODO add all other inputs to this logic
  // Edge case for all input elements
  //! this is causing the bug where you cant fully delete existing note
  if (newData.date === "" || !newData.date) {
    newData.date = currentData.date;
  }
  if (newData.time === "" || !newData.time) {
    newData.time = currentData.time;
  }
  if (newData.title === "" || !newData.title) {
    newData.title = currentData.title;
  }
  if (newData.intensity === "" || !newData.intensity) {
    newData.intensity = currentData.intensity;
  }
  if (currentData.note) {
    newData.note = "xxxx";
  }
  // if (newData.accentColor === "" || !newData.accentColor) {
  //   newData.accentColor = currentData.accentColor;
  // }

  //TODO: refactor the if expressions into a for in loop
  // for (let key in newData) {
  //   console.log(newData[key]);
  //   console.log(key);
  //   alert("pause for key");
  //   if (newData[key] === "" || !newData[key]) {
  //     newData[key] = currentData[key];
  //   }
  // }

  // console.log("new date at end of evaluateDataValues", newData.date);

  return;
};

//
//
//
