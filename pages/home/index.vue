<template>
	<view class="content">
		<HeaderTop title="家庭"/>
		
		<view class="content-cen">
			<view class="content-cen-weather">
				<view class="content-cen-weather-icon"></view>
				<view class="content-cen-weather-txt">晴</view>
			</view>
			<view class="content-cen-box">
				<view class="content-cen-box-p">
					<view class="content-cen-box-p-num">26.0°</view>
					<view class="content-cen-box-p-txt">室内温度</view>
				</view>
				<view class="content-cen-box-p">
					<view class="content-cen-box-p-num">26.0°</view>
					<view class="content-cen-box-p-txt">二氧化碳</view>
				</view>
				<view class="content-cen-box-p">
					<view class="content-cen-box-p-num">26.0°</view>
					<view class="content-cen-box-p-txt">挥发物</view>
				</view>
				<view class="content-cen-box-p">
					<view class="content-cen-box-p-num">26.0°</view>
					<view class="content-cen-box-p-txt">PM2.5</view>
				</view>
				<view class="content-cen-box-p">
					<view class="content-cen-box-p-num">26.0°</view>
					<view class="content-cen-box-p-txt">PM10</view>
				</view>
				<view class="content-cen-box-p">
					<view class="content-cen-box-p-num"></view>
					<view class="content-cen-box-p-txt"></view>
				</view>
			</view>
		</view>
		
		<Tabs></Tabs>
		
	</view>
</template>

<script>
	import HeaderTop from '@/components/headerTop.vue'
	import Tabs from '@/components/tabs.vue'
	import Api from '@/api/index'
	import { mapGetters, mapActions } from 'vuex'
	import { SET_USER_LOGIN_INFO, GET_USER_LOGIN_INFO } from '@/store/types/app'
	export default {
		components:{ HeaderTop, Tabs },
		data() {
			return {
				title: 'Hello1',
				facility: [
					{
						icon: 'diaodeng-light',
						name: '客厅灯',
						type: 'switch'
					}
				]
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
			...mapActions([SET_USER_LOGIN_INFO]),
			handlerGoto(){
				uni.navigateTo({
					url: '/pages/list/index?test=1',
					success(res) {
						console.log(res);
					},
					fail(err) {
						console.log(err);
					}
				});
			},
			handlerDownLoadFile(){
				uni.downloadFile({
					url: 'https://hxzj.teetron.com.cn/file/pdf/2021/8/16/PDF202108160148531002.pdf',
					success(res) {
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success:(red)=> {
								console.log(red.savedFilePath);
								uni.showToast({
									icon: 'none',
									mask: true,
									title: '文件已保存：' + red.savedFilePath, //保存路径
									duration: 3000,
								});
								setTimeout(() => {
									//打开文档查看
									uni.openDocument({
										filePath: red.savedFilePath,
										success: function(res) {
											console.log('打开文档成功');
										}
									});
								},3000)
							}
						});
					},
					fail(e) {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0 38rpx;
		&-cen{
			border-radius: 15rpx;
			height: 380rpx;
			// background-image: linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%);
			background: #f3f7ff url(../../static/assets/room.png) no-repeat right;
			background-size: 100%;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			&-weather{
				padding: 40rpx 25rpx;
				display: flex;
				align-items: center;
				&-icon{
					background: url(../../static/assets/weather-qing.png) no-repeat center;
					background-size: 96rpx 96rpx;
					width: 96rpx;
					height: 96rpx;
				}
				&-txt{
					font-size: 48rpx;
					padding: 0 15rpx;
					color: #202020;
				}
			}
			&-box{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				background: rgba(239,243,243,.6);
				&-p{
					width: 170rpx;
					padding: 5rpx 15rpx;
					margin: 5rpx 0;
					&-num{
						font-size: 38rpx;
						color: #6ea0fd;
					}
					&-txt{
						font-size: 24rpx;
						color: #5d5d5d;
					}
				}
			}
		}
	}

</style>
