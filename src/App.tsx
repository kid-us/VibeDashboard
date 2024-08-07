import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home";
import Ambassadors from "./components/Pages/Ambassadors";
import Login from "./components/Pages/Login";
import Forms from "./components/Pages/Forms";
import Protected from "./components/Protected/Protected";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/ambassadors"
          element={
            <Protected>
              <Ambassadors />
            </Protected>
          }
        />
        <Route
          path="/forms"
          element={
            <Protected>
              <Forms />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

export default App;
