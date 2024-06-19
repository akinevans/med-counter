// function for updating the data on an input field when it is changed
export const handleInputUpdate = (
  event,
  inputField,
  newData,
  setNewData,
  passedColor
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
      //check if value is >= 1 && <= 10
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

    case "accent-color":
      setNewData((prevState) => ({
        ...prevState,
        accentColor: passedColor,
      }));
      // console.log("passedColor", passedColor);
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
    //^ CAUTION. "e" represents the button event, not the data you're dealing with

    sendUpdatedData(newData, currentData);
  }
};

//
//
//
//

// function for handling decision making for new data and current data directly before its sent to redux in sendUpdatedData
export const evaluateDataValues = (currentData, newData, setNewData) => {
  // This logic prevents values from being overwritten by empty strings when edit mode is enabled, then immediately closed without user updating any values

  for (let key in newData) {
    // bracket notation when accessing an objects key with a dynamic name
    if (newData[key] === "") {
      setNewData((prevData) => ({ ...prevData, [key]: "" }));
    } else if (!newData[key]) {
      setNewData((prevData) => ({ ...prevData, [key]: currentData[key] }));
    }
  }
  return;
};

//
//
//
//

// function for correctly populating the string values in each input for existing symptomCard components
// use obj bracket notation when the property name is dynamic at runtime [key]
// use obj dot notation when the property name is valid / hardcoded (.title .date .time etc)
export const populateNewDataValues = (key, newData, existingValue) => {
  if (newData[key] !== undefined) {
    return newData[key];
  } else {
    return existingValue;
  }
};

//
//
//
//

export const checkIntensityValid = (
  newData,
  populateNewDataValues,
  intensityProp
) => {
  const intensityValue = populateNewDataValues(
    "intensity",
    newData,
    intensityProp
  );

  return Math.min(Math.max(intensityValue, 1), 10);
};
