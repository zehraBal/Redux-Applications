import {
  ADD_TASK,
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED,
  TOGGLE_TASK,
} from "../actions/actions";

const initialState = {
  tasks: [
    {
      id: "1",
      content: "Learn React",
    },
    {
      id: "2",
      content: "Read a book",
    },
  ],
  complete: [],
  all: [
    {
      id: "1",
      content: "Learn React",
    },
    {
      id: "2",
      content: "Read a book",
    },
  ],
};
const initialShow = {
  all: true,
  active: false,
  completed: false,
};
const idCreator = () => {
  return Math.floor(Math.random() * 1000 + 1);
};
export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const newTask = {
        id: idCreator().toString(),
        content: action.payload,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        all: [...state.all, newTask],
      };

    case TOGGLE_TASK:
      const item = state.tasks.find((tsk) => tsk.id === action.payload);
      if (!item) return state;
      const updatedTasks = state.tasks.filter(
        (tsk) => tsk.id !== action.payload
      );
      return {
        ...state,
        tasks: updatedTasks,
        complete: [...state.complete, item],
      };
    default:
      return state;
  }
};

export const showToDoReducer = (state = initialShow, action) => {
  switch (action.type) {
    case SHOW_COMPLETED:
      return { all: false, active: false, completed: true };
    case SHOW_ACTIVE:
      return { all: false, active: true, completed: false };
    case SHOW_ALL:
      return { all: true, active: false, completed: false };
    default:
      return state;
  }
};
