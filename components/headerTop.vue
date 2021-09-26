<template>
	<view class="header">
		<view class="header-left">{{ title }}</view>
		<view class="header-right" @click="handlerSpeech"></view>
	</view>
</template>

<script>
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
				plus.speech.startRecognize({
					continue: true,
					engine: 'baidu',
				}, (result) => {
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '识别内容：' + result,
						duration: 5000,
					});
				}, (err) => {
					console.log(err)
				});
			}
		}
	}
</script>

<style lang="scss">
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
		width: 48rpx;
		height: 48rpx;
		background: url(../static/assets/yuyin.png) no-repeat center;
		background-size: 48rpx 48rpx;
		&-icon{
			display: block;
			width: 48rpx;
			height: 48rpx;
		}
	}
}
</style>
