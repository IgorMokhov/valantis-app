import { useState } from 'react';
import { ProductFilters } from '../ProductFilter/ProductFilters';
import { ProductList } from '../ProductList/ProductList';
import styles from './Products.module.css';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  return (
    <div className={styles.products}>
      <ProductFilters />
      <ProductList
        products={products}
        setProducts={setProducts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};
