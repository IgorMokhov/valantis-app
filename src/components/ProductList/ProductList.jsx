import { useEffect } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export const ProductList = ({
  products,
  currentPage,
  totalProductsCount,
  isLoading,
  isFiltered,
  fetchAllProducts,
}) => {
  // Call fetchAllProducts only if filters are not active
  useEffect(() => {
    if (!isFiltered) {
      fetchAllProducts();
    }
  }, [currentPage]);

  return (
    <>
      {!products.length && !isLoading && (
        <p className={styles.productListInfo}>No products found</p>
      )}

      {!!totalProductsCount && !isLoading && (
        <p className={styles.productListInfo}>
          {`Found ${totalProductsCount} ${
            totalProductsCount > 1 ? 'products' : 'product'
          }`}
        </p>
      )}

      {isLoading ? (
        <p className={styles.loader}>Loading...</p>
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
