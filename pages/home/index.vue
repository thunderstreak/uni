<template>
	<view class="content">
    <view :style="{ height: iStatusBarHeight + 'px'}"></view>
		<HeaderTop title="家庭"/>

		<view class="content-cen" @click="handlerDownLoadFile">
			<view class="content-cen-weather">
				<view class="content-cen-weather-icon"></view>
				<view class="content-cen-weather-txt">晴</view>
			</view>
			<view class="content-cen-box">
				<view class="content-cen-box-p" v-for="(item, index) in statusList" :key="index">
					<view class="content-cen-box-p-num">{{ item.传感器数值 }}</view>
					<view class="content-cen-box-p-txt">{{ item.传感器名称 }}</view>
				</view>
			</view>
		</view>

		<LightList></LightList>

	</view>
</template>

<script>
	import HeaderTop from '@/components/headerTop.vue'
	import LightList from '@/components/lightList.vue'
	import Api from '@/api/index'
	import { mapGetters, mapActions } from 'vuex'
	import { SET_USER_LOGIN_INFO, GET_USER_LOGIN_INFO } from '@/store/types/app'
	import { LOGIN_INFO } from '@/constant/index.js'
	export default {
		components:{ HeaderTop, LightList },
		data() {
			return {
				title: 'Hello1',
        iStatusBarHeight: 0,
        statusList: [],
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
      this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			// Api.appLogin({ loginName: '瑞昌市管理员', password: '111111' }).then(res => {
			// 	console.log(res)

			// 	// this.SET_USER_LOGIN_INFO(res.config.headers)
			// }).catch(err => {
			// 	console.log(err)
			// })

      Api.GetSensorData().then(res => {
        this.statusList = res
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
        // plus.io.resolveLocalFileSystemURL('_downloads/', (entry) => {
        //   const dir = entry.createReader()
        //   dir.readEntries((files) => {
        //     if (files.length) {
        //       entry.removeRecursively(() => {})
        //     }
        //   })
        // })
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
			},
			handlerLoginOut() {
				// Api.logout().then(res => {
				// 	console.log(res)
				// })
        uni.chooseImage({
          count: 10,
          type: 'image',
          success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFiles
          }
        })
			}
		}
	}
</script>

<style lang="less">
	@import url('@/static/styles/index.css');
	.content {
		padding: 0 38rpx;
		&-cen{
			border-radius: 15rpx;
			// height: 380rpx;
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
					background-size: 48rpx 48rpx;
					width: 48rpx;
					height: 48rpx;
				}
				&-txt{
					font-size: 36rpx;
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
