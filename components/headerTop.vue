<template>
	<view class="header">
		<view class="header-left">{{ title }}</view>
		<view class="header-right" @click="handlerSpeech">重新设置</view>
	</view>
</template>

<script>
  import { reLaunch } from '@/utils/changeover'
  import Storage from "@/utils/storage"
	export default {
		name:"headerTop",
		props:{
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			};
		},
		methods: {
			handlerSpeech(e) {
        // Storage.clearStorageSync()
        reLaunch({ url: '/pages/setting/index' })
				// plus.speech.startRecognize({
				// 	continue: true,
				// 	engine: 'baidu',
				// }, (result) => {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		mask: true,
				// 		title: '识别内容：' + result,
				// 		duration: 5000,
				// 	});
				// }, (err) => {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		mask: true,
				// 		title: `识别错误：${error.code} ${error.message}`,
				// 		duration: 5000,
				// 	});
				// });
			}
		}
	}
</script>

<style lang="less">
.header{
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-content: center;
	padding: 50rpx 0;
	&-left{
		font-size: 48rpx;
	}
	&-right{
    font-size: 28rpx;
		// width: 48rpx;
		// height: 48rpx;
		// background: url(../static/assets/yuyin.png) no-repeat center;
		// background-size: 48rpx 48rpx;
		&-icon{
			display: block;
			width: 48rpx;
			height: 48rpx;
		}
	}
}
</style>
