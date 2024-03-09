import { useEffect, useState } from 'react';
import { limitProducts } from '../../api/apiConfig';
import {
  getProductsByIds,
  getProductsIds,
  getTotalProductsCount,
} from '../../api/apiUtils';
import { checkUniqueProducts, getOffset } from '../../utils/productsUtils';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // for form validation
  const [isFiltered, setIsFiltered] = useState(false); // state to track filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [maxPages, setMaxPages] = useState(1);

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

  return {
    products,
    isLoading,
    error,
    isFiltered,
    currentPage,
    totalProductsCount,
    maxPages,
    setIsLoading,
    setError,
    setIsFiltered,
    setCurrentPage,
    setTotalProductsCount,
    setProducts,
    fetchAllProducts,
    handleNextPage,
    handlePreviousPage,
  };
};
