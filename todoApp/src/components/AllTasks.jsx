import { useDispatch, useSelector } from "react-redux";

export default function AllTasks() {
  const dispatch = useDispatch();
  const allTask = useSelector((store) => store.todo.all);
  console.log("all:", allTask);
  return (
    <ul>
      <h6>All Tasks</h6>
      {allTask.map((task) => {
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
