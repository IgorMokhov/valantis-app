import { useEffect } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export const ProductList = ({ products, isLoading, fetchAllProducts }) => {
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <h2 className={styles.loader}>Loading...</h2>
      ) : (
        <div className={styles.productList}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </>
  );
};
