import "./App.css";
import { useState, useEffect } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import Form from "./components/Form/Form";
import SymptomCard from "./components/SymptomCard/SymptomCard";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { deleteAll, addSymptomCard } from "./redux/medicalDataReducer";

//utility imports
import {
  handleDeletion,
  generateRandomDateTime,
  generateRandomCardValues,
} from "./utilityFunctions/debuggingHelper";

//TODO get header icons for edit and delete symptomCord

function App() {
  //state variables
  const [formVisible, setFormVisible] = useState(false);
  const [sortPreference, setSortPreference] = useState(
    localStorage.getItem("userSortPreference") || "descending"
  );

  // get data from Redux
  const symptomCardData = useSelector((state) => state.medicalData.symptomList);
  const dispatch = useDispatch();

  // function to generate X number of symptom cards with some prefilled data
  const generateRandomCards = () => {
    const numOfCards = prompt("How many cards do you want to generate?");
    for (let i = 1; i <= numOfCards; i++) {
      // generate random card data object
      const randomCardData = generateRandomCardValues();

      dispatch(
        addSymptomCard({
          date: generateRandomDateTime()[0],
          time: generateRandomDateTime()[1],
          title: randomCardData.title,
          intensity: Math.floor(Math.random() * 10) + 1,
          note: randomCardData.note,
          accentColor: randomCardData.color,
        })
      );
    }
  };

  // Function to handle sortPreference change
  const handleSortPreferenceChange = (newSortPreference) => {
    setSortPreference(newSortPreference);
    localStorage.setItem("userSortPreference", newSortPreference);
  };

  useEffect(() => {
    // Check if user sortPreference exists in local storage
    const storedSortPreference = localStorage.getItem("userSortPreference");
    if (storedSortPreference) {
      setSortPreference(storedSortPreference);
    }
  }, []);
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
        {/* //& DELETE ALL BUTTON */}

        <button
          className='delete-all-btn'
          onClick={() => {
            if (handleDeletion()) {
              dispatch(deleteAll());
            }
          }}
        >
          Delete All Entries
        </button>

        {/* //& GENERATE DATA BUTTON */}

        <button
          className='generate-cards-helper-btn'
          onClick={() => {
            generateRandomCards();
          }}
        >
          Generate Some Data
        </button>

        {/* //& SORT BUTTON */}
        <button
          className='sort-by-date-btn'
          onClick={() => {
            // toggle sortPreference
            // console.log(sortPreference);
            handleSortPreferenceChange(
              sortPreference === "descending" ? "ascending" : "descending"
            );
            // console.log("localStorage", localStorage.userSortPreference);
          }}
        >
          {/* Toggle sort message in button*/}
          {sortPreference === "descending"
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

      {/* Toggle sort message title*/}
      <h1
        className={`sort-order-message ${
          symptomCardData.length !== 0 ? "" : "hidden"
        }`}
      >
        Sorted by {sortPreference === "ascending" ? "ascending" : "descending"}
      </h1>
      <div
        className={`symptom-card-component-list-wrapper ${
          sortPreference === "descending" ? "descending-date" : "ascending-date"
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
