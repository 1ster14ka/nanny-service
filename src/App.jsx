import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout.jsx";
import Nannies from "./pages/Nannies/Nannies.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="nannies" element={<Nannies />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
