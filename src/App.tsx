import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home";
import Ambassadors from "./components/Pages/Ambassadors";
import Login from "./components/Pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ambassadors" element={<Ambassadors />} />
      </Routes>
    </>
  );
}

export default App;
