import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  counterArttir,
  counterAzalt,
  counterCustom,
  counterReset,
} from "../store/actions/actions";

export default function Counter() {
  const [amount, setAmount] = useState(0);
  console.log(amount);
  const countValue = useSelector((store) => store.counter);
  const dispatch = useDispatch();

  return (
    <div className="counterComp">
      <div className="counterVal">
        <p>Counter: {countValue}</p>
      </div>
      <div className="counterBtns">
        <button
          className="counterBtn"
          onClick={() => dispatch(counterArttir())}
        >
          {" "}
          +{" "}
        </button>
        <button
          className="counterBtn"
          onClick={() => {
            dispatch(counterReset());
            setAmount(0);
          }}
        >
          {" "}
          Reset{" "}
        </button>

        <button className="counterBtn" onClick={() => dispatch(counterAzalt())}>
          {" "}
          -{" "}
        </button>
      </div>
      <div className="customIncrement">
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        />
        <button
          className="counterBtn"
          onClick={() => {
            dispatch(counterCustom(amount));
          }}
        >
          Increase
        </button>
      </div>
    </div>
  );
}
