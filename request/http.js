/* import { handlerArrayToObject } from '@/decorator/handler.js'
export const get = (...params) => {
	const [ url, ...rest ] = params
	const toParams = handlerArrayToObject(rest)
	return uni.request({
		url,
		data: toParams.params,
		header: toParams.headers,
		method: "GET"
	})
}

export const post = (...params) => {
	const [ url, ...rest ] = params
	const toParams = handlerArrayToObject(rest)
	return uni.request({
		url,
		data: toParams.params,
		header: toParams.headers,
		method: "POST"
	})
} */

import axios from 'axios'
import { requestConfigInterceptors, requestErrorInterceptors, responseDataInterceptors, responseErrorInterceptors } from './interceptors.js'
import adapter from './adapter'
const baseURL = 'http://192.168.0.184:4001/user/'
const service = axios.create({
    withCredentials: true,
    crossDomain: true,
    baseURL,
    timeout: 6000
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(requestConfigInterceptors,requestErrorInterceptors);

// 配置成功后的拦截器
service.interceptors.response.use(responseDataInterceptors, responseErrorInterceptors);

// request 适配器
axios.defaults.adapter = adapter

export default service