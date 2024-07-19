import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route path="/details/:char_id" Component={Details} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
