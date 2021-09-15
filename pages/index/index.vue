<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<text>{{GET_USER_LOGIN_INFO}}</text>
		</view>
	</view>
</template>

<script>
	import Api from '@/api/index.js'
	import { mapGetters, mapActions } from 'vuex'
	import { SET_USER_LOGIN_INFO, GET_USER_LOGIN_INFO } from '@/store/types/app'
	export default {
		data() {
			return {
				title: 'Hello1'
			}
		},
		computed: {
		    ...mapGetters([GET_USER_LOGIN_INFO])
		},
		onLoad() {
			Api.get({ t: 1 }).then(res => {
				console.log(res.config.headers)
				this.SET_USER_LOGIN_INFO(res.config.headers)
			})
		},
		methods: {
			...mapActions([SET_USER_LOGIN_INFO])
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
