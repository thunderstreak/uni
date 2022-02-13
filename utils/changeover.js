import { ACCESS_TOKEN } from '@/constant/index'
import Storage from "@/utils/storage"
import service from '@/request/http.js'
/**
 * Converters are used to adapt some methods
 **/
export const toast = (config) => (msg) => uni.showToast({ title: msg, ...config })
export const toastSuccess = toast({ icon: 'none', duration: 2000, mask: true })
export const toastError = toast({ icon: 'none', duration: 2000, mask: true })

export const setNavigationBarTitle = (config) => uni.setNavigationBarTitle(config)

export const showLoading = (title = '加载中') => uni.showLoading({ title })
export const hideLoading = () => uni.hideLoading()

export const navigateTo = (config) => uni.navigateTo(config)
export const navigateBack = () => uni.navigateBack()
export const reLaunch = (config) => uni.reLaunch(config)

export const switchTab = (config) => uni.switchTab(config)
export const makePhoneCall = (config) => uni.makePhoneCall(config)
export const vibrateShort = (config) => uni.vibrateShort(config)

export const chooseLocation = (config) => uni.chooseLocation(config)
export const getLocation = (config) => uni.getLocation(config)


export const openDocument = (filePath) => uni.openDocument({ filePath })
export const saveFile = (tempFilePath) => new Promise((resolve, reject) => {
	uni.saveFile({
		tempFilePath,
		success: resolve,
		fail: reject
	})
})
export const downloadFile = (url) => new Promise((resolve, reject) => {
	uni.downloadFile({
		url,
		success: resolve,
		fail: reject
	})
})

export const uploadFile = (url, filePath) => new Promise((resolve, reject) => {
	const token = Storage.getStorageSync(ACCESS_TOKEN)

	uni.uploadFile({
		url: `${service.defaults.baseURL}${url}`,
		filePath,
		name: 'file',
		header: { 'Authorization': token },
		success: resolve,
		fail: reject
	})
})

export const connectSocket = (config = {}) => uni.connectSocket(config)
export const onSocketOpen = (fn = () => {}) => uni.onSocketOpen(fn)
export const sendSocketMessage = (data = {}) => uni.sendSocketMessage(data)
export const onSocketMessage = (fn = () => {}) => uni.onSocketMessage(fn)
