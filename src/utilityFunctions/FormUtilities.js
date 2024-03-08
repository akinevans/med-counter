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
