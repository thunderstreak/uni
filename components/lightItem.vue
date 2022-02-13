<template>
  <view class="box">
    <view :class="['box-icon', className]"></view>
    <text class="box-txt">{{ data.lightName }}</text>
    <view class="box-switch" @click="handlerSwitch">
      <switch color="#55b3a9" :checked="checked"/>
      <view class="box-switch-view"></view>
    </view>
  </view>
</template>

<script>
  import Storage from "@/utils/storage"
  import Api from '@/api/index'
  const config = Storage.getStorageSync('config')
  export default {
    name: "lightItem",
    props: {
      data: {
        type: Object,
        default: {}
      },
      className: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        checked: !this.data.lightState,
      };
    },
    mounted() {
    },
    watch: {
      data(value) {
        this.checked = !value.lightState
      }
    },
    methods: {
      // 开关控制, 更新灯状态
      handlerSwitch() {
        const { ioIndex, lightState, lightName } = this.data
        const params = {
          "key": config.user,
          "lightName": lightName,
          "lightState": lightState ? 0 : 1
        }
        Api.updateLightState(params).then(res => {
          this.checked = value
        }).catch(err => {
          this.checked = !this.data.lightState
        })
      }
    }
  }
</script>

<style lang="less">
  .box {
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

    &-switch {
      position: relative;
      &-view{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
      ::v-deep .uni-switch-wrapper {
        transform: scale(0.80);
      }
    }

    &-icon {
      width: 48rpx;
      height: 48rpx;
    }

    &-txt {
      font-size: 28rpx;
    }

    &-operatior {
      display: flex;
      justify-content: space-between;
      width: 60%;
      transition: 0.25s;

      &-btn {
        flex-shrink: 0;
        width: 48rpx;
        height: 48rpx;
        border-radius: 0;
        background-color: #fff !important;

        &::after {
          border: none;
        }
      }

      &-active {
        background-color: #41aaa0 !important;
        border-radius: 50% !important;
        width: 48rpx;
        height: 48rpx;
      }

      &-plus {
        width: 48rpx;
        height: 48rpx;
        background: url(../static/assets/icon/jiahao.png) no-repeat center;
        background-size: 48rpx;
      }

      &-shutdown {
        width: 48rpx;
        height: 48rpx;
        background: url(../static/assets/icon/guanji.png) no-repeat center;
        background-size: 48rpx;
      }

      &-subtract {
        width: 48rpx;
        height: 48rpx;
        background: url(../static/assets/icon/jianhao.png) no-repeat center;
        background-size: 48rpx;
      }
    }
  }
</style>
