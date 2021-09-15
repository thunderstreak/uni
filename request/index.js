import service from './http.js'
import { isArray, isObject, handlerArrayToObject } from '@/decorator/handler'
const { get, post } = service

const handlerRequestParams = (data = []) => {
  // first参数是Api在具体调用的时候传递的
  const [first, ...other] = data
  let temp = {}
  let params = {}

  // 针对传入的额外扩展参数和header参数统一合并, other存在的时候一定是额外扩展参数
  if (other.length) {
    temp = handlerArrayToObject(other)
    if (temp.extras) {
      temp.extras = { ...handlerArrayToObject(temp.extras) }
    }
  } else {
    // 当通过装饰器传递额外扩展参数的时候,且Api具体调用的地方没有传递任何参数
    if (first && first.extras) {
      temp.extras = { ...handlerArrayToObject(first.extras) }
    }
  }

  if (isArray(first)) {
    params = first.map(x => ({ ...x, ...temp.extras }))
  } else if (isObject(first)) {
    params = { ...first, ...temp.extras }
  }
  return params
}

const handlerSetHeader = (data = []) => {
  // eslint-disable-next-line no-unused-vars
  const [first, ...other] = data
  const params = handlerArrayToObject(other)
  let headers = {}
  if (params.headers) {
    headers = { ...handlerArrayToObject(params.headers) }
  }
  return headers
}

export const wrapperGet = url => (...params) => get(url, {
  params: handlerRequestParams(params),
  headers: handlerSetHeader(params)
})

export const wrapperPost = url => (...data) => post(url, handlerRequestParams(data), { headers: handlerSetHeader(data) })

export const wrapperFormPost = url => (...data) => {
  const formData = new FormData()
  const params = handlerRequestParams(data)
  Object.keys(params).forEach(key => { formData.append(key, params[key]) })
  return post(url, formData, { headers: handlerSetHeader(data) })
}

export const wrapperPostParams = url => (...params) => post(url, null, {
  params: handlerRequestParams(params),
  headers: handlerSetHeader(params)
})
