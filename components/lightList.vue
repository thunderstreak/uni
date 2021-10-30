<template>
	<view class="tabs">
		<view class="tabs-box">
			<view class="tabs-box-li active">设备</view>
		</view>
		<view class="tabs-content">
      <LightItem :className="`light${Math.ceil(Math.random() * 3)}`" :data="item" v-for="(item, index) in lightList" :key="index"/>
		</view>
	</view>
</template>

<script>
  import Api from '@/api/index'
  import LightItem from '@/components/lightItem.vue'
	export default {
		name:"lightList",
    components: { LightItem },
		data() {
			return {
        lightList: []
			};
		},
    mounted() {
      this.getLightState()
    },
    methods: {
      getLightState() {
        // 获取灯光状态
        Api.lightState().then(res => {
          this.lightList = res
        })
      },
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
	}
}
</style>
