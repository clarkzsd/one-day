export const saveData = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (err) {}
};

export const getData = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData === null ? [] : JSON.parse(serializedData);
  } catch (err) {
    return [];
  }
};
