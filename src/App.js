import "./App.css";
import { useState, useEffect } from "react";
import CountDisplay from "./components/CountDisplay/CountDisplay";
import Button from "./components/Button/Button";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { updateCount, resetCount, addSymptom } from "../src/redux/countReducer";

// utility functions imports
import { checkCurrentCount } from "./utilityFunctions/utilityFunctions";

//TODO: Implement editable text list, with date / time

//! Known Bugs - When app first starts, incremented numbers concatenate. I believe its type is changing to string somehow. Clear cache for this site and try to replicate the issue

function App() {
  return (
    <div className='App'>
      <div className='app-inner-wrapper'></div>
    </div>
  );
}

export default App;
