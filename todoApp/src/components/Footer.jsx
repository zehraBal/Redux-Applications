import { useDispatch, useSelector } from "react-redux";
import {
  removeAllTask,
  showActive,
  showAll,
  showCompleted,
} from "../store/actions/actions";

export default function Footer() {
  const dispatch = useDispatch();
  const show = useSelector((store) => store.show);
  const tasks = useSelector((store) => store.todo.tasks);
  const completedTasks = useSelector((store) => store.todo.complete);
  const activeCount = tasks.length;
  const completedCount = completedTasks.length;
  const allCount = activeCount + completedCount;
  return (
    <footer className="footer">
      <p>
        {show.all && allCount}
        {show.completed && completedCount}
        {show.active && activeCount} items left
      </p>
      <div>
        <button
          className="footerBtn"
          onClick={() => {
            dispatch(showAll());
          }}
        >
          All
        </button>
        <button
          className="footerBtn"
          onClick={() => {
            dispatch(showActive());
          }}
        >
          Active
        </button>
        <button
          className="footerBtn"
          onClick={() => {
            dispatch(showCompleted());
          }}
        >
          Completed
        </button>
      </div>
      {show.completed && (
        <button className="clearBtn" onClick={() => dispatch(removeAllTask())}>
          Clear completed
        </button>
      )}
    </footer>
  );
}
