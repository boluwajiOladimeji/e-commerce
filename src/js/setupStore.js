import { setStorageItem, getStorageItem } from './store.js';

let store = getStorageItem('store');

const setupStore = (products) => {
  store = products.map((product) => product);
  setStorageItem('store', store);
};

export { setupStore };
