<template>
	<view class="content">
    <view :style="{ height: iStatusBarHeight + 'px'}"></view>
    <!-- 顶部 -->
		<HeaderTop title="家庭"/>

		<view class="content-cen">
			<view class="content-cen-weather">
				<view class="content-cen-weather-icon"></view>
				<view class="content-cen-weather-txt"></view>
			</view>
			<view class="content-cen-box">
				<view class="content-cen-box-p" v-for="(item, index) in sensorList" :key="index">
					<view class="content-cen-box-p-num">{{ item.sensorData }}</view>
					<view class="content-cen-box-p-txt">{{ item.sensorName }}</view>
				</view>
			</view>
		</view>

    <!-- 控制列表 -->
		<LightList/>

	</view>
</template>

<script>
	import HeaderTop from '@/components/headerTop.vue'
	import LightList from '@/components/lightList.vue'
	import Api from '@/api/index'

	export default {
		components:{ HeaderTop, LightList },
		data() {
			return {
        iStatusBarHeight: 0,
				sensorList: [],
				lightList: []
			}
		},
		computed: {
		},
		onLoad() {
      // 适配顶部
      this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
    mounted() {
      this.getSensorData()
    },
		methods: {
      getSensorData() {
        // 获取传感器数据
        Api.sensorData().then(res => {
          this.sensorList = res
        })
      },
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
