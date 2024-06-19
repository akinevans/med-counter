import "./App.css";

// component imports
import Landing from "./pages/Landing/Landing";
import SymptomManager from "./components/SymptomManager/SymptomManager";

// react-router imports
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<Landing />} /> */}
      {/* <Route path='/symptom-manager' element={<SymptomManager />} /> */}
      <Route path='/' element={<SymptomManager />} />
    </Routes>
  );
}

export default App;
