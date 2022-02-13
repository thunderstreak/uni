<template>
  <view class="container">
    <form class="input" @submit="formSubmit" @reset="formReset">
      <view class="input-box">
        <input class="input-box-ipt" type="text" name="user" placeholder="设置用户" :value="data.user">
      </view>
      <view class="input-box">
        <input class="input-box-ipt" type="text" name="ip" placeholder="设置ip" :value="data.ip">
      </view>
      <view class="input-box">
        <input class="input-box-ipt" type="text" name="ws" placeholder="设置ws" :value="data.ws">
      </view>
      <view class="input-box">
        <button class="input-box-btn" form-type="submit">确定</button>
      </view>
      <view class="input-box">
        <button class="input-box-btn" type="default" form-type="reset">重置</button>
      </view>
    </form>
  </view>
</template>

<script>
  import Storage from "@/utils/storage"
  import { toastError, switchTab, navigateTo } from '@/utils/changeover'

  export default {
    data() {
      return {
        data: {
          ip: '',
          ws: '',
          user: ''
        }
      }
    },
    mounted() {
      const config = Storage.getStorageSync('config')
      this.data = { ...config }
    },
    methods: {
      formSubmit(e) {
        const data = e.detail.value
        Storage.setStorageSync('config', data)

        navigateTo({ url: '/pages/home/index' })
      },
      formReset(e) {
        console.log('清空数据')
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

      &-box{
        margin: 10rpx 0;
        &-ipt{
          padding: 0 15rpx;
          width: 500rpx;
          height: 80rpx;
          border-radius: 10rpx;
          border: 1px #c1c1c1 solid;
        }
        &-btn{
          font-size: 30rpx;
        }
      }
    }
  }
</style>
