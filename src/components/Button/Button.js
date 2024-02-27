import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <button className='operation-btn' onClick={props.btnOnClick}>
      {props.operation}
    </button>
  );
}
