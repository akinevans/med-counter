import "./App.css";
import { useState } from "react";
import Form from "./components/Form/Form";
import SymptomCard from "./components/SymptomCard/SymptomCard";
import CountDisplay from "./components/CountDisplay/CountDisplay";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { updateCount, resetCount, addSymptom } from "../src/redux/countReducer";

// utility functions imports
import { checkCurrentCount } from "./utilityFunctions/utilityFunctions";
import { getByTestId } from "@testing-library/react";

//TODO: Implement editable text list, with date / time

function App() {
  const testData = [
    {
      title: "Heart Flutter",
      intensity: 4,
      date: "Today",
      time: "13:00",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, laudantium? Quibusdam placeat provident sint dolor!",
    },
    {
      title: "Headache",
      intensity: 2,
      date: "Yesterday",
      time: "9:00",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, laudantium? Quibusdam placeat provident sint dolor!",
    },
    {
      title: "Runny Nose",
      intensity: 1,
      date: "Yesterday",
      time: "12:00",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, laudantium? Quibusdam placeat provident sint dolor!",
    },
    {
      title: "Cough",
      intensity: 5,
      date: "Yesterday",
      time: "6:00",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, laudantium? Quibusdam placeat provident sint dolor!",
    },
  ];
  return (
    <div className='App'>
      <div className='app-inner-wrapper'>
        <Form className='set-background' />

        {testData.map((data, index) => (
          <SymptomCard
            // key prop and all other data will be pulled from redux store
            // use index as the second parameter to get current arr index

            key={index}
            title={data.title}
            intensity={data.intensity}
            date={data.date}
            time={data.time}
            notes={data.notes}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
