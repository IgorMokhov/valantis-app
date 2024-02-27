import CryptoJS from 'crypto-js';

export const createAuthHash = (password) => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const authText = `${password}_${date}`;

  return CryptoJS.MD5(authText).toString();
};
