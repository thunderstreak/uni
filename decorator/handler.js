const isType = type => data => Object.prototype.toString.call(data) === `[object ${type}]`
export const isObject = isType('Object')
export const isArray = isType('Array')
export const isFunction = isType('Function')
export const isNumber = isType('Number')

export const handlerArrayToObject = (data) => data.reduce((prev, curr) => {
  Object.keys(curr).forEach(x => (prev[x] = curr[x]))
  return prev
}, {})

/**
 * 获取目标字段值
 * */
export const handleGetTargetFiled = (data, field = '') => {
  let list = []
  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      const item = data[key]
      if (key === field) {
        list = item
        return list
      } else {
        if (isObject(item) || isArray(item)) {
          return handleGetTargetFiled(item, field)
        }
      }
    }
  }
}

/**
* 获取指定字段值list
* */
export const handleResponseDataToList = (data = {}) => handleGetTargetFiled(data, 'recordList')
/**
 * list 数据转换
 * */
export const handleResponseDataToMap = (list = []) => list.map(x => ({ ...x, label: x.name, value: x.code }))

