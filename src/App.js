import "./App.css";
import { useState } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import Form from "./components/Form/Form";
import SymptomCard from "./components/SymptomCard/SymptomCard";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { deleteAll, addSymptomCard } from "./redux/medicalDataReducer";

//utility imports
import {
  generateRandomCardValues,
  generateRandomDateTime,
} from "./utilityFunctions/debuggingHelper";

//TODO get header icons for edit and delete symptomCord

function App() {
  //state variables
  const [formVisible, setFormVisible] = useState(false);
  const [sortByDate, setSortByDate] = useState("descending");

  // get data from Redux
  const symptomCardData = useSelector((state) => state.medicalData.symptomList);
  const dispatch = useDispatch();

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

  // function to generate X number of symptom cards with some prefilled data
  const generateRandomCards = () => {
    const numOfCards = prompt("How many cards do you want to generate?");
    for (let i = 1; i <= numOfCards; i++) {
      dispatch(
        addSymptomCard({
          date: generateRandomDateTime()[0],
          time: generateRandomDateTime()[1],
          title: generateRandomCardValues("title"),
          intensity: Math.floor(Math.random() * 10) + 1,
          note: generateRandomCardValues("note"),
          accentColor: generateRandomCardValues("color"),
        })
      );
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

      {/* // Delete all entries btn is for testing purposes only */}
      <div className='helper-buttons-wrapper'>
        <button
          className='delete-all-btn'
          onClick={() => {
            handleDeletion();
          }}
        >
          Delete All Entries
        </button>
        <button
          className='generate-cards-helper-btn'
          onClick={() => {
            generateRandomCards();
          }}
        >
          Generate Some Data
        </button>

        <button
          className='sort-by-date-btn'
          onClick={() => {
            if (sortByDate === "descending") {
              setSortByDate("ascending");
            } else {
              setSortByDate("descending");
            }
          }}
        >
          {sortByDate === "descending"
            ? "Sort by date ascending"
            : "Sort by date descending"}
        </button>
      </div>
      <Form
        className={`${!formVisible ? "hidden" : ""}`}
        closeBtnOnClick={() => {
          setFormVisible(false);
        }}
      />
      <h1
        className={`sort-order-message ${
          symptomCardData.length !== 0 ? "" : "hidden"
        }`}
      >
        Sorted by {sortByDate === "ascending" ? "ascending" : "descending"}
      </h1>
      <div
        className={`symptom-card-component-list-wrapper ${
          sortByDate === "descending" ? "descending-date" : "ascending-date"
        }`}
      >
        <h1
          className={`empty-message ${
            symptomCardData.length === 0 ? "" : "hidden"
          }`}
        >
          Begin by adding some entries.
        </h1>

        {symptomCardData.length
          ? symptomCardData.map((data, index) => (
              /* //* column-reverse in App.css for class symptom-card-component-list-wrapper shows newest symptom cards first */

              <SymptomCard
                // key prop and all other data will be pulled from redux store
                key={index}
                thisCardsIndex={index}
                title={data.title}
                intensity={data.intensity}
                date={data.date}
                time={data.time}
                note={data.note}
                accentColor={data.accentColor}
              />
            ))
          : false}
      </div>
    </div>
  );
}

export default App;
