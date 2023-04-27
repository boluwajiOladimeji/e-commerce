import './sidebar.js';
import { fetchProducts } from './getProducts.js';
import { setupStore } from './setupStore.js';
import { getElement } from './store.js';

const products = async function () {
  const data = await fetchProducts();
  setupStore(data);
  console.log(data);
  displayProducts(getElement('.featured-center'), data);
  return data;
};

products();

const displayProducts = function (element, data) {
  data.filter((product, idx) => {
    if (idx < 3) {
      console.log(product.image);
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

            <button class="addCart" data-id="1">add to cart</button>
          </div>
        </article>
        `;
      element.insertAdjacentHTML('beforeend', html);
    }
  });
};
