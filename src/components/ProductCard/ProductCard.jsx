import styles from './ProductCard.module.css';

export const ProductCard = ({ id, product, price, brand }) => {
  return (
    <div className={styles.productCard}>
      <h6>{product}</h6>
      <span>{`${price} руб.`}</span>
      <span>{brand || 'No brand'}</span>
      <span>{id}</span>
    </div>
  );
};
