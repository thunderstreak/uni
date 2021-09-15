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
