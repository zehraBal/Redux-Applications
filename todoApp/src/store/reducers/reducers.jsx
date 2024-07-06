import {
  ADD_TASK,
  REMOVE_ALL_TASK,
  REMOVE_TASK,
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED,
  TOGGLE_TASK,
  TOGGLE_COMPLETE_TASK,
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
    case TOGGLE_COMPLETE_TASK:
      const it = state.complete.find((tsk) => tsk.id === action.payload);
      if (!it) return state;
      const updatedCompleteTasks = state.complete.filter(
        (tsk) => tsk.id !== action.payload
      );
      return {
        ...state,
        complete: updatedCompleteTasks,
        tasks: [...state.tasks, it],
      };
    case REMOVE_ALL_TASK:
      return { ...state, complete: [] };

    case REMOVE_TASK:
      const currentTasks = state.tasks.filter(
        (tsk) => tsk.id !== action.payload
      );
      const completeCurrent = state.complete.filter(
        (tsk) => tsk.id !== action.payload
      );
      return {
        ...state,
        tasks: currentTasks,
        complete: completeCurrent,
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
