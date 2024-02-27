import { Controls } from '../Controls/Controls';
import { ProductsList } from '../ProductsList/ProductsList';
import styles from './Products.module.css';

export const Products = () => {
  return (
    <div className={styles.products}>
      <Controls />
      <ProductsList />
    </div>
  );
};
