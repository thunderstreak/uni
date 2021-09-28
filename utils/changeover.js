/**
 * Converters are used to adapt some methods
 **/
export const toast = (config) => (msg) => uni.showToast({ title: msg, ...config })
export const toastSuccess = toast({ icon: 'none', duration: 2000, mask: true })
export const toastError = toast({ icon: 'none', duration: 2000, mask: true })

export const showLoading = (title = '加载中') => uni.showLoading({ title })
export const hideLoading = () => uni.hideLoading()
