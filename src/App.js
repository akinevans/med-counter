import "./App.css";
import { useState, useEffect } from "react";
import CountDisplay from "./components/CountDisplay/CountDisplay";
import Button from "./components/Button/Button";
import SymptomTracker from "./components/SymptomTracker/SymptomTracker";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { updateCount, resetCount, addSymptom } from "../src/redux/countReducer";

// utility functions imports
import { checkCurrentCount } from "./utilityFunctions/utilityFunctions";

//TODO: Implement editable text list, with date / time

//! Known Bugs - When app first starts, incremented numbers concatenate. I believe its type is changing to string somehow. Clear cache for this site and try to replicate the issue

function App() {
  const stateCount = useSelector((state) => state.count);
  const stateList = useSelector((state) => state.intensityData);

  const [currentCount, setCurrentCount] = useState(0);

  const dispatch = useDispatch();

  console.log(stateCount);

  const getCount = () => {
    // console.log(stateCount.count);
    return stateCount.count > 0 ? stateCount.count : 0;
  };

  // on page load check what counts value is. If 0 return 0
  useEffect(() => {
    if (stateCount.length === 0) {
      setCurrentCount(0);
    } else {
      setCurrentCount(stateCount.count);
    }
  }, [stateCount, stateCount.count]);

  return (
    <div className='App'>
      <CountDisplay count={getCount()} />
      <div className='quantity-btn-wrapper'>
        <Button
          operation='-'
          btnOnClick={() => {
            dispatch(
              updateCount({
                newCount: checkCurrentCount(currentCount, "decrement"),
              })
            );
          }}
        />
        <Button
          operation='+'
          btnOnClick={() => {
            dispatch(
              updateCount({
                newCount: checkCurrentCount(currentCount, "increment"),
              })
            );
          }}
        />
      </div>
      <div className='reset-btn-container'>
        <Button
          className='reset-btn'
          operation='Reset'
          btnOnClick={() => {
            dispatch(
              resetCount({
                clear: 0,
              })
            );
          }}
        />
      </div>
      <SymptomTracker />

      {/* {stateList.map((data) => (
        <SymptomTracker
          intensity={data.intensityData}
          symptoms={data.symptoms}
        />
      ))} */}
    </div>
  );
}

export default App;
