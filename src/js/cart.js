import './sidebar.js';
import './setUpCart.js';
import { cart, displayItemCount, removeItem } from './setUpCart.js';
import { getElement, setStorageItem } from './store.js';

const cartCenter = getElement('.cart-center');
const totalPriceEl = getElement('.total-price');

function renderCart() {
  if (cart.length < 1) {
    cartCenter.innerHTML = `<h3>No Item added to Cart</h3>`;
  } else {
    let html = cart
      .map((product) => {
        return ` <article class="cart">
          <img
            src="${product.image}"
            alt=""
            class="cart-img" />
          <div class="update-btn">
            <button class="reduce-btn item-btn" data-id="${
              product.id
            }">-</button>
            <span>${product.count}</span>
            <button class="increase-btn item-btn" data-id="${
              product.id
            }">+</button>
          </div>
          <p>$${(product.price * product.count).toFixed(2)}</p>
          <button class="remove-btn item-btn" data-id="${
            product.id
          }"><i class="fa-solid fa-trash"></i></button>
        </article>`;
      })
      .join('');
    cartCenter.innerHTML = html;
  }
}

function checkTotal() {
  let total = cart.reduce((acc, curr) => {
    acc += curr.price * curr.count;
    return acc;
  }, 0);
  totalPriceEl.textContent = `${total.toFixed(2)}`;
}

function increaseCount(id) {
  for (let product of cart) {
    if (product.id === id) product.count++;
  }
}

function decreaseCount(id) {
  for (let product of cart) {
    if (product.id === id) {
      if (product.count === 1) return;
      product.count--;
    }
  }
}

cartCenter.addEventListener('click', (e) => {
  const btn = e.target.closest('.item-btn');
  if (!btn) return;
  const id = +btn.dataset.id;
  if (btn.classList.contains('increase-btn')) {
    increaseCount(id);
  }

  if (btn.classList.contains('reduce-btn')) {
    decreaseCount(id);
  }

  if (btn.classList.contains('remove-btn')) {
    removeItem(id);
    console.log('removeitem');
  }

  setStorageItem('cart', cart);
  checkTotal();
  renderCart();
  displayItemCount();
});

function init() {
  renderCart();
  checkTotal();
}

init();
