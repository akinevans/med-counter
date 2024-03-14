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
    <div className='color-picker-wrapper'>
      <div className={`selected-color-view ${userSelectedAccentColor}`}></div>
      {listOfAccentColors.map((color, index) => (
        <div
          key={index}
          className={`color-block ${color} ${toggleColorClassNames(
            isColorSelected,
            userSelectedAccentColor,
            color
          )}`}
          onClick={() => {
            //on click outside of color box turn it to false ?
            console.log(color);
            setIsColorSelected(true);
            setUserSelectedAccentColor(color);
            props.colorOnClick(color);
          }}
        ></div>
      ))}
    </div>
  );
}
