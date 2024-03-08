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
export const handleInputUpdate = (event, inputField, currentData, newData) => {
  //check which input in symptomCard the data is coming from
  console.log("currentData:", currentData);

  //!edge case - If user goes into edit mode but doesn't change data
  // if currentData === newData
  if (!inputField) {
    alert("nothing changed");
  }

  if (inputField === "symptom-title-field") {
    //! ALL comparisons between NewData and Current Data are moving to sendUpdatedData because its the last function before redux, if that doesnt work move them to handleEdit

    //! ALL comparisons between NewData and Current Data are moving to sendUpdatedData because its the last function before redux, if that doesnt work move them to handleEdit

    //! ALL comparisons between NewData and Current Data are moving to sendUpdatedData because its the last function before redux, if that doesnt work move them to handleEdit
    //   console.log("symptom title field", event.target.value);

    // if data is different, allow it to update, else keep it set the same (from currentData)
    if (currentData.title === undefined || currentData.title === "") {
      currentData.title = event.target.value;
    }
    //event.target.value is going to be an empty string at first
    //   newData.title = event.target.value;

    //! bug reproduction
    //   newData.title = currentData.title;

    //* give newData.title its updated value, while comparing it to currentData
    //if new title is empty or undefined set it to the value of current title

    //! have to get the index
    //edge case
    if (newData.title !== "" || newData.title !== undefined) {
    }

    //   console.log(event.target.value);
    newData.title = event.target.value;
  } else if (inputField === "intensity-field") {
    newData.intensity = event.target.value;
  }

  //^ if all fail ...
  //   else {
  //     throw new Error(
  //       "Error in handleInputUpdate while trying to match the inputField value"
  //     );
  //   }

  console.log("newData from", inputField.toUpperCase(), ":", newData);
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

export const evaluateDataValues = (currentData, newData) => {};
