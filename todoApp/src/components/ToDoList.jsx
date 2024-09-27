import { useSelector, useDispatch } from "react-redux";
import { toggleTask, removeTask } from "../store/actions/actions";
import { tasksSelector } from "../store/selectors/selectors";
import { useState, useEffect } from "react";

export default function TodoList() {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelector);
  console.log("active:", tasks);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const tasksSection = document.querySelector(".tasksSection");
    const tasksItems = document.querySelectorAll(".tasks li");

    if (theme === "dark") {
      tasksSection.classList.add("darkList");
      tasksItems.forEach((item) => item.classList.add("darkList"));
    } else {
      tasksSection.classList.remove("darkList");
      tasksItems.forEach((item) => item.classList.remove("darkList"));
    }
  }, [theme]);

  return (
    <div className="tasksSection">
      <ul className="tasks">
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <div className="activeInputSec">
                <input
                  type="checkbox"
                  onChange={() => {
                    dispatch(toggleTask(task.id));
                  }}
                />
                <label>{task.content}</label>
                <button
                  className="destroy"
                  onClick={() => dispatch(removeTask(task.id))}
                >
                  x
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
