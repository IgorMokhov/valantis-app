import { useEffect } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { BASE_URL, password } from '../../api/apiConfig';
import { createAuthHash } from '../../api/auth';
import styles from './ProductList.module.css';

export const ProductList = ({
  products,
  setProducts,
  isLoading,
  setIsLoading,
}) => {
  const getProductsIds = async () => {
    setIsLoading(true);
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

      return data.result;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getProducts = async (ids) => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const ids = await getProductsIds();
      if (ids && ids.length > 0) {
        await getProducts(ids);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && <h2 className={styles.loader}>Loading...</h2>}

      {products && (
        <div className={styles.productList}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </>
  );
};
