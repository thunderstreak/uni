<template>
  <view class="tabs">
    <slot></slot>
    <!-- <component :is="$options.components.TabPane"></component> -->
    <!-- <component :is="item.child" v-for="item in $slots.default"></component> -->
  </view>
</template>

<script>
  import TabPane from '@/components/tabPane.vue'
  export default {
    name: 'tabs',
    components: { TabPane },
    props: {
      defaultActiveKey: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        key: this.defaultActiveKey
      }
    },
    mounted() {
      this.$on('activeKeyChange', (key) => {
        this.key = key;
      })
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  .tabs{
    border: 1px blue solid;
    display: flex;
    justify-content: space-around;
    position: relative;
  }
</style>
