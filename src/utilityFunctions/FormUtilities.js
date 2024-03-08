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
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  let day = currentDate.getDate();

  // Format  date as YYYY-MM-DD
  let formattedDate =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day;

  // Time logic
  // get hours, min, sec
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let second = currentDate.getSeconds();

  // Format time as HH:MM
  let formattedTime =
    (hour < 10 ? "0" : "") + hour + ":" + (minute < 10 ? "0" : "") + minute;

  console.log("formattedDate", formattedDate, "formatted time:", formattedTime);
  return [formattedDate, formattedTime];
};
