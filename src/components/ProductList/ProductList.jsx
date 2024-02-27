import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export const ProductList = () => {
  return (
    <div className={styles.productList}>
      <ProductCard />
    </div>
  );
};
