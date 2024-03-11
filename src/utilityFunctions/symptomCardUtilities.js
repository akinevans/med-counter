//! KNOWN BUGS
// When going into edit mode. Editing multiple fields then clicking save only the last edited field will update

export const getIndexInSymptomsByUniqueKey = (key, symptomStateArr) => {
  // edge case
  if (!symptomStateArr) {
    throw new Error("akin - symptomStateArr parameter is null or undefined");
    // return null;
  }

  // by this point symptomCard state arr already has 1 item
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
  setNewData,
  currentData,
  symptomCardData,
  currentSymptomCardKey
  // setCardIndex
) {
  //edge case
  if (symptomCardData.length === 0) {
    // newData.index = 0;
    setNewData(() => ({
      index: 0,
    }));
    currentData.index = 0;
    return 0;
  }

  // find the correct data in symptomCard state array by matching the uniqueKey property
  for (let i = 0; i < symptomCardData.length; i++) {
    if (symptomCardData[i].uniqueKey === currentSymptomCardKey) {
      // console.log("i: ", i);
      // console.log("data FOUND in: ", symptomCardData[i]);
      // console.log("some data found - title:: ", symptomCardData[i].title);

      // newData.index = symptomCardData[i].cardIndex;
      setNewData(() => ({
        index: symptomCardData[i].cardIndex,
      }));
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

// function for updating the data on an input field when it is changed
export const handleInputUpdate = (
  event,
  inputField,
  currentData,
  newData,
  setNewData
) => {
  // edge case - If the user goes into edit mode but doesn't change data
  if (!inputField) {
    throw new Error("akin - No input field provided");
  }

  // update only the specific field related to the current input
  switch (inputField) {
    case "date-field":
      // prevState preserves the value of each state variable. This allows you to edit multiple fields at once
      setNewData((prevState) => ({
        ...prevState,
        date: event.target.value,
      }));
      break;

    case "time-field":
      setNewData((prevState) => ({
        ...prevState,
        time: event.target.value,
      }));
      break;

    case "symptom-title-field":
      setNewData((prevState) => ({
        ...prevState,
        title: event.target.value,
      }));
      break;

    case "intensity-field":
      setNewData((prevState) => ({
        ...prevState,
        intensity: event.target.value,
      }));
      break;

    case "note-field":
      setNewData((prevState) => ({
        ...prevState,
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
  setNewData,
  currentData,
  symptomCardData,
  currentSymptomCardKey,
  editEnabled,
  setEditEnabled,
  sendUpdatedData
) => {
  //edge case
  if (e.target.value === "" && e.target.textContent === "Edit") {
    // trigger edit mode
    setEditEnabled(!editEnabled);
  }

  // check what state editEnabled is in, if 'Edit', get all new input data
  if (e.target.textContent === "Save") {
    // update all inputs state
    //^ CAUTION. e = the button event, not the data you're dealing with

    getCurrentIndex(
      newData,
      setNewData,
      currentData,
      symptomCardData,
      currentSymptomCardKey
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

// function for correctly populating the string values in each input for existing symptomCard components
// use obj bracket notation when the property name is dynamic at runtime [key]
// use obj dot notation when the property name is valid / hardcoded (.title .date .time etc)
export const populateNewDataValues = (key, newData, existingValue) => {
  if (newData[key]) {
    return newData[key];
  } else if (newData[key] === "") {
    return "";
  } else if (!newData[key]) {
    return existingValue;
  } else {
    throw new Error("akin - Error in setting form value");
  }
};

//
//
//
//
//

// function for handling decision making for new data and current data directly before its sent to redux in sendUpdatedData
export const evaluateDataValues = (currentData, newData, setNewData) => {
  // This logic prevents values from being overwritten by empty strings when edit mode is enabled, then immediately closed without user updating any values

  // Edge case for all input elements
  //TODO: refactor the if expressions into a for in loop

  if (newData.date === "") {
    setNewData(() => ({
      date: "",
    }));
    return;
  } else if (!newData.date) {
    setNewData(() => ({
      date: currentData.date,
    }));
  }

  if (newData.time === "") {
    setNewData(() => ({
      time: "",
    }));
    return;
  } else if (!newData.time) {
    setNewData(() => ({
      time: currentData.time,
    }));
  }

  if (newData.title === "") {
    setNewData(() => ({
      title: "",
    }));
    return;
  } else if (!newData.title) {
    setNewData(() => ({
      title: currentData.title,
    }));
  }

  if (newData.intensity === "") {
    setNewData(() => ({
      intensity: "",
    }));
    return;
  } else if (!newData.intensity) {
    setNewData(() => ({
      intensity: currentData.intensity,
    }));
  }

  if (newData.note === "") {
    setNewData(() => ({
      note: "",
    }));
    return;
  } else if (!newData.note) {
    setNewData(() => ({
      note: currentData.note,
    }));
  }

  // if (newData.accentColor === "" || !newData.accentColor) {
  //   newData.accentColor = currentData.accentColor;
  // }

  return;
};

//
//
//
//
