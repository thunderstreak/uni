<template>
	<view class="tab">
    <Tabs default-active-key="1">
      <TabPane active-key="1" title="tab1">
        <view slot="tab">tab head</view>
        Tab
      </TabPane>
      <TabPane active-key="2" title="tab2">
        <view slot="tab">Tab header</view>
        Tab 2
      </TabPane>
    </Tabs>

	</view>
</template>

<script>
  import Tabs from '@/components/tabs.vue'
  import TabPane from '@/components/tabPane.vue'
	export default {
    components: { Tabs, TabPane },
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
.tab{
  margin-top: 50rpx;
}
</style>
