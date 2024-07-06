import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/actions/actions";

export default function Header() {
  const [newTask, setNewTask] = useState("");
  console.log(newTask);
  const dispatch = useDispatch();
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(newTask));
    setNewTask("");
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={formSubmit}>
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
