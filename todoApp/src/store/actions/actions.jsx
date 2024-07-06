export const ADD_TASK = "ADD_TASK";
export const REMOVE_ALL_TASK = "REMOVE_ALL_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const TOGGLE_COMPLETE_TASK = "TOGGLE_COMPLETE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const SHOW_COMPLETED = "SHOW_COMPLETED";
export const SHOW_ALL = "SHOW_ALL";
export const SHOW_ACTIVE = "SHOW_ACTIVE";

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const toggleTask = (taskID) => {
  return {
    type: TOGGLE_TASK,
    payload: taskID,
  };
};
export const toggleCompleteTask = (taskID) => {
  return {
    type: TOGGLE_COMPLETE_TASK,
    payload: taskID,
  };
};

export const removeAllTask = () => {
  return {
    type: REMOVE_ALL_TASK,
  };
};
export const removeTask = (removeId) => {
  return { type: REMOVE_TASK, payload: removeId };
};

export const showCompleted = () => {
  return { type: SHOW_COMPLETED };
};
export const showAll = () => {
  return { type: SHOW_ALL };
};

export const showActive = () => {
  return { type: SHOW_ACTIVE };
};
