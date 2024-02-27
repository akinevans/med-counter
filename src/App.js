import "./App.css";
import { useState } from "react";
import CountDisplay from "./components/CountDisplay/CountDisplay";
import Button from "./components/Button/Button";

function App() {
  const [currentCount, setCurrentCount] = useState(0);

  const checkCurrentCount = (current, operation) => {
    if (operation === "increment") {
      setCurrentCount(current + 1);
    } else if (operation === "decrement") {
      if (current <= 0) {
        return null;
      } else {
        setCurrentCount(current - 1);
      }
    }
  };

  return (
    <div className='App'>
      <CountDisplay count={currentCount} />
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
