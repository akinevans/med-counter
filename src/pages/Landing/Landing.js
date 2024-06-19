import React from "react";
import { useState } from "react";
import "./Landing.css";

// component imports
// customize --> https://github.com/wojtekmaj/react-calendar/wiki/Recipes
// calendar css can be changed via util classes in Landing.css
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// redux imports
import { useSelector } from "react-redux";

// router imports
import { Link } from "react-router-dom";

export default function Landing() {
  console.clear();

  //   const [value, setValue] = useState(new Date());

  // get data from Redux
  const symptomCardData = useSelector((state) => state.medicalData.symptomList);

  const datesToAddClassTo = [];

  function populateDateArray() {
    for (let i = 0; i < symptomCardData.length; i++) {
      datesToAddClassTo.push(symptomCardData[i].date);
    }
  }

  populateDateArray();
  //   console.log(datesToAddClassTo);

  // Style calendar dates with symptom data
  function tileClassName({ date, view }) {
    //! date is what is visible on the calendar page youre on
    // console.log(date);

    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to

      return "date-contains-data";
    }
  }

  return (
    <div>
      <h1>Landing Page</h1>
      <Link to='/symptom-manager'>Symptom Management</Link>

      {/* React-Calendar */}
      {/* <Calendar tileClassName={"date-contains-data"} /> */}
      <Calendar
        // onChange={onChange}
        // value={date}
        tileClassName={tileClassName}
      />
      <ol className='reverse'>
        {symptomCardData.map((card, index) => (
          <li key={index} className='list-item'>
            {card.date}
          </li>
        ))}
      </ol>
    </div>
  );
}
