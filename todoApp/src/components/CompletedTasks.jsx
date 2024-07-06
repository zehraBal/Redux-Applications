import { useSelector } from "react-redux";

export default function CompletedTasks() {
  const CompletedTasks = useSelector((store) => store.todo.complete);
  return (
    <div>
      <h6>Completed</h6>
      <ul>
        {CompletedTasks.map((task) => {
          return (
            <li className="completed" key={task.id}>
              <div>
                <input type="checkbox" />
                <label>{task.content}</label>
                <button>x</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
