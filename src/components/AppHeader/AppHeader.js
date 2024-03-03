import React from "react";
import "./AppHeader.css";

export default function AppHeader(props) {
  return (
    <header className='app-header'>
      <div className='app-nav'>
        <img className='ham-menu-icon' src='' alt='=' />
        <h1 className='header-title'>{props.heading}</h1>
        <img className='plus-icon' src='' alt='+' />
        <div className='header-bottom'></div>
      </div>
    </header>
  );
}
