<template>
	<view class="tabs">
		<view class="tabs-box">
			<view class="tabs-box-li active">设备</view>
		</view>
		<view class="tabs-content">
			<view class="tabs-content-box" v-for="(item, index) in list" :key="index" @click="handlerSwitch(item)">
				<view class="tabs-content-box-icon diaodeng-light"></view>
				<text class="tabs-content-box-txt">{{ item.lightName }}</text>
				<view class="tabs-content-box-switch">
					<switch color="#55b3a9" :checked="!!item.lightState" />
				</view>
			</view>
			<!-- <view class="tabs-content-box">
				<view class="tabs-content-box-icon zoulang-light"></view>
				<text class="tabs-content-box-txt">走廊灯</text>
				<view class="tabs-content-box-switch">
					<switch color="#55b3a9" checked />
				</view>
			</view>
			<view class="tabs-content-box">
				<view class="tabs-content-box-icon chufnag-light"></view>
				<text class="tabs-content-box-txt">厨房灯</text>
				<view class="tabs-content-box-switch">
					<switch color="#55b3a9" checked />
				</view>
			</view>
			<view class="tabs-content-box">
				<view class="tabs-content-box-icon kongtiao"></view>
				<text class="tabs-content-box-txt">空调</text>
				<view class="tabs-content-box-operatior">
					<button type="default" hover-class="tabs-content-box-operatior-active" class="tabs-content-box-operatior-btn tabs-content-box-operatior-subtract"></button>
					<button type="default" hover-class="tabs-content-box-operatior-active" class="tabs-content-box-operatior-btn tabs-content-box-operatior-shutdown"></button>
					<button type="default" hover-class="tabs-content-box-operatior-active" class="tabs-content-box-operatior-btn tabs-content-box-operatior-plus"></button>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
  import Api from '@/api/index'
	export default {
		name:"lightList",
		props: {
			list: {
				type: Array,
				default: () => ([])
			}
		},
		data() {
			return {

			};
		},
    methods: {
      // 开关控制, 更新灯状态
      handlerSwitch(data) {
        const { ioIndex, lightState, lightName } = data
        const params = {
          "key": ioIndex,
          "lightName": lightName,
          "lightState": !!lightState
        }
        Api.updateLightState(params).then(res => {
          console.log(res)
        })
      }
    }
	}
</script>

<style lang="less">
.tabs{
	&-box{
		display: flex;
		margin-top: 30rpx;
		&-li{
			font-size: 38rpx;
			padding: 15rpx 0;
			// border-bottom: 4rpx #41aaa0 solid;
			&.active{
				position: relative;
				&::after{
					position: absolute;
					bottom: 0;
					left: 50%;
					right: 0;
					content: '';
					display: block;
					width: 50rpx;
					margin-left: -25rpx;
					height: 6rpx;
					border-radius: 3rpx;
					background: #41aaa0;
				}
			}
		}
	}
	&-content{
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		&-box{
			margin: 15rpx 0;
			width: 320rpx;
			height: 300rpx;
			box-shadow: 0 0 10rpx #eff3f3;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			align-content: center;
			justify-content: center;
			flex-direction: column;
			&-switch{
				::v-deep .uni-switch-wrapper{
					transform: scale(0.65);
				}
			}
			&-icon{
				width: 48rpx;
				height: 48rpx;
			}
			&-txt{
				font-size: 28rpx;
			}
			&-operatior{
				display: flex;
				justify-content: space-between;
				width: 60%;
				transition: 0.25s;

				&-btn{
					flex-shrink: 0;
					width: 48rpx;
					height: 48rpx;
					border-radius: 0;
					background-color: #fff !important;
					&::after {
					  border: none;
					}
				}
				&-active{
					background-color: #41aaa0 !important;
					border-radius: 50% !important;
					width: 48rpx;
					height: 48rpx;
				}
				&-plus{
					width: 48rpx;
					height: 48rpx;
					background: url(../static/assets/icon/jiahao.png) no-repeat center;
					background-size: 48rpx;
				}
				&-shutdown{
					width: 48rpx;
					height: 48rpx;
					background: url(../static/assets/icon/guanji.png) no-repeat center;
					background-size: 48rpx;
				}
				&-subtract{
					width: 48rpx;
					height: 48rpx;
					background: url(../static/assets/icon/jianhao.png) no-repeat center;
					background-size: 48rpx;
				}
			}
		}
	}
}
</style>
