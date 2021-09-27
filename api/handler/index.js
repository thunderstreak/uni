import { LOGIN_INFO } from '@/constant/index.js';
import { setStorageSync, getStorageSync } from '@/utils/storage.js';

// set login info to cache
export const handlerGetLoginInfoCache = () => {
  return getStorageSync(LOGIN_INFO);
};

// fetch login info from the cache
export const handlerSetLoginInfoCache = (res = {}) => {
  setStorageSync(LOGIN_INFO, res.data);
  return res;
}; 
