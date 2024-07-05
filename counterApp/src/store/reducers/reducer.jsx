import { arttir, azalt, customArttir, reset } from "../actions/actions";

const initialCounter = {
  counter: 0,
};

export const counterReducer = (state = initialCounter, action) => {
  switch (action.type) {
    case arttir:
      return { ...state, counter: state.counter + 1 };
    case azalt:
      return { ...state, counter: state.counter - 1 };
    case customArttir:
      return { ...state, counter: state.counter + action.payload };
    case reset:
      return initialCounter;
    default:
      return state;
  }
};
