import { useDispatch, useSelector } from "react-redux";
import { removeTask, toggleCompleteTask } from "../store/actions/actions";

export default function CompletedTasks() {
  const dispatch = useDispatch();
  const CompletedTasks = useSelector((store) => store.todo.complete);
  return (
    <div className="tasksSection">
      <ul className="tasks">
        {CompletedTasks.map((task) => {
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
