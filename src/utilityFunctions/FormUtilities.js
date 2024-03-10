export const generateUniqueKey = () => {
  // 648,000,000 possible combinations
  const letters1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const letters2 = ["J", "K", "L", "M", "N", "O", "P", "Q", "R"];
  const letters3 = ["S", "T", "U", "V", "W", "X", "Y", "Z"];

  let randLetter1 = letters1[Math.floor(Math.random() * letters1.length)];
  let randLetter2 = letters2[Math.floor(Math.random() * letters2.length)];
  let randLetter3 = letters3[Math.floor(Math.random() * letters3.length)];

  let lettersKey = randLetter1 + randLetter2 + randLetter3;

  return Math.floor(Math.random() * 1000000) + "-" + lettersKey;
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
//

export const getDateAndTime = () => {
  // These functions get the current date of the client device. So time zones are taken into account
  // Date logic
  const currentDate = new Date();

  let dateObj = {
    year: currentDate.getFullYear(),
    // Months are zero-based, so add 1
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  };

  // Time logic
  let timeObj = {
    hour: currentDate.getHours(),
    minute: currentDate.getMinutes(),
    second: currentDate.getSeconds(),
  };

  let formattedDate = formatDateAndTime(dateObj)[0];
  let formattedTime = formatDateAndTime(null, timeObj)[1];
  let formattedTimeWithSeconds = formatDateAndTime(null, timeObj)[2];

  //editedTimeWithSeconds is not in use. I created in case its needed in the future
  return [formattedDate, formattedTime, formattedTimeWithSeconds];
};

//
//
//
//

// function for formatting date and time values after they are generated
function formatDateAndTime(date, time) {
  let editedDate, editedTime, editedTimeWithSeconds;
  // shorten the operation by checking if the caller needs date or time

  if (!time) {
    // Format  date as YYYY-MM-DD
    editedDate = `${date.year}-${date.month < 10 ? "0" : ""}${date.month}-${
      date.day < 10 ? "0" : ""
    }${date.day}`;
  }

  if (!date) {
    // Format time as HH:MM

    editedTime = `${(time.hour < 10 ? "0" : "") + time.hour}:${
      time.minute < 10 ? "0" : ""
    }${time.minute}`;

    editedTimeWithSeconds = `${(time.hour < 10 ? "0" : "") + time.hour}:${
      time.minute < 10 ? "0" : ""
    }${time.minute}:${time.second < 10 ? "0" : ""}${time.second}`;
  }
  return [editedDate, editedTime, editedTimeWithSeconds];
}

//
//
//
//

export const clearFormInputValues = (setSymptom, setIntensity, setNote) => {
  // set all relevant state values back to default values when form is submitted or closed
  setSymptom("");
  setIntensity("");
  setNote("");
};

//
//
//
//
