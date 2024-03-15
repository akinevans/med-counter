// function for generating X number of symptomCards with random data for testing / data generation purposes
export const generateRandomCardValues = (key) => {
  const colorsList = [
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

  function generateRandomColor() {
    return colorsList[Math.floor(Math.random() * colorsList.length)];
  }

  const dataOptions = [
    {
      title: "Headache",
      note: "Feeling lightheaded and unsteady",
      color: generateRandomColor(),
    },
    {
      title: "Tooth Ache",
      note: "Sever pain when chewing and drinking cold liquids",
      color: generateRandomColor(),
    },
    {
      title: "Nausea",
      note: "Feeling dizzy and sluggish",
      color: generateRandomColor(),
    },
    {
      title: "Cold",
      note: "Frequent sneezing and a runny nose",
      color: generateRandomColor(),
    },
    {
      title: "Insomnia",
      note: "Difficulty falling asleep or staying asleep",
      color: generateRandomColor(),
    },
    {
      title: "Back pain",
      note: "Tight muscles and some tenderness. Difficulty standing and walking",
      color: generateRandomColor(),
    },
    {
      title: "Dizzy",
      note: "Impaired ability to recall information or events",
      color: generateRandomColor(),
    },
    {
      title: "Fatigue",
      note: "Reduced strength or power in muscles",
      color: generateRandomColor(),
    },
    {
      title: "Skin rash",
      note: "Change in the color or texture of the skin",
      color: generateRandomColor(),
    },
    {
      title: "Chest pain",
      note: "Difficulty breathing and a feeling of breathlessness",
      color: generateRandomColor(),
    },
    {
      title: "Flu",
      note: "Elevated body temperature, tiredness, and some vomiting",
      color: generateRandomColor(),
    },
    {
      title: "Anxiety",
      note: "Hot flashes, elevated heart beat, nervousness",
      color: generateRandomColor(),
    },
    {
      title: "Joint pain",
      note: "Discomfort, inflammation, and stiffness in joints.",
      color: generateRandomColor(),
    },
    {
      title: "Sore throat",
      note: "Pain, scratchiness, or irritation of the throat that worsens when swallowing.",
      color: generateRandomColor(),
    },
    {
      title: "Changes in vision",
      note: "Alterations in visual acuity, clarity, or perception. Blurriness, double vision, blind spots.",
      color: generateRandomColor(),
    },
  ];

  const generatedData =
    dataOptions[Math.floor(Math.random() * dataOptions.length)];

  return generatedData;
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

//
//
//
//

// Function for deleting all entries - FOR TESTING ONLY
export const handleDeletion = () => {
  const reply = prompt(
    "Delete all entries? Press Enter / OK for Yes or Cancel / ESC for No"
  );

  // if cancel or esc is pressed
  if (reply === null || reply === undefined) {
    return false;
  }

  // if enter is pressed
  if (!reply) {
    return true;
  }

  const response = reply.toLowerCase();

  // incase user enters text
  if (response === "yes" || response === "y") {
    return true;
  } else {
    return false;
  }
};
