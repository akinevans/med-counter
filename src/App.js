import "./App.css";
import { useState, useEffect } from "react";
import CountDisplay from "./components/CountDisplay/CountDisplay";
import Button from "./components/Button/Button";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { updateCount, resetCount } from "../src/redux/countReducer";
import { current } from "@reduxjs/toolkit";

//TODO: Implement editable text list, with date / time

function App() {
  const stateCount = useSelector((state) => state.count);
  const [currentCount, setCurrentCount] = useState(0);
  const dispatch = useDispatch();
  console.log(stateCount);
  // setCurrentCount(stateCount);

  useEffect(() => {
    if (stateCount.length === 0) {
      setCurrentCount(0);
    } else {
      setCurrentCount(stateCount.count);
    }
  }, [stateCount, stateCount.count]);

  const reset = () => {
    const zero = 0;

    dispatch(
      resetCount({
        clear: zero,
      })
    );
    // return;
  };

  const checkCurrentCount = (current, operation) => {
    let updatedCount;

    if (operation === "increment") {
      updatedCount = current + 1;
      // setCurrentCount((prev) => prev + 1);

      // finally update count in redux
      writeNewCount(updatedCount);
      return;
    } else if (operation === "decrement") {
      if (current > 0) {
        updatedCount = current - 1;
        // setCurrentCount((prev) => prev - 1);
        // finally update count in redux
        writeNewCount(updatedCount);
      }
    }
  };

  const writeNewCount = (current) => {
    dispatch(
      updateCount({
        newCount: current,
      })
    );
  };

  const getCount = () => {
    // console.log(stateCount.count);
    return stateCount.count > 0 ? stateCount.count : 0;
  };

  return (
    <div className='App'>
      <CountDisplay count={getCount()} />
      <div className='quantity-btn-wrapper'>
        <Button
          operation='-'
          btnOnClick={() => {
            if (currentCount > 0) {
              // setCurrentCount((prev) => prev - 1);
            }
            checkCurrentCount(currentCount, "decrement");
          }}
        />
        <Button
          operation='+'
          btnOnClick={() => {
            // setCurrentCount((prev) => prev + 1);
            checkCurrentCount(currentCount, "increment");
          }}
        />
      </div>
      <div className='reset-btn-container'>
        <Button
          className='reset-btn'
          operation='Reset'
          btnOnClick={() => {
            // setCurrentCount(0);
            reset();
          }}
        />
      </div>
    </div>
  );
}

export default App;
