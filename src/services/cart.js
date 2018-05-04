import fetch from '../utils/fetchUtils';

export const createCart = (dni) => fetch('http://localhost:8080/api/create/', 'POST', JSON.stringify({ dni }));

export const fetchCart = (id) => fetch(`http://localhost:8080/api/getCart/${id}`, 'GET');

export const removeProduct = (cartId, productId) => fetch(`http://localhost:8080/api/deleteCartProduct/${cartId}/${productId}`, 'DELETE');

export const payCart = (id) => fetch('http://localhost:8080/api/payCart/', 'POST', JSON.stringify({ id }));

export const removeCart = (id) => fetch(`http://localhost:8080/api/deleteCart/${id}`, 'DELETE');
