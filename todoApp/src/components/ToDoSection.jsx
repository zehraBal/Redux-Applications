import { useSelector } from "react-redux";
import AllTasks from "./AllTasks";
import CompletedTasks from "./CompletedTasks";
import TodoList from "./ToDoList";
import { showSelector } from "../store/selectors/selectors";

export default function ToDoSection() {
  const show = useSelector(showSelector);
  console.log("show:", show);
  return (
    <div className="todoSection">
      {show.all && <AllTasks />}
      {show.completed && <CompletedTasks />}
      {show.active && <TodoList />}
    </div>
  );
}
