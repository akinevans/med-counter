import "./App.css";
import { useState } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import Form from "./components/Form/Form";
import SymptomCard from "./components/SymptomCard/SymptomCard";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { deleteAll } from "./redux/countReducer";

//utility imports

//TODO: Implement editable text list, with date / time
//TODO get header icons

function App() {
  const [formVisible, setFormVisible] = useState(false);

  // get data from Redux
  const symptomCardData = useSelector((state) => state.count.symptomList);
  const dispatch = useDispatch();

  const handleDeletion = () => {
    const reply = prompt("Are you sure you want to delete all entries?");
    if (reply === null || reply === undefined) {
      return;
    }

    reply.toLowerCase();

    if (reply === "yes" || reply === "y") {
      dispatch(deleteAll());
    } else {
      return false;
    }
  };
  return (
    <div className='App'>
      <AppHeader
        heading='Symptom Management'
        plusIconOnClick={() => {
          setFormVisible(!formVisible);
        }}
      />

      {/* //! Delete all entries btn is for testing purposes only */}
      <button
        className='delete-all-btn'
        onClick={() => {
          handleDeletion();
        }}
      >
        Delete All Entries
      </button>

      <Form
        className={`${!formVisible ? "hidden" : ""}`}
        closeBtnOnClick={() => {
          setFormVisible(false);
        }}
      />

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
            accentColor={data.accentColor}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
