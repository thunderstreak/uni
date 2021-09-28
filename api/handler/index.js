import { LOGIN_INFO } from '@/constant/index';
import Storage from '@/utils/storage';

// set login info to cache
export const handlerGetLoginInfoCache = () => {
  return Storage.getStorageSync(LOGIN_INFO);
};

// fetch login info from the cache
export const handlerSetLoginInfoCache = (res = {}) => {
  Storage.setStorageSync(LOGIN_INFO, res.object);
  return res;
};
