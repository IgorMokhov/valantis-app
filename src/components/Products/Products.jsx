import { ProductFilters } from '../ProductFilter/ProductFilters';
import { ProductList } from '../ProductList/ProductList';
import { CustomButton } from '../../UI/CustomButton/CustomButton';
import { useProducts } from './useProducts';
import styles from './Products.module.css';

export const Products = () => {
  const {
    products,
    isLoading,
    error,
    isFiltered,
    currentPage,
    totalProductsCount,
    maxPages,
    setIsLoading,
    setIsFiltered,
    setError,
    setCurrentPage,
    setTotalProductsCount,
    setProducts,
    fetchAllProducts,
    handleNextPage,
    handlePreviousPage,
  } = useProducts(); // Using the custom hook

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
