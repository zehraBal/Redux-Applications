import { useDispatch, useSelector } from "react-redux";
import { removeTask, toggleCompleteTask } from "../store/actions/actions";
import { completeSelector } from "../store/selectors/selectors";
import { useEffect, useState } from "react";

export default function CompletedTasks() {
  const dispatch = useDispatch();
  const completedTasks = useSelector(completeSelector);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const tasksSection = document.querySelector(".tasksSection");
    const tasksItems = document.querySelectorAll(".tasks li.completed");

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
        {completedTasks.map((task) => {
          return (
            <li className="completed" key={task.id}>
              <div className="activeInputSec">
                <input
                  type="checkbox"
                  onChange={() => dispatch(toggleCompleteTask(task.id))}
                  checked
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
