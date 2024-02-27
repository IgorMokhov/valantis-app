import styles from './ProductCard.module.css';

export const ProductCard = ({ id, product, price, brand }) => {
  return (
    <div className={styles.productCard}>
      <h6>{product}</h6>
      <p>{id}</p>
      <p>{price}</p>
      <p>{brand}</p>
    </div>
  );
};
