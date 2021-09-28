import settle from 'axios/lib/core/settle'
import buildURL from 'axios/lib/helpers/buildURL'
import buildFullPath from 'axios/lib/core/buildFullPath'

const adapter = (config) => {
	const { method, baseURL, headers, url, params, paramsSerializer, data, dataType, responseType, sslVerify } = config
	const fullUrl = buildFullPath(baseURL, url)

	return new Promise((resolve, reject) => {
    uni.request({
      method: method.toUpperCase(),
      url: buildURL(fullUrl, params, paramsSerializer),
      header: headers,
      data,
      dataType,
      responseType,
      sslVerify,
      complete(response) {
        const res = { ...response, config }
        settle(resolve, reject, res)
      }
    })
	})
}
export default adapter
