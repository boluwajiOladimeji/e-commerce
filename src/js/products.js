import { store, setupStore } from './setupStore.js';
import { getElement, getStorageItem } from './store.js';
import { fetchProducts } from './getProducts.js';
// import { getSearchValue } from './index.js';
// import { homeSearchEl, headerSearchEl, myVal } from './index.js';

const productsCategoriesEl = getElement('.product-categories');
const productsContainerEl = getElement('.products-container');
const searchInputEl = getElement('.search-input');

const checkSearch = function () {
  let searchValue = getStorageItem('searchValue');
  if (!searchValue) return;
  console.log(searchValue);
  let filteredProducts = store.filter((product) =>
    product.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  if (filteredProducts.length < 1) {
    productsContainerEl.innerHTML = `<h3>Sorry, No item matched your search!!!</h3>`;
  } else {
    displayProducts(getElement('.products-container'), filteredProducts);
  }
  localStorage.removeItem(searchValue);
};

// getSearchValue();

const init = async () => {
  if (store.length < 1) {
    const products = await fetchProducts();
    setupStore(products);
  }

  displayProducts(getElement('.products-container'), store);
  setCategories(store);
  setSearch();
  checkSearch();
};

const displayProducts = function (element, data) {
  const html = data
    .map((product) => {
      //   console.log(product.image);
      return `
             <article>
          <a
            href="./product.html?id=${product.id}"
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
                ${product.rating.rate} <span class="people-count">(${
        product.rating.count
      })</span> rating
              </p>
              <p class="price">$${product.price.toFixed(2)}</p>
            </div>

            <button class="addCart" data-id="1">add to cart</button>
          </div>
        </article>
        `;
    })
    .join('');
  element.innerHTML = html;
};

const setCategories = function (store) {
  const categories = [
    'All',
    ...new Set(store.map((product) => product.category)),
  ];
  console.log(categories);
  categories.map((category) => {
    let html = `<span class="btn-category" data-category="${category}">
              ${category.toUpperCase()}
            </span>`;
    productsCategoriesEl.insertAdjacentHTML('beforeend', html);
  });
};

productsCategoriesEl.addEventListener('click', (e) => {
  const category = e.target.dataset.category;
  console.log(category);
  let filteredProducts = [];
  if (!category) return;
  if (category === 'All') {
    filteredProducts = [...store];
  } else {
    filteredProducts = store.filter((product) => product.category === category);
  }
  displayProducts(getElement('.products-container'), filteredProducts);
  searchInputEl.value = '';
});

const setSearch = function () {
  searchInputEl.addEventListener('keyup', (e) => {
    let val = searchInputEl.value;
    let filteredProducts = store.filter((product) =>
      product.title.toLowerCase().includes(val.toLowerCase())
    );
    if (filteredProducts.length < 1) {
      productsContainerEl.innerHTML = `<h3>Sorry, No item matched your search!!!</h3>`;
    } else {
      displayProducts(getElement('.products-container'), filteredProducts);
    }
  });
};

init();
