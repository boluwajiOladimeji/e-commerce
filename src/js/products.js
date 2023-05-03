import { store, setupStore } from './setupStore.js';
import { getElement, getStorageItem } from './store.js';
import { fetchProducts } from './getProducts.js';

const productsCategoriesEl = getElement('.product-categories');

const init = async () => {
  if (store.length < 1) {
    const products = await fetchProducts();
    setupStore(products);
  }

  displayProducts(getElement('.products-container'), store);
  setCategories(store);
};

const displayProducts = function (element, data) {
  data.forEach((product) => {
    //   console.log(product.image);
    const html = `
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
    element.insertAdjacentHTML('beforeend', html);
  });
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

init();
