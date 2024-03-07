import { useEffect, useState } from 'react';
import { ProductFilters } from '../ProductFilter/ProductFilters';
import { ProductList } from '../ProductList/ProductList';
import { checkUniqueProducts, getOffset } from '../../utils/productsUtils';
import { CustomButton } from '../../UI/CustomButton/CustomButton';
import { limitProducts } from '../../api/apiConfig';
import {
  getProductsByIds,
  getProductsIds,
  getTotalProductsCount,
} from '../../api/apiUtils';
import styles from './Products.module.css';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // for form validation
  const [isFiltered, setIsFiltered] = useState(false); // state to track filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [maxPages, setMaxPages] = useState(1);

  console.log(products);
  console.log(totalProductsCount);
  console.log(maxPages);
  console.log(currentPage);

  const fetchAllProducts = async () => {
    setIsLoading(true);
    setError('');

    try {
      const totalCount = await getTotalProductsCount();
      setTotalProductsCount(totalCount);

      const offset = getOffset(currentPage, limitProducts);
      const ids = await getProductsIds(offset);

      if (ids && ids.length > 0) {
        const fetchedProducts = await getProductsByIds(ids);
        setProducts(checkUniqueProducts(fetchedProducts));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);

      if (!error.isRetry) {
        console.log('Retrying...');
        error.isRetry = true;
        await fetchAllProducts(); // Recursive call on error
      }

      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate maxPages based on total count and limit
  useEffect(() => {
    const calculatedMaxPages = Math.ceil(totalProductsCount / limitProducts);
    setMaxPages(calculatedMaxPages);
  }, [totalProductsCount, limitProducts]);

  return (
    <div className={styles.products}>
      <ProductFilters
        currentPage={currentPage}
        isFiltered={isFiltered}
        error={error}
        setError={setError}
        setProducts={setProducts}
        setIsLoading={setIsLoading}
        setCurrentPage={setCurrentPage}
        setIsFiltered={setIsFiltered}
        setTotalProductsCount={setTotalProductsCount}
        fetchAllProducts={fetchAllProducts}
      />

      <ProductList
        products={products}
        currentPage={currentPage}
        totalProductsCount={totalProductsCount}
        isLoading={isLoading}
        isFiltered={isFiltered}
        fetchAllProducts={fetchAllProducts}
      />

      <div className={styles.paginationBtns}>
        <CustomButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || isLoading}
        >
          Back
        </CustomButton>
        <span>{currentPage}</span>
        <CustomButton
          onClick={handleNextPage}
          disabled={currentPage === maxPages || !maxPages || isLoading}
        >
          Next
        </CustomButton>
      </div>
    </div>
  );
};
