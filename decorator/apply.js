import { compose, createDecorator } from './core'

// loading decorator
export const getLoadingDecorator = loadingService => createDecorator(fn => (...args) => {
  let instance
  if (loadingService) {
    const { show } = loadingService
    instance = show()
  }
  return fn(...args).finally(() => instance && instance.close())
})

// success or error message notify
export const getMessageDecorator = toast => ({ successMsg, errorMsg, msgKey } = {}) => {
  const alert = typeof window !== 'undefined' ? window.alert : console.log
  const getToast = key => ((typeof toast === 'object' && typeof toast[key] === 'function') ? toast[key] : alert)
  const successToast = getToast('success')
  const errorToast = getToast('error')

  return createDecorator(fn => (...args) => {
    return typeof fn === 'function' && fn(...args).then(res => {
      const msg = msgKey ? res[msgKey] : successMsg
      msg && successToast(msgKey ? res[msgKey] : successMsg)
      return Promise.resolve(res)
    }, err => {
      const msg = msgKey ? err[msgKey] : errorMsg
      msg && errorToast(msgKey ? err[msgKey] : errorMsg)
      return Promise.reject(err)
    })
  })
}

// request log
export const setRequestLogDecorator = createDecorator(fn => async(...args) => {
  const name = fn ? fn.name : 'anonymity'
  console.log(`[log] ${name} before: `, ...args)
  const result = await fn(...args)
  console.log(`[log] ${name} after: `, result)
  return result
})

// mock decorator
export const getMockDecorator = mockFn => createDecorator(apiFn => (...args) => {
  if (process.env.NODE_ENV === 'development') {
    return mockFn(...args)
  }
  return apiFn(...args)
})

// set request header config
export const setRequestHeaderDecorator = (...headers) => createDecorator(fn => (...args) => fn(...[...args, { headers }]))

// set request delay
export const setDelayDecorator = wait => createDecorator(fn => (...args) => {
  if (process.env.NODE_ENV === 'development') {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(fn(...args))
      }, wait || 0)
    })
  }
  return fn(...args)
})

// set response transform to target data
export const setResponseDataDecorator = handle => createDecorator(fn => async(...args) => {
  const data = await fn(...args)
  return handle(data)
})

// del confirm decorator
export const getConfirmDecorator = (...config) => handle => createDecorator(fn => async(...args) => {
  const confirm = await handle(...config)
  if (confirm) {
    const res = fn(...args)
    if (typeof res === 'function') {
      return res()
    }
    return res
  }
})

// set additional extension parameters
export const setExtraExtensionParameterDecorator = (...extras) => createDecorator((fn) => (...args) => fn(...[...args, { extras }]))

// set input promp tips
export const getPromptDecorator = (...config) => (handle, key) => createDecorator(fn => async(...args) => {
  const confirm = await handle(...config)
  if (confirm) {
    const { value } = confirm
    args[0] = { ...args[0], [key]: value }
    return fn(...args)
  }
})

// set response data compose pipe line
export const setComposeDecorator = (...handle) => createDecorator(fn => async(...args) => {
  const data = await fn(...args)
  return compose(...handle)(data)
})
