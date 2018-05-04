import fetch from '../utils/fetchUtils';

export const getProducts = () => fetch('http://localhost:8080/api/getProducts/', 'GET');

export const addToCart = (cartId, productId, quantity) => fetch(
  'http://localhost:8080/api/addCartProduct/',
  'POST',
  JSON.stringify({
    cartId,
    productId,
    quantity
  })
);

export const getMoreExpensiveProducts = (dni) => fetch('http://localhost:8080/api/getMoreExpensiveProducts/', 'POST', JSON.stringify({ dni }));
