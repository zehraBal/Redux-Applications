import CompletedTasks from "./CompletedTasks";
import ToDoList from "./ToDoList";

export default function AllTasks() {
  return (
    <div className="tasksSection">
      <ToDoList />
      <CompletedTasks />
    </div>
  );
}
