import { BASE_URL, limitProducts } from './apiConfig';
import { createAuthHash } from './auth';

// Fetches a list of product IDs from the server
export const getProductsIds = async () => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': createAuthHash(import.meta.env.VITE_PASSWORD),
    },
    body: JSON.stringify({
      action: 'get_ids',
      params: {
        limit: limitProducts,
      },
    }),
  });
  const data = await response.json();

  return data.result;
};

// Fetches a list of products by their IDs
export const getProductsByIds = async (ids) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': createAuthHash(import.meta.env.VITE_PASSWORD),
    },
    body: JSON.stringify({
      action: 'get_items',
      params: {
        ids: ids,
        limit: limitProducts,
      },
    }),
  });
  const data = await response.json();

  return data.result;
};

// Fetches product IDs based on given filter criteria (title, price, brand)
export const getProductsIdsByFilter = async (filter) => {
  let params = {};
  if (filter.title) params = { product: filter.title };
  if (filter.price) params = { price: parseInt(filter.price, 10) };
  if (filter.brand) params = { brand: filter.brand };

  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': createAuthHash(import.meta.env.VITE_PASSWORD),
    },
    body: JSON.stringify({
      action: 'filter',
      params,
    }),
  });
  const data = await response.json();
  return data.result;
};

// Intersects multiple arrays of IDs, returning only those IDs that are present in every array
export const intersectIds = (...ids) => {
  const checkedIds = ids.filter((id) => id !== undefined);

  if (checkedIds.length === 0) return [];
  if (checkedIds.length === 1) return checkedIds[0];

  // Reduce the arrays to a single array containing only the common elements
  return checkedIds.reduce((prev, current) => {
    return prev.filter((element) => current.includes(element));
  });
};
