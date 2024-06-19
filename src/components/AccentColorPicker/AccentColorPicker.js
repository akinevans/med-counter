import React from "react";
import { useState } from "react";
import "./AccentColorPicker.css";

// Utility imports
import {
  toggleColorClassNames,
  displayAccentColors,
} from "../../utilityFunctions/FormUtilities";

export default function AccentColorPicker(props) {
  const [isColorSelected, setIsColorSelected] = useState(false);
  const [userSelectedAccentColor, setUserSelectedAccentColor] =
    useState("blue");

  const listOfAccentColors = displayAccentColors();

  return (
    <div className={`color-picker-wrapper ${props.utilityClass1}`}>
      <div
        className={`selected-color-view ${userSelectedAccentColor} ${props.utilityClass2}`}
      ></div>
      {listOfAccentColors.map((color, index) => (
        <div
          key={index}
          className={`color-block ${color} ${toggleColorClassNames(
            isColorSelected,
            userSelectedAccentColor,
            color
          )} ${props.utilityClass3}`}
          onClick={() => {
            //on click outside of color box turn it to false ?
            // console.log(color);
            setIsColorSelected(true);
            setUserSelectedAccentColor(color);
            props.colorOnClick(color);
          }}
        ></div>
      ))}
    </div>
  );
}
