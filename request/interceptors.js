import { LOGIN_INFO } from '@/constant/index'
import Storage from "@/utils/storage"
import { toastSuccess, toastError } from '@/utils/changeover'

/**
* interceptores request success handler
**/
export const requestConfigInterceptors = (config) => {
	const { object = {} } = Storage.getStorageSync(LOGIN_INFO)
  if (object?.accessToken) {
    config.headers['Authorization'] = object?.accessToken
  }

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
	const { data } = response
	if (data?.code === 0) {
    toastSuccess(data?.message)
		return Promise.reject(response)
	}
	return data;
}

/**
* interceptors response error handler
**/
export const responseErrorInterceptors = (error) => {
  toastError(error?.message)
	return Promise.reject(error);
}
