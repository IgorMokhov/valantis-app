import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.css';

export const ProductsList = () => {
  return (
    <div className={styles.productsList}>
      <ProductCard />
    </div>
  );
};
