import "./App.css";
import { useState } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import Form from "./components/Form/Form";
import SymptomCard from "./components/SymptomCard/SymptomCard";

// redux imports
import { useSelector } from "react-redux";

//utility imports
import { generateRandomColor } from "./utilityFunctions/utilityFunctions";

//TODO: Implement editable text list, with date / time
//TODO get header icons

function App() {
  const [formVisible, setFormVisible] = useState(false);

  // get data from Redux
  const symptomCardData = useSelector((state) => state.count.symptomList);

  return (
    <div className='App'>
      <AppHeader heading='Symptom Management' />
      <Form className={`${!formVisible ? "hidden" : ""}`} />
      <div className='symptom-card-component-list-wrapper'>
        {symptomCardData.map((data, index) => (
          <SymptomCard
            // key prop and all other data will be pulled from redux store
            // use index as the second parameter to get current arr index

            key={index}
            title={data.title}
            intensity={data.intensity}
            date={data.date}
            time={data.time}
            note={data.note}
            accentColor={generateRandomColor()}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
