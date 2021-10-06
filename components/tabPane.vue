<template>
  <view class="pane">
    <view class="pane-tab" @click="handlerToogle">
      <slot name="tab" :props="{ activeKey }">{{title}}</slot>
    </view>
    <view class="pane-content" v-if="activeKey === key">
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'pane',
    props: {
      activeKey: {
        type: [String, Number],
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      const parent = this.$parent
      const key = parent?.key ? parent?.key : parent.$parent?.key
      return {
        key
      }
    },
    mounted() {
      const parent = this.$parent
      if (parent.$parent.key) {
        this.$watch(() => parent.$parent.key, (n) => {
          this.key = n
        })
      } else {
        this.$watch(() => parent.key, (n) => {
          this.key = n
        })
      }

    },
    methods: {
      handlerToogle() {
        const parent = this.$parent
        if (parent.$parent.key) {
          parent.$parent.$emit('activeKeyChange', this.activeKey)
        } else {
          parent.$emit('activeKeyChange', this.activeKey)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pane{
    // display: flex;
    // flex-direction: column;
    border: 1px blue solid;
    &-tab{

    }
    &-content{
      border: 1px red solid;
      width: 100%;
      // position: absolute;
      // left: 0;
      // right: 0;

    }
  }
</style>
