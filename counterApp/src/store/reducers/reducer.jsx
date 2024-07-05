import { arttir, azalt, reset } from "../actions/actions";

const initialCounter = {
  counter: 0,
};

export const counterReducer = (state = initialCounter, action) => {
  switch (action.type) {
    case arttir:
      return { ...state, counter: state.counter + 1 };
    case azalt:
      return { ...state, counter: state.counter - 1 };
    case reset:
      return initialCounter;
    default:
      return state;
  }
};
