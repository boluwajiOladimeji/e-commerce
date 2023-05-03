const fetchProducts = async function () {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  return data;
};

export { fetchProducts };
