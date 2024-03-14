// function for displaying average intensity in Header Data

export const getAverageIntensity = (symptomCardData, totalNumOfCards) => {
  let totalIntensity = 0;
  symptomCardData.forEach((card) => {
    totalIntensity += card.intensity;
  });
  return (totalIntensity / totalNumOfCards).toFixed(1);
};

//
//
//
//
//

// calculates the number of mild and severe symptoms tracked
export const calculateIntensityCounts = (symptomCardData) => {
  let counts = [0, 0, 0];

  symptomCardData.forEach((card) => {
    if (card.intensity <= 3) {
      counts[0]++; // Mild
    } else if (card.intensity >= 8) {
      counts[2]++; // Severe
    } else {
      counts[1]++; // Moderate
    }
  });
  return counts;
};
