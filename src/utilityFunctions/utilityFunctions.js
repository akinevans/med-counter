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
export const generateRandomColor = () => {
  const colors = [
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
  let randomIndex = Math.floor(Math.random() * colors.length);

  // console.log("index is: ", randomIndex);
  // console.log(colors[randomIndex]);

  return colors[randomIndex];
};

//
//
//
