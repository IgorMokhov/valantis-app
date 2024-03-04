// Intersects multiple arrays of IDs, returning only those IDs that are present in every array
export const intersectIds = (...ids) => {
  const checkedIds = ids.filter((id) => id !== undefined);

  if (checkedIds.length === 0) return [];
  if (checkedIds.length === 1) return checkedIds[0];

  // Reduce the arrays to a single array containing only the common elements
  return checkedIds.reduce((prev, current) => {
    return prev.filter((element) => current.includes(element));
  });
};

// Checking for duplicate products
export const checkUniqueProducts = (products) => {
  const checkedProducts = products.filter(
    (product, index, array) =>
      index === array.findIndex((el) => el['id'] === product['id'])
  );

  return checkedProducts;
};
