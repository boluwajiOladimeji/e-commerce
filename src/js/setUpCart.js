import { getElement } from './store.js';
import { getStorageItem, setStorageItem } from './store.js';
import { store } from './setupStore.js';

let cart = getStorageItem('cart');
const itemCount = getElement('.item-count');

function addToCart(id) {
  let product = cart.find((product) => product.id === id);
  if (!product) {
    let item = store.find((pro) => pro.id === id);
    item = { ...item, count: 1 };
    cart.push(item);
  } else {
    product.count++;
  }
  setStorageItem('cart', cart);
  displayItemCount();
}

function displayItemCount() {
  let count = cart.reduce((acc, curr) => {
    acc += curr.count;
    return acc;
  }, 0);
  itemCount.textContent = count;
}

function removeItem(id) {
  cart = cart.filter((product) => product.id !== id);
}

function init() {
  displayItemCount();
}

init();

export { addToCart, removeItem, cart, displayItemCount };
