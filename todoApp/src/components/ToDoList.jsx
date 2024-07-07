import { useSelector, useDispatch } from "react-redux";
import { toggleTask, removeTask } from "../store/actions/actions";
import { tasksSelector } from "../store/selectors/selectors";

export default function TodoList() {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelector);
  console.log("active:", tasks);

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
