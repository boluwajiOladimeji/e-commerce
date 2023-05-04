import './sidebar.js';
import './setUpCart.js';
import { addToCart, displayItemCount } from './setUpCart.js';

import { getElement } from './store.js';
const singleProductCenter = getElement('.singleproduct-center');

const fetchProduct = async function () {
  const param = new URLSearchParams(window.location.search);
  const id = param.get('id');
  //   console.log(id);
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  return data;
};

const init = async () => {
  const data = await fetchProduct();
  // console.log(data);
  displaySingleProduct(data);
  displayItemCount();
};

const displaySingleProduct = function (data) {
  let html = ` <img
          src="${data.image}"
          alt=""
          class="singleproduct-img" />
        <div class="singleProduct-text">
          <h2>${data.title}</h2>
          <p>${data.category.toUpperCase()}</p>
          <p>
           ${data.description}
          </p>
          <div>
            <p>$${data.price}</p>
            <button class="addCart" data-id="${data.id}">add to cart</button>
          </div>
        </div>`;

  const element = getElement('.singleproduct-center');
  element.innerHTML = html;
};

singleProductCenter.addEventListener('click', (e) => {
  if (e.target.classList.contains('addCart')) {
    const id = +e.target.dataset.id;
    addToCart(id);
  }
});

window.addEventListener('scroll', (e) => {
  const nav = getElement('.nav');
  const navHeight = nav.getBoundingClientRect().height;
  const scrollHeight = window.pageYOffset;

  if (scrollHeight > navHeight) {
    nav.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
  }
});

init();
