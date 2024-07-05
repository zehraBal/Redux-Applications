import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  counterArttir,
  counterAzalt,
  counterReset,
} from "../store/actions/actions";

export default function Counter() {
  const countValue = useSelector((store) => store.counter);
  const dispatch = useDispatch();

  return (
    <div className="counterComp">
      <div className="counterVal">
        <p>Counter: {countValue}</p>
      </div>
      <div className="counterBtns">
        <button onClick={() => dispatch(counterArttir())}> + </button>
        <button onClick={() => dispatch(counterReset())}> Reset </button>

        <button onClick={() => dispatch(counterAzalt())}> - </button>
      </div>
    </div>
  );
}
