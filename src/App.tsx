import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home";
import Ambassadors from "./components/Pages/Ambassadors";
import Login from "./components/Pages/Login";
import Forms from "./components/Pages/Forms";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ambassadors" element={<Ambassadors />} />
        <Route path="/forms" element={<Forms />} />
      </Routes>
    </>
  );
}

export default App;
