import { LOGIN_INFO } from '@/constant/index'
import Storage from "@/utils/storage"
import { toastSuccess, toastError } from '@/utils/changeover'

/**
* interceptores request success handler
**/
export const requestConfigInterceptors = (config) => {
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
	return response;
}

/**
* interceptors response error handler
**/
export const responseErrorInterceptors = (error) => {
  toastError(error?.message)
	return Promise.reject(error);
}
