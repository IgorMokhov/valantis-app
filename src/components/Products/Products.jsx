import { useState } from 'react';
import { ProductFilters } from '../ProductFilter/ProductFilters';
import { ProductList } from '../ProductList/ProductList';
import { getProductsByIds, getProductsIds } from '../../api/apiUtils';
import { checkUniqueProducts, getOffset } from '../../utils/productsUtils';
import { CustomButton } from '../../UI/CustomButton/CustomButton';
import { limitProducts } from '../../api/apiConfig';
import styles from './Products.module.css';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false); // State to track filters

  const fetchAllProducts = async () => {
    setIsLoading(true);

    try {
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

  return (
    <div className={styles.products}>
      <ProductFilters
        currentPage={currentPage}
        isFiltered={isFiltered}
        setProducts={setProducts}
        setIsLoading={setIsLoading}
        setCurrentPage={setCurrentPage}
        setIsFiltered={setIsFiltered}
        fetchAllProducts={fetchAllProducts}
      />

      <ProductList
        products={products}
        currentPage={currentPage}
        isLoading={isLoading}
        isFiltered={isFiltered}
        fetchAllProducts={fetchAllProducts}
      />

      <div className={styles.paginationBtns}>
        <CustomButton onClick={handlePreviousPage}>Back</CustomButton>
        <span>{currentPage}</span>
        <CustomButton onClick={handleNextPage}>Next</CustomButton>
      </div>
    </div>
  );
};
