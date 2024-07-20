import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Details from "./components/Details";
import Header from "./components/Header";
import Episodes from "./components/Episodes";
import Locations from "./components/Locations";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route path="/details/:char_id" Component={Details} />
        <Route path="/episodes" Component={Episodes} />
        <Route path="/locations" Component={Locations} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
