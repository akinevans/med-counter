import "./App.css";
import { useState } from "react";
import CountDisplay from "./components/CountDisplay/CountDisplay";
import Button from "./components/Button/Button";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { updateCount, resetCount } from "../src/redux/countReducer";

//& Rehydrate works, state is updating incorrectly

function App() {
  const stateCount = useSelector((state) => state.count);
  const [currentCount, setCurrentCount] = useState(0);
  const dispatch = useDispatch();
  // console.log(stateCount);
  // setCurrentCount(stateCount);

  const checkCurrentCount = (current, operation) => {
    if (operation === "increment") {
      setCurrentCount((prevCurrentCount) => prevCurrentCount + 1);
    } else if (operation === "decrement") {
      if (current > 0) {
        setCurrentCount((prevCurrentCount) => prevCurrentCount - 1);
      }
    }
    // finally update count in redux
    writeNewCount(currentCount);
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
    return stateCount.count ? stateCount.count : 0;
  };

  return (
    <div className='App'>
      <CountDisplay count={getCount()} />
      <div className='btn-wrapper'>
        <Button
          operation='-'
          btnOnClick={() => {
            checkCurrentCount(currentCount, "decrement");
          }}
        />
        <Button
          operation='+'
          btnOnClick={() => {
            checkCurrentCount(currentCount, "increment");
          }}
        />
      </div>
    </div>
  );
}

export default App;
