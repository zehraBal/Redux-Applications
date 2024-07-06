import { useSelector } from "react-redux";
import AllTasks from "./AllTasks";
import CompletedTasks from "./CompletedTasks";
import TodoList from "./ToDoList";

export default function ToDoSection() {
  const show = useSelector((store) => store.show);
  console.log("show:", show);
  return (
    <div>
      {show.all && <AllTasks />}
      {show.completed && <CompletedTasks />}
      {show.active && <TodoList />}
    </div>
  );
}
