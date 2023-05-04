import './sidebar.js';
import { fetchProducts } from './getProducts.js';
import { setupStore, store } from './setupStore.js';
import { getElement, setStorageItem } from './store.js';
import './setUpCart.js';
import { addToCart } from './setUpCart.js';

const homeSearchEl = getElement('.home-search');
const headerSearchEl = getElement('.header-search');
const featuredCenter = getElement('.featured-center');
const nav = getElement('.nav');

const products = async function () {
  const data = await fetchProducts();
  setupStore(data);
  //   console.log(data);
  displayProducts(getElement('.featured-center'), data);
  return data;
};

products();

const displayProducts = function (element, data) {
  data.filter((product, idx) => {
    if (idx < 3) {
      //   console.log(product.image);
      const html = `
             <article>
          <a
            href="./src/pages/product.html?id=${product.id}"
            rel="noopener noreferrer"
            class="product"
            data-id="${product.id}">
            <div class="img-container">
              <img
                src="${product.image}"
                alt="shirt"
                class="product-img" />
            </div>

            <h3 class="product-title">${product.title}</h3>
          </a>

          <div class="product-text">
            <p class="product-category">${product.category}</p>
            <div class="price rating product-details">
              <p class="rating">
                ${product.rating.rate} <span class="people-count">(${product.rating.count})</span> rating
              </p>
              <p class="price">$${product.price}</p>
            </div>

            <button class="addCart" data-id="${product.id}">add to cart</button>
          </div>
        </article>
        `;
      element.insertAdjacentHTML('beforeend', html);
    }
  });
};

const getSearchValue = function () {
  // searchInputEl.addEventListener('click');
  let value;
  homeSearchEl.addEventListener('click', (e) => {
    value = headerSearchEl.value.toLowerCase();
    setStorageItem('searchValue', value);
    headerSearchEl.value = '';
  });
};

headerSearchEl.addEventListener('keyup', (e) => {
  let value = headerSearchEl.value.toLowerCase();
  console.log(value);
  setStorageItem('searchValue', value);
  // headerSearchEl.value = '';
});

getSearchValue();

window.addEventListener('scroll', (e) => {
  const navHeight = nav.getBoundingClientRect().height;
  const scrollHeight = window.pageYOffset;

  if (scrollHeight > navHeight) {
    nav.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
  }
});

featuredCenter.addEventListener('click', (e) => {
  if (e.target.classList.contains('addCart')) {
    const id = +e.target.dataset.id;
    addToCart(id);
  }
});

// export { homeSearchEl, headerSearchEl, myVal };
