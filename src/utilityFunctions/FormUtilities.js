// function for properly toggling the classnames inside of the accentColor map function in Form.js
export const toggleColorClassNames = (
  isColorSelected,
  userSelectedAccentColor,
  color
) => (isColorSelected && userSelectedAccentColor === color ? "selected" : "");

//
//
//
//

export const displayAccentColors = () => [
  "purple",
  "fuchsia",
  "blue",
  "light-blue",
  "teal",
  "green",
  "dark-green",
  "gold",
  "orange",
  "crimson",
];

//
//
//
//

// function for getting and formatting date / time
export const getDateAndTime = () => {
  // These functions get the current date of the client device. So time zones are taken into account

  // Date logic
  const currentDate = new Date();

  let dateObj = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  };

  // Time logic
  let timeObj = {
    hour: currentDate.getHours(),
    minute: currentDate.getMinutes(),
    second: currentDate.getSeconds(),
  };

  return formatDateTime(dateObj, timeObj);
};

function formatDateTime(date, time) {
  // Format date as YYYY-MM-DD
  let formattedDate = `${date.year}-${date.month < 10 ? "0" : ""}${
    date.month
  }-${date.day < 10 ? "0" : ""}${date.day}`;

  // Format time as HH:MM
  let formattedTime = `${(time.hour < 10 ? "0" : "") + time.hour}:${
    time.minute < 10 ? "0" : ""
  }${time.minute}`;

  //formattedTimeWithSeconds is not in use. I created in case its needed in the future
  let formattedTimeWithSeconds = `${(time.hour < 10 ? "0" : "") + time.hour}:${
    (time.minute < 10 ? "0" : "") + time.minute
  }:${time.second < 10 ? "0" : ""}${time.second}`;

  return [formattedDate, formattedTime, formattedTimeWithSeconds];
}

//
//
//
//

export const clearFormInputValues = (...setters) => {
  // set all relevant state values back to default values when form is submitted or closed
  setters.forEach((setter) => setter(""));
};

//
//
//
//

export const checkIntensityValidForm = (data) => {
  if (data) {
    return Math.min(Math.max(data, 1), 10);
  } else if (!data || data === "") {
    return 1;
  } else {
    throw new Error("akin - Error in setting intensity in Form.js");
  }
};

//
//
//
//

// export const generateUniqueKey = () => {
//   // 648,000,000 possible combinations
//   const letters = [
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//   ];

//   // generate letter between A -> I
//   const randLetter1 = letters[Math.floor(Math.random() * 9)];

//   // generate letter between J -> R
//   const randLetter2 = letters[Math.floor(Math.random() * 9) + 9];

//   // generate letter between S -> Z
//   const randLetter3 = letters[Math.floor(Math.random() * 8) + 18];

//   let lettersKey = randLetter1 + randLetter2 + randLetter3;

//   return Math.floor(Math.random() * 1000000) + "-" + lettersKey;
// };
