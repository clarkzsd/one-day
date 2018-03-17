export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (err) {}
};

export const loadTodoList = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    return serializedState === null ? [] : JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};
