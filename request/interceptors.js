/* interceptores request success handler */
export const requestConfigInterceptors = (config) => {
  return config;
}

/* interceptors request error handler */
export const requestErrorInterceptors = (error) => {
  return Promise.reject(error);
}

/* interceptors response error handler */
export const responseDataInterceptors = (response) => {
  return response;
}

/* interceptors response error handler */
export const responseErrorInterceptors = (error) => {
  return Promise.reject(error);
}
