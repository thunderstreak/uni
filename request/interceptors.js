import { LOGIN_INFO } from '@/constant/index.js'
import { getStorageSync } from "@/utils/storage.js"

/**
* interceptores request success handler
**/
export const requestConfigInterceptors = (config) => {
	// config.headers['Authorization'] = 'Bearer ' + token
	// const { token } = getStorageSync(LOGIN_INFO)
	return config;
}

/** 
* interceptors request error handler 
**/
export const requestErrorInterceptors = (error) => {
	return Promise.reject(error);
}

/**
* interceptors response error handler 
**/
export const responseDataInterceptors = (response) => {
	const { data: { code, message} } = response
	if (code === 0) {
		uni.showToast({ icon: 'none', mask: true, title: message, duration: 3000 })
		return Promise.reject(response)
	}
	return response;
}

/**
* interceptors response error handler 
**/
export const responseErrorInterceptors = (error) => {
	return Promise.reject(error);
}
