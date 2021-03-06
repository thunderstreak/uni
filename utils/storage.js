import { SESSION_STORAGE, LCOAl_STORAGE } from '@/constant/index'
import { setTryCatchDecorator } from '@/decorator/ordinary'
import { toastError } from '@/utils/changeover'
// get cache
export function getKey(field, storage = SESSION_STORAGE) {
  try {
    if (storage === LCOAl_STORAGE) {
      return localStorage[field] ? JSON.parse(localStorage[field]) : null
    }
    return sessionStorage[field] ? JSON.parse(sessionStorage[field]) : null
  } catch (e) {
    new Error('storage is parse fail')
    return null
  }
}

// set cache
export function setKey(field, value, storage = SESSION_STORAGE) {
  try {
    if (storage === LCOAl_STORAGE) {
      return localStorage.setItem(field, JSON.stringify(value))
    }
    return sessionStorage.setItem(field, JSON.stringify(value))
  } catch (e) {
    new Error('storage is stringify fail')
    return null
  }
}

// clear cache
export function clearKey() {
  localStorage.clear()
  sessionStorage.clear()
}

export default new class Storage {
  setStorageSync(key = '', data = '') {
    if (key && data) {
    	uni.setStorageSync(key, data);
    }
  }

  @setTryCatchDecorator(toastError)
  getStorageSync(key = '') {
    const value = uni.getStorageSync(key);
    if (value) {
    	return value
    }
  }

  @setTryCatchDecorator(toastError)
  removeStorageSync(key = '') {
  	return uni.removeStorageSync(key);
  }

  @setTryCatchDecorator(toastError)
  getStorageInfoSync() {
  	return uni.getStorageInfoSync();
  }

  @setTryCatchDecorator(toastError)
  clearStorageSync() {
  	uni.clearStorageSync();
  }
}()
