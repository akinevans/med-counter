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
  // get data from Redux
  const symptomCardData = useSelector((state) => state.count.symptomList);
  const dispatch = useDispatch();
  //state variables
  const [formVisible, setFormVisible] = useState(false);

  // const [userSelectedAccentColor, setUserSelectedAccentColor] =
  //   useState("blue");

  const handleDeletion = () => {
    const reply = prompt(
      "Delete all entries? Enter for Yes or Cancel / ESC for No"
    );
    if (reply === null || reply === undefined) {
      return;
    }

    if (!reply) {
      dispatch(deleteAll());
    }

    const response = reply.toLowerCase();

    if (response === "yes" || response === "y") {
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
        <h1
          className={`empty-message ${
            symptomCardData.length === 0 ? "" : "hidden"
          }`}
        >
          Begin by adding some entries.
        </h1>
        {symptomCardData.length
          ? symptomCardData.map((data, index) => (
              <SymptomCard
                // key prop and all other data will be pulled from redux store
                // use index as the second parameter to get current arr index
                // key={index}
                title={data.title}
                intensity={data.intensity}
                date={data.date}
                time={data.time}
                note={data.note}
                accentColor={data.accentColor}
                key={data.uniqueKey}
                uniqueKey={data.uniqueKey}
                //props for updating values in edit mode
              />
            ))
          : false}
      </div>
    </div>
  );
}

export default App;
