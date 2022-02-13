<script>
  import Storage from '@/utils/storage.js'
  import { switchTab, navigateTo } from '@/utils/changeover.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
      const config = Storage.getStorageSync('config')
      if (config) {
      	navigateTo({ url: '/pages/home/index' })
      } else {
      	navigateTo({ url: '/pages/setting/index' })
      }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">

	.uni-tabbar { // tab背景
		background: #fff !important; // tab背景图片或者渐变色，背景色和背景图片最多选择一个进行设置
		box-shadow: 0 0 3rpx #ccc;
		.uni-tabbar-border { // tabBar上边框
			background-color: #fff !important; // tabBar上边框的颜色
		}
		.uni-tabbar__item{
			padding: 10rpx 0;
		}
		.uni-tabbar__bd { // tabBar单项
			height: 80rpx !important;
			.uni-tabbar__icon { // 图标
				width: 48px!important;
				height: 48px!important;
			}
			.uni-tabbar__label { // 文字
				font-size: 20px!important;
			}
		}
	}
</style>
