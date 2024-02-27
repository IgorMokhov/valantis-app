import { useState } from 'react';
import styles from './ProductFilters.module.css';

export const ProductFilters = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');

  const resetHandler = () => {
    setTitle('');
    setPrice('');
    setBrand('');
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.productFilters} onSubmit={onSubmitHandler}>
      <input
        type="text"
        value={title}
        placeholder="Filter by title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={price}
        placeholder="Filter by price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        value={brand}
        placeholder="Filter by brand"
        onChange={(e) => setBrand(e.target.value)}
      />
      <button className={styles.submitBtn} type="submit">Submit</button>
      <button className={styles.resetBtn} onClick={resetHandler}>Reset</button>
    </form>
  );
};
