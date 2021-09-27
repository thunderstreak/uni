export const SESSION_STORAGE = 'SESSION_STORAGE'
export const LCOAl_STORAGE = 'LCOAl_STORAGE' 

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

export const setStorageSync = (key = '', data = '') => {
	if (key && data) {
		uni.setStorageSync(key, data);
	}
}

export const getStorageSync = (key = '') => {
	try {
		const value = uni.getStorageSync(key);
		if (value) {
			return value
		}
	} catch (e) {
		console.log('getStorageSync:', e);
	}
}

export const removeStorageSync = (key = '') => {
	try {
		return uni.removeStorageSync(key);
	} catch (e) {
	  console.log('removeStorageSync:', e);
	}
}

export const getStorageInfoSync = () => {
	try {
		return uni.getStorageInfoSync();
	} catch (e) {
		console.log('getStorageInfoSync:', e);
	}
}

export const clearStorageSync = () => {
	try {
		uni.clearStorageSync();
	} catch (e) {
	  console.log('clearStorageSync:', e);
	}
}