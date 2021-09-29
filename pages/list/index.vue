<template>
  <view class="index">
    <view class="index-search">
      <text class="index-search-text">通讯录</text>
      <view class="index-search-box">
        <input type="text" class="index-search-box-input" placeholder="搜索" value="test" />
      </view>
    </view>
    <view class="index-res" id="list">
      <scroll-view class="index-res-view" scroll-y :scroll-into-view="intoView" :style="{ height: `${scrollviewHigh}px`}">
        <view class="index-res-view-box" :id="`view_${index}`" v-for="(item, index) in indexData" :key="index">
          <view class="index-res-view-box-flag">{{ item.flag }}</view>
          <view class="index-res-view-box-li" v-for="(iter, idx) in item.list" :key="idx">
            <view class="index-res-view-box-li-info">
              <view class="index-res-view-box-li-info-left">
                <text class="index-res-view-box-li-info-left-name">{{ iter.name }}</text>
                <view class="index-res-view-box-li-info-left-desc">
                  <text>{{ iter.desc.post }}</text>
                  <text>{{ iter.desc.affiliation }}</text>
                </view>
              </view>
              <view class="index-res-view-box-li-info-right">
                <text class="index-res-view-box-li-info-right-tel">{{ iter.tel }}</text>
                <view class="index-res-view-box-li-info-right-collect">{{ iter.collect }}</view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
      <view
        class="index-res-list"
        @touchstart="handlerTouchStart"
        @touchmove.stop.prevent="handlerTouchMove"
        @touchend="handlerTouchEnd"
      >
        <view class="index-res-list-li" :id="`menu_${index}`" v-for="(item, index) in indexMenu" :key="index" >{{ item }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  const MENU_LIST = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const DATA_LIST = MENU_LIST.split('').map(x => {
    return {
      flag: x,
      list: [
        {
          name: '张三' + x,
          desc: {
            post: '高管',
            affiliation: 'companies'
          },
          tel: '18319430017',
          collect: false
        }
      ]
    }
  })
  export default {
    name: 'index',
    data() {
      return {
        indexMenu: `${MENU_LIST}#`,
        indexData: DATA_LIST,
        scrollviewHigh: 0,
        intoView: '',
        touchmove: false,
        winOffsetY: 0,
        winHeight: 0,
        itemHeight: 0,
        touchmoveIndex: -1,
      }
    },
    onReady() {
      // 计算屏幕剩余高度  填补剩余高度
      uni.getSystemInfo({
        success: (res) => {
          const { windowHeight } = res
          this.phoneHeight = res.windowHeight;
          // 计算组件的高度
          let view = uni.createSelectorQuery().select('.index-search');
          view.boundingClientRect(data => {
            const { height } = data
            this.scrollviewHigh = windowHeight - height;
          }).exec();
        }
      });
    },
    mounted() {
      setTimeout(() => {
        uni.createSelectorQuery()
        	.in(this)
        	.select('#list')
        	.boundingClientRect()
        	.exec(ret => {
        		this.winOffsetY = ret[0].top
        		this.winHeight = ret[0].height
        		this.itemHeight = this.winHeight / this.indexData.length
        	})
      }, 100)
    },
    methods: {
      handlerLocation(index) {
        uni.vibrateShort();
        this.intoView = `view_${index}`
      },
      handlerTouchStart(e) {
        this.touchmove = true
        const { target: { id } } = e
        const index = id.split('_')[1]
        this.handlerLocation(index)
      },
      handlerTouchMove(e) {
        const pageY = e.touches[0].pageY
        const index = Math.floor((pageY - this.winOffsetY) / this.itemHeight)
        if (this.touchmoveIndex === index) {
        	return false
        }
        let item = this.indexData[index]
        if (item) {
        	this.handlerLocation(index)
        	this.touchmoveIndex = index
        }
      },
      handlerTouchEnd(e) {
        this.touchmove = false
        this.touchmoveIndex = -1
      },
    }
  }
</script>

<style lang="less">
  .index {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-search {
      display: flex;
      justify-content: space-between;

      &-box {
      }
    }

    &-res {
      background: #f1f1f1;
      position: relative;
      // overflow-y: scroll;
      &-view{
        height: 100%;
        overflow: auto;
        &-box {
          &-flag {}

          &-li {
            background: #fff;
            padding: 0 30rpx;
            &-info {
              display: flex;
              justify-content: space-between;

              &-left {
                &-name {}

                &-desc {}
              }

              &-right {
                display: flex;
                justify-content: space-between;
                align-items: center;
                &-tel {}

                &-collect {}
              }
            }
          }
        }
      }
      &-list {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 50rpx;
        border: 1px red solid;
        &-li {

          width: 40rpx;
          height: 40rpx;
          line-height: 40rpx;
          text-align: center;
        }
      }
    }
  }
</style>
