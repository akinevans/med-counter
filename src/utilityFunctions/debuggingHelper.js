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
      "Difficulty in passing stools or infrequent bowel movements",
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
