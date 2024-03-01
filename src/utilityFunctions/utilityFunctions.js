export const checkCurrentCount = (current, operation) => {
  let updatedCount;
  // convert current to integer
  // current = parseInt(current);

  if (operation === "increment") {
    updatedCount = current + 1;
    return updatedCount;
  } else if (operation === "decrement") {
    if (current > 0) {
      updatedCount = current - 1;
      return updatedCount;
    }
  }
  return false;
};

//
//
//

export const handleFormSubmission = (e) => {
  // Do not submit the form
  e.preventDefault();

  alert("Send data to Redux, Pull data into new Symptom card component");
};

//
//
//
