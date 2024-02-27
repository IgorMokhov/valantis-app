import { ProductFilters } from '../ProductFilter/ProductFilters';
import { ProductList } from '../ProductList/ProductList';
import styles from './Products.module.css';

export const Products = () => {
  return (
    <div className={styles.products}>
      <ProductFilters />
      <ProductList />
    </div>
  );
};
