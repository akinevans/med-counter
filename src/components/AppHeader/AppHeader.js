import React from "react";
import "./AppHeader.css";
import HeaderData from "../HeaderData/HeaderData";

// Redux imports
import { useSelector } from "react-redux";

// Utility imports
import {
  getAverageIntensity,
  calculateIntensityCounts,
} from "../../utilityFunctions/HeaderDataUtilities";

//asset imports
import plus from "../../assets/plus.png";
import hamburger from "../../assets/hamburger.png";

export default function AppHeader(props) {
  // Redux symptom state array
  const symptomCardData = useSelector((state) => state.medicalData.symptomList);
  const totalNumOfCards = symptomCardData.length;

  let averageIntensity =
    symptomCardData.length !== 0
      ? getAverageIntensity(symptomCardData, totalNumOfCards)
      : 0;

  let numOfMildSymptoms = calculateIntensityCounts(symptomCardData)[0];
  let numOfModerateSymptoms = calculateIntensityCounts(symptomCardData)[1];
  let numOfSevereSymptoms = calculateIntensityCounts(symptomCardData)[2];

  return (
    <header className='app-header'>
      <div className='app-nav'>
        <img
          className='ham-menu-icon'
          src={hamburger}
          alt='hamburger menu icon'
        />
        <h1 className='header-title'>{props.heading}</h1>
        <img
          className='plus-icon'
          src={plus}
          alt='plus icon'
          onClick={props.plusIconOnClick}
        />
        <div className='header-bottom'></div>
      </div>

      {/* //&Header Data here */}
      <HeaderData
        quantity1={totalNumOfCards}
        title1={"symptoms tracked"}
        quantity2={averageIntensity}
        title2={"average intensity"}
        quantity3={numOfMildSymptoms}
        title3={"mild symptoms"}
        quantity4={numOfModerateSymptoms}
        title4={"moderate symptoms"}
        quantity5={numOfSevereSymptoms}
        title5={"severe symptoms"}
      />
    </header>
  );
}
