import "./App.css";
import { DarkModeSwitch } from "./components/DarkModeSwitch";
import ToDo from "./components/ToDo";

function App() {
  return (
    <div>
      <DarkModeSwitch />
      <ToDo />
    </div>
  );
}

export default App;
