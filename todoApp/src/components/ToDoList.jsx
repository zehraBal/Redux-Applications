import { useSelector, useDispatch } from "react-redux";
import { toggleTask } from "../store/actions/actions";

export default function TodoList() {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => {
    return store.todo.tasks;
  });
  console.log("active:", tasks);

  return (
    <ul>
      <h6>Active Tasks</h6>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <div>
              <input
                type="checkbox"
                onChange={() => {
                  dispatch(toggleTask(task.id));
                }}
              />
              <label>{task.content}</label>
              <button>x</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
