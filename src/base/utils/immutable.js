export const updateObjectInArray = (array, key, action) => {
  return array.map((item) => {
    if (item[key] !== action.payload[key]) {
      return item;
    }

    return {
      ...item,
      ...action.payload
    };
  });
};
