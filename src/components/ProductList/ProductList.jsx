import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';
import { BASE_URL, password } from '../../api/apiConfig';
import { createAuthHash } from '../../api/auth';

export const ProductList = (props) => {
  const { products, setProducts, isLoading, setIsLoading } = props;
  console.log(products);

  const getProductsIds = async () => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': createAuthHash(password),
        },
        body: JSON.stringify({
          action: 'get_ids',
          params: {
            limit: 50,
          },
        }),
      });
      const data = await response.json();
      await getProducts(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (ids) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': createAuthHash(password),
        },
        body: JSON.stringify({
          action: 'get_items',
          params: {
            ids: ids,
          },
        }),
      });
      const data = await response.json();
      setProducts(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsIds();
  }, []);

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
