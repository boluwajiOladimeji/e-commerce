export const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

const getStorageItem = function (data) {
  let storeItem = localStorage.getItem(data);
  if (storeItem) {
    storeItem = JSON.parse(localStorage.getItem(data));
  } else {
    storeItem = [];
  }
};

const setStorageItem = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export { getStorageItem, setStorageItem };
