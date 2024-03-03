import React from "react";
import "./AppHeader.css";

//asset imports
import plus from "../../assets/plus.png";
import hamburger from "../../assets/hamburger.png";

export default function AppHeader(props) {
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
    </header>
  );
}
