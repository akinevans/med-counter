import React from "react";
import "./CountDisplay.css";

export default function CountDisplay(props) {
  return <div className='count-display-wrapper'>{props.count}</div>;
}
