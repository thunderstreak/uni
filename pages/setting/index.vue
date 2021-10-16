<template>
  <view class="container">
    <input class="input" type="text" placeholder="设置host" @confirm="handlerSetHost">
  </view>
</template>

<script>
  import Storage from "@/utils/storage"
  import { toastError, switchTab, navigateTo } from '@/utils/changeover'
  export default {
    data() {
      return {

      }
    },
    methods: {
      handlerSetHost(e) {
        const {
          value
        } = e.detail
        console.log(value)
        Storage.setStorageSync('host', `http://${value}`)
        navigateTo({ url: '/pages/home/index' })
      }
    }
  }
</script>

<style lang="less">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    .input {
      padding: 0 15rpx;
      width: 500rpx;
      height: 80rpx;
      border-radius: 10rpx;
      border: 1px #c1c1c1 solid;
    }
  }
</style>
