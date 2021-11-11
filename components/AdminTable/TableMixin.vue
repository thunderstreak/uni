<script>
export default {
  methods: {
    // 获取参数
    handlerGetParams() {
      const { page: { ...rest }} = this.tableConfig
      return { ...rest, ...this.gatheringParams }
    },
    // 获取列表后的处理
    handlerListTableData(res) {
      const { dataList = [], page: { currentPage = 1, pageSize = 10, totalSize = 0 }} = res.object || {}
      if (!dataList || !dataList.length) {
        this.tableConfig.tableData = []
        return
      }
      this.tableConfig.tableData = dataList
      this.tableConfig.page = {
        currentPage, // 当前页
        pageSize, // 当前条数
        total: totalSize// 总条数
      }
    },
    // table查询条件
    handlerGatheringParams(data) {
      this.gatheringParams = data
      this.handlerGetList()
    }
  }
}
</script>
