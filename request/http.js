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

// request interceptor
service.interceptors.request.use(requestConfigInterceptors,requestErrorInterceptors);

// response interceptor
service.interceptors.response.use(responseDataInterceptors, responseErrorInterceptors);

// request adapter
axios.defaults.adapter = adapter

export default service