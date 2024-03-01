import { useState } from 'react';
import { ProductFilters } from '../ProductFilter/ProductFilters';
import { ProductList } from '../ProductList/ProductList';
import styles from './Products.module.css';
import { getProductsByIds, getProductsIds } from '../../api/apiUtils';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const ids = await getProductsIds();
      if (ids && ids.length > 0) {
        const products = await getProductsByIds(ids);
        setProducts(products);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.products}>
      <ProductFilters
        setProducts={setProducts}
        setIsLoading={setIsLoading}
        fetchAllProducts={fetchAllProducts}
      />
      <ProductList
        products={products}
        setProducts={setProducts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        fetchAllProducts={fetchAllProducts}
      />
    </div>
  );
};
