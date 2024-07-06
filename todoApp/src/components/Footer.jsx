import { useDispatch } from "react-redux";
import { showActive, showAll, showCompleted } from "../store/actions/actions";

export default function Footer() {
  const dispatch = useDispatch();
  return (
    <footer>
      <p>{} items left</p>
      <div>
        <button
          onClick={() => {
            dispatch(showAll());
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            dispatch(showActive());
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            dispatch(showCompleted());
          }}
        >
          Completed
        </button>
      </div>
    </footer>
  );
}
