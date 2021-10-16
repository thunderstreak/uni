import axios from 'axios'
import { requestConfigInterceptors, requestErrorInterceptors, responseDataInterceptors, responseErrorInterceptors } from './interceptors.js'
import adapter from './adapter.js'
import { CONFIG } from '@/config/index.js'

const NODE_ENV = process.env.NODE_ENV

const service = axios.create({
	withCredentials: true,
	crossDomain: true,
	baseURL: CONFIG[NODE_ENV].BASE_URL,
	timeout: 60000
})

// request interceptor
service.interceptors.request.use(requestConfigInterceptors,requestErrorInterceptors);

// response interceptor
service.interceptors.response.use(responseDataInterceptors, responseErrorInterceptors);

// request adapter
axios.defaults.adapter = adapter

export default service
