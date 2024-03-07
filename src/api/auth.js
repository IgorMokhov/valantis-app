import CryptoJS from 'crypto-js';

// Creates an authentication hash based on the password and the current date
export const createAuthHash = (password) => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const authText = `${password}_${date}`;

  return CryptoJS.MD5(authText).toString();
};
