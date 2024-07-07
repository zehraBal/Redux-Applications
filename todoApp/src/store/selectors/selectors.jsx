export const showSelector = (store) => store.show;
export const tasksSelector = (store) => store.todo.tasks;
export const completeSelector = (store) => store.todo.complete;

/* Note to myself: Separating selectors from components is beneficial, especially in large projects where things are more complex. 
If a change needs to be made to these selectors, it can be challenging to find each instance and apply the changes individually. 
By defining selectors separately, you can make a change in one place, and it will apply to all of them.*/
