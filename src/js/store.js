export const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

export const getStorageItem = function (data) {
  let storeItem = localStorage.getItem(data);
  if (storeItem) {
    storeItem = JSON.parse(localStorage.getItem(data));
  } else {
    storeItem = [];
  }
  return storeItem;
};

export const setStorageItem = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
