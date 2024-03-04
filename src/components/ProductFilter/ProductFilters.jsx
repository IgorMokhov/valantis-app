import { useState } from 'react';
import { getProductsByIds, getProductsIdsByFilter } from '../../api/apiUtils';
import { checkUniqueProducts, intersectIds } from '../../utils/productsUtils';
import styles from './ProductFilters.module.css';

export const ProductFilters = ({
  setProducts,
  setIsLoading,
  fetchAllProducts,
}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');

  const resetHandler = () => {
    setTitle('');
    setPrice('');
    setBrand('');
    fetchAllProducts();
  };

  const fetchFilteredProducts = async () => {
    setIsLoading(true);

    try {
      let idsByTitleFilter, idsByPriceFilter, idsByBrandFilter;

      if (title.trim()) {
        idsByTitleFilter = await getProductsIdsByFilter({ title });
      }
      if (price.trim()) {
        idsByPriceFilter = await getProductsIdsByFilter({ price });
      }
      if (brand.trim()) {
        idsByBrandFilter = await getProductsIdsByFilter({ brand });
      }

      const intersectedIds = intersectIds(
        idsByTitleFilter,
        idsByPriceFilter,
        idsByBrandFilter
      );

      const filteredProducts = await getProductsByIds(intersectedIds);
      setProducts(checkUniqueProducts(filteredProducts));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    fetchFilteredProducts();
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
        type="number"
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
      <button className={styles.submitBtn} type="submit">
        Search
      </button>
      <button className={styles.resetBtn} onClick={resetHandler}>
        Reset
      </button>
    </form>
  );
};
