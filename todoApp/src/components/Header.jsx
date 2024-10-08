import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/actions/actions";
import { DarkModeSwitch } from "./DarkModeSwitch";

export default function Header() {
  const [newTask, setNewTask] = useState("");
  console.log(newTask);
  const dispatch = useDispatch();
  const formSubmit = (e) => {
    e.preventDefault();
    if (!newTask) return;
    dispatch(addTask(newTask));
    setNewTask("");
  };
  return (
    <header className="header">
      <div className="headerTitleSec">
        <div className="title">
          <h1>To Do's</h1>
        </div>

        <DarkModeSwitch />
      </div>
      <form className="headerForm" onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
}
