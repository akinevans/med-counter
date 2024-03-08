export const generateUniqueKey = () => {
  const alpha1 = ["A", "B", "C", "D", "E", "F"];
  const alpha2 = ["U", "V", "W", "X", "Y", "Z"];

  let randLetter1 = alpha1[Math.floor(Math.random() * alpha1.length)];
  let randLetter2 = alpha2[Math.floor(Math.random() * alpha2.length)];

  return Math.floor(Math.random() * 100000) + "-" + randLetter1 + randLetter2;
};

//
//
//

export const displayAccentColors = () => {
  return [
    "blue",
    "light-blue",
    "teal",
    "gold",
    "orange",
    "green",
    "dark-green",
    "purple",
    "fuchsia",
    "crimson",
  ];
};

//
//
//

export const getDateAndTime = () => {
  // Date logic
  const currentDate = new Date();

  // get year, month, and day
  let dateObj = {
    year: currentDate.getFullYear(),
    // Months are zero-based, so add 1
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  };

  // Time logic
  // get hours, min, sec
  let timeObj = {
    hour: currentDate.getHours(),
    minute: currentDate.getMinutes(),
    second: currentDate.getSeconds(),
  };

  let formattedDate = formatDateAndTime(dateObj);
  let formattedTime = formatDateAndTime(null, timeObj);

  console.log("date", formattedDate, "time:", formattedTime);

  return [formattedDate, formattedTime];
};

// function for formatting date and time values after they are generated
function formatDateAndTime(date, time) {
  // shorten the operation by seeing if the function needs date or time
  if (!time) {
    // Format  date as YYYY-MM-DD
    let editedDate =
      date.year +
      "-" +
      (date.month < 10 ? "0" : "") +
      date.month +
      "-" +
      (date.day < 10 ? "0" : "") +
      date.day;

    return editedDate;
  }

  if (!date) {
    // Format time as HH:MM
    let editedTime =
      (time.hour < 10 ? "0" : "") +
      time.hour +
      ":" +
      (time.minute < 10 ? "0" : "") +
      time.minute +
      ":" +
      (time.second < 10 ? "0" : "") +
      time.second;

    return editedTime;
  }
}

export const clearFormInputValues = (
  setSymptom,
  setIntensity,
  setDate,
  setTime,
  setNote,
  setColorSelected,
  setUserSelectedAccentColor
) => {
  // set all relevant state values back to their default values when form is submitted or closed
  setSymptom("");
  setIntensity("");
  // setDate();
  // setTime();
  setNote("");
  setColorSelected(false);
  // setUserSelectedAccentColor();
};
