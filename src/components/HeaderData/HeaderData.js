import React from "react";
import "./HeaderData.css";

export default function HeaderData(props) {
  return (
    <div className='header-data-wrapper'>
      <div className='data-1-wrapper'>
        <h1 className='header-data-quantity'>{props.quantity1}</h1>
        <p className='header-data-title'>{props.title1}</p>
      </div>
      <div className='data-2-wrapper'>
        <h1 className='header-data-quantity'>{props.quantity2}</h1>
        <p className='header-data-title'>{props.title2}</p>
      </div>
      <div className='data-3-wrapper'>
        <h1 className='header-data-quantity'>{props.quantity3}</h1>
        <p className='header-data-title'>{props.title3}</p>
      </div>
      <div className='data-4-wrapper'>
        <h1 className='header-data-quantity'>{props.quantity4}</h1>
        <p className='header-data-title'>{props.title4}</p>
      </div>
      <div className='data-5-wrapper'>
        <h1 className='header-data-quantity'>{props.quantity5}</h1>
        <p className='header-data-title'>{props.title5}</p>
      </div>
    </div>
  );
}
