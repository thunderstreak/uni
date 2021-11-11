<template>
  <div class="system-table">
    <el-table ref="multipleTable" :data="config.tableData" tooltip-effect="light" @selection-change="handleMultipleChange" @current-change="handleSingleChange">
      <template v-if="config.selection">
        <el-table-column type="selection" width="55" />
      </template>
      <template v-if="config.index">
        <el-table-column type="index" label="序号" width="55" />
      </template>

      <template v-for="(item, index) in config.columns">
        <el-table-column v-if="item.render && !item.slot" :key="index" :prop="item.key" :label="item.title" :align="item.align" :width="item.width">
          <template slot-scope="scope">
            <div v-html="item.render(scope.row, index)"></div>
          </template>
        </el-table-column>
        <el-table-column v-if="item.slot" :key="index" :prop="item.key" :label="item.title" :align="item.align" :width="item.width">
          <template slot-scope="scope">
            <slot :row="{ ...scope.row }" :name="item.slot"></slot>
          </template>
        </el-table-column>
      </template>

    </el-table>

    <div class="pagination-box">
      <el-pagination
        background
        :current-page="page.currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="(size) => handlePageChange(size, 'size')"
        @current-change="(current) => handlePageChange(current, 'current')"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: () => ({
    name: 'TableData',
    singleSelection: {}, // 单选数据
    multipleSelection: [], // 多选数据
    tableData: [], // 表格数据
    page: {
      currentPage: 1, // 当前页
      pageSize: 10, // 当前条数
      total: 0// 总条数
    }
  }),
  computed: {
  },
  watch: {
    'config.page'(n) {
      this.page = n
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 单选
    handleSingleChange(single) {
      this.singleSelection = single
    },

    // 多选
    handleMultipleChange(multiple) {
      this.multipleSelection = multiple
    },

    // 分页
    handlePageChange(val, type) {
      if (type === 'size') {
        this.page.pageSize = val
      } else if (type === 'current') {
        this.page.currentPage = val
      }
      this.$emit('getList') // 派发集合数据
    }
  }
}
</script>
