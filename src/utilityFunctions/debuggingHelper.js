// function for generating X number of symptomCards with random data for testing / data generation purposes
export const generateRandomCardValues = (key) => {
  const dataOptions = {
    title: [
      "headache",
      "cold",
      "nausea",
      "back pain",
      "Dull aches",
      "cold sweat",
      "dizzy",
      "fatigue",
      "rash",
      "insomnia",
      "stomach ache",
      "tooth pain",
    ],
    color: [
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
    ],
    note: [
      "Difficulty breathing or a feeling of breathlessness",
      "Really bad hot flashes",
      "Feeling dizzy and sluggish",
      "Pain when attempting to move",
      "Tight muscles and some tenderness",
      "Feeling lightheaded and unsteady",
      "Change in the color or texture of the skin",
      "Infrequent bowel movements",
      "Difficulty falling asleep or staying asleep",
      "Reduced strength or power in muscles",
      "Elevated body temperature",
      "Impaired ability to recall information or events",
    ],
  };

  const optionsArray = dataOptions[key];

  if (!optionsArray) {
    throw new Error("akin - Invalid key provided in generateRandomCardValues");
  }

  const randomIndex = Math.floor(Math.random() * optionsArray.length);
  return optionsArray[randomIndex];
};

//
//
//
//

// Function to generate a random date for testing purposes
export const generateRandomDateTime = () => {
  // formula --> (maxValue - minValue + 1) + minValue

  // Date logic
  let year = Math.floor(Math.random() * (2024 - 2020 + 1) + 2020);
  let month = Math.floor(Math.random() * (12 - 1 + 1) + 1);
  // max out days at 28 so the month of February doesn't break anything
  let day = Math.floor(Math.random() * (28 - 1 + 1) + 1);

  // Time logic
  let hours = Math.floor(Math.random() * 24); // 0 to 23
  let minutes = Math.floor(Math.random() * 60); // 0 to 59
  // let seconds = Math.floor(Math.random() * 60); // 0 to 59

  // Format date
  let formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  // Format the time string
  let formattedTime = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  return [formattedDate, formattedTime];
};
