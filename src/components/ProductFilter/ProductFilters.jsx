import { useEffect, useState } from 'react';
import { getProductsByIds, getProductsIdsByFilter } from '../../api/apiUtils';
import {
  checkUniqueProducts,
  getOffset,
  intersectIds,
} from '../../utils/productsUtils';
import { CustomButton } from '../../UI/CustomButton/CustomButton';
import { limitProducts } from '../../api/apiConfig';
import styles from './ProductFilters.module.css';

export const ProductFilters = ({
  currentPage,
  isFiltered,
  setProducts,
  setIsLoading,
  setCurrentPage,
  setIsFiltered,
  fetchAllProducts,
}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');

  const resetHandler = () => {
    setTitle('');
    setPrice('');
    setBrand('');
    setIsFiltered(false); // Reset the flag when resetting filters
    setCurrentPage(1);
    fetchAllProducts();
  };

  const fetchFilteredProducts = async () => {
    setIsLoading(true);
    setIsFiltered(true); // Set the flag when filters are applied

    try {
      let idsByTitleFilter, idsByPriceFilter, idsByBrandFilter;
      // Getting filtered identifiers for each filter
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

      const offset = getOffset(currentPage, limitProducts);
      // Fetch filteredProducts based on the calculated offset and limit for pagination
      const filteredProducts = await getProductsByIds(
        intersectedIds.slice(offset, offset + limitProducts)
      );
      setProducts(checkUniqueProducts(filteredProducts));
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      if (!error.isRetry) {
        console.log('Retrying...');
        error.isRetry = true;
        await fetchFilteredProducts(); // // Recursive call on error
      }

      setIsLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchFilteredProducts();
  };

  // Call fetchFilteredProducts only if filters are active
  useEffect(() => {
    if (isFiltered) {
      fetchFilteredProducts();
    }
  }, [currentPage]);

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
      <CustomButton className={styles.submitBtn} type="submit">
        Search
      </CustomButton>
      <CustomButton className={styles.resetBtn} onClick={resetHandler}>
        Reset
      </CustomButton>
    </form>
  );
};
