<template>
  <div class="table-admin">
    <el-card v-if="queryConfig" class="box-card">
      <el-form ref="formElement" :model="formData" :label-width="queryConfig.labelWidth || '110px'" :size="queryConfig.size || 'small'">
        <el-row>
          <template v-if="queryConfig.conditions && queryConfig.conditions.length">
            <template v-for="(item, index) in queryConfig.conditions">
              <template v-if="item.type === 'input'">
                <el-col :key="index" :span="6">
                  <el-form-item v-show="!item.hide" :label="item.text" :prop="item.field">
                    <el-input v-model="formData[item.field]" :placeholder="item.placeholder || item.text" clearable @change="handlerDefault(item)" />
                  </el-form-item>
                </el-col>
              </template>
              <template v-if="item.type === 'inputNumber'">
                <el-col :key="index" :span="6">
                  <el-form-item v-show="!item.hide" :label="item.text" :prop="item.field">
                    <el-input-number v-model="formData[item.field]" :placeholder="item.placeholder || item.text" clearable @change="handlerDefault(item)" />
                  </el-form-item>
                </el-col>
              </template>
              <template v-if="item.type === 'select'">
                <el-col :key="index" :span="6">
                  <el-form-item v-show="!item.hide" :label="item.text" :prop="item.field">
                    <el-select v-model="formData[item.field]" :multiple="item.multiple" :multiple-limit="item.multipleLimit" :placeholder="item.placeholder || item.text" clearable @change="handlerDefault(item)">
                      <!--<el-option label="请选择" value=""></el-option>-->
                      <el-option v-for="it in (item.map || options[item.field])" :key="it.value" :label="it.label" :value="it.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </template>
              <template v-if="item.type === 'selectRemote'">
                <el-col :key="index" :span="6">
                  <el-form-item v-show="!item.hide" :label="item.text" :prop="item.field">
                    <el-select v-model="formData[item.field]" clearable filterable remote reserve-keyword :placeholder="item.placeholder || item.text" :remote-method="value => handleRemoteMethod(value, item)" :loading="loading[item.field]" @change="handlerDefault(item)">
                      <el-option v-for="it in options[item.field]" :key="it.value" :label="it.label" :value="it.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </template>
              <template v-if="item.type === 'date'">
                <el-col :key="index" :span="6">
                  <el-form-item v-show="!item.hide" :label="item.text" :prop="item.field" @change="handlerDefault(item)">
                    <el-date-picker v-model="formData[item.field]" :type="item.dataType" :value-format="item.format" :placeholder="item.placeholder || item.text" clearable />
                  </el-form-item>
                </el-col>
              </template>
              <template v-if="item.type === 'daterange'">
                <el-col :key="index" :span="6">
                  <el-form-item v-show="!item.hide" :label="item.text" :prop="item.field" @change="handlerDefault(item)">
                    <el-date-picker
                      v-model="formData[item.field]"
                      :type="item.type"
                      :value-format="item.format"
                      :placeholder="item.placeholder || item.text"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </template>
              <template v-if="item.insert === 'query' && item.slot">
                <slot v-show="!item.hide" :props="{ config: { ...item }, data: { ...formData } }" :name="item.slot" />
              </template>
            </template>
          </template>
          <template v-if="queryConfig.buttons && queryConfig.buttons.length">
            <el-col :span="24">
              <el-form-item label-width="30px">
                <!--<el-button v-for="(item, index) in queryConfig.buttons" :key="index" :type="item.buttonType" @click="handlerDefault(item)">{{item.text}}</el-button>-->
                <template v-for="(item, index) in queryConfig.buttons">
                  <template v-if="item.slot">
                    <slot :props="{ config: { ...item }, data: { ...formData } }" :name="item.slot" />
                  </template>
                  <template v-else>
                    <el-button :key="index" :type="item.buttonType" @click="handlerDefault(item)">{{ item.text }}</el-button>
                  </template>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </el-card>
    <br>
    <el-card v-if="tableConfig" class="box-card">
      <div class="table-admin-data">
        <template v-for="(item, index) in queryConfig.conditions">
          <div v-if="item.insert === 'table' && item.slot" :key="index" class="table-admin-data-left">
            <slot :props="{ config: { ...item }, data: { ...formData } }" :name="item.slot" />
          </div>
        </template>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :height="tableConfig.height"
          :row-key="tableConfig.rowKey"
          :size="tableConfig.size || 'small'"
          :data="tableData"
          :border="tableConfig.border"
          :tree-props="tableConfig.treeProps"
          tooltip-effect="light"
          @selection-change="handleMultipleChange"
          @current-change="handleSingleChange"
          @row-click="handleRowClick"
        >
          <template v-if="tableConfig.selection">
            <el-table-column type="selection" width="55" align="center" />
          </template>
          <template v-if="tableConfig.index">
            <el-table-column type="index" label="序号" width="55" align="center" />
          </template>

          <template v-for="(item, index) in tableConfig.columns">
            <el-table-column v-if="columnShowGeneral(item)" :key="index" :prop="item.key" :label="item.title" :align="item.align" :width="item.width" />
            <el-table-column v-if="columnShowRender(item)" :key="index" :prop="item.key" :label="item.title" :align="item.align" :width="item.width">
              <template slot-scope="scope">
                <div v-html="item.render(scope.row, index)" />
              </template>
            </el-table-column>
            <el-table-column v-if="columnShowSlot(item)" :key="index" :prop="item.key" :label="item.title" :fixed="item.fixed" :align="item.align" :width="item.width" :type="item.type" :sortable="item.sortable">
              <template slot-scope="scope">
                <slot :props="{ row: scope.row, $index: scope.$index, tableData }" :name="item.slot" />
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div class="table-admin-pagination">
        <el-pagination
          background
          :current-page="page[pageConfig.filedKey.currentPage]"
          :page-sizes="[10, 25, 50, 100]"
          :page-size="page[pageConfig.filedKey.pageSize]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page[pageConfig.filedKey.total]"
          @size-change="(size) => handlePageChange(size, 'size')"
          @current-change="(current) => handlePageChange(current, 'current')"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { ADD, BUTTON, CHANGE, DATE, EXPORT, IMPORT, INPUT, RESET, SEARCH, SELECT, INIT_PAGE_CONFIG, INIT_QUERY_CONFIG, INIT_TABLE_CONFIG, DATE_RANGE, INPUT_NUMBER, SELECT_REMOTE } from './constant'

export default {
  name: 'TableAdmin',
  props: {
    queryConfig: {
      type: Object,
      default() { return { ...INIT_QUERY_CONFIG } }
    },
    tableConfig: {
      type: Object,
      default() { return { ...INIT_TABLE_CONFIG } }
    },
    pageConfig: {
      type: Object,
      default() { return { ...INIT_PAGE_CONFIG } }
    }
  },
  data: () => ({
    queryType: [INPUT, SELECT, DATE, DATE_RANGE, INPUT_NUMBER],
    tableLoading: false,
    formData: {},
    singleSelection: {}, // 单选数据
    multipleSelection: [], // 多选数据
    tableData: [], // 表格数据
    page: {
      currentPage: 1, // 当前页
      pageSize: 10, // 当前条数
      total: 0// 总条数
    },
    expands: [], // 可展开的数组
    options: {}, // 远程搜索存放的数组
    loading: {} // 远程搜索loading
  }),
  computed: {
  },
  watch: {
    'config.page'(n) {
      this.page = n
    },
    'queryConfig': {
      handler(n) {
        this.handleInitConditions(n)
      },
      deep: true
    }
  },
  created() {
    this.handleInitConfig()
    this.handlerGetList()
  },
  mounted() {
  },
  methods: {
    // 普通column
    columnShowGeneral(data) {
      const { render, slot } = data
      return !render && !slot
    },
    // column中配置有render函数
    columnShowRender(data) {
      const { render, slot } = data
      return render && !slot
    },
    // column中配置有slot类型
    columnShowSlot(data) {
      const { slot } = data
      return slot
    },
    // 初始化配置参数
    handleInitConfig() {
      const { rowKey = 'id', treeProps = {}} = this.tableConfig
      const { filedKey } = this.pageConfig

      this.tableConfig.rowKey = rowKey
      this.tableConfig.treeProps = treeProps

      if (filedKey) {
        const { currentPage, pageSize, total } = filedKey
        this.page = {}
        this.page[currentPage] = 1
        this.page[pageSize] = 10
        this.page[total] = 0
      }
      this.handleInitConditions(this.queryConfig)
    },

    // 初始化查询条件
    handleInitConditions(data) {
      const { conditions } = data
      conditions.forEach(x => {
        const { type = INPUT, field, value, watch } = x
        this.$set(this.formData, field, value)
        // console.log(this.formData, field, value)
        if (type === INPUT) {
          x.event = CHANGE
        } else if (type === SELECT_REMOTE) {
          this.$set(this.options, field, [])
        } else if (type === SELECT) {
          // 如果监听类型存在
          if (watch) {
            const { associatedField, api, immediate = false, handler = () => {}, extraParams = {}} = watch
            // 根据传递的watch中的关联字段进行监听, 如果关联字段发生改变就重新请求查询
            this.$watch(`formData.${associatedField}`, (n) => {
              // console.log(associatedField, n)
              api({ [associatedField]: n, ...extraParams }).then(res => {
                const list = handler ? handler(res) : res.data
                this.$set(this.options, field, list)
              })
            }, { immediate })
          }
        }
      })
    },

    // 默认处理
    handlerDefault({ type, handler = () => {}, ...rest }) {
      if (type === SEARCH) { // 搜索
        const data = handler(this.formData)
        this.handlerGetList(data)
      } else if (type === RESET) { // 重置
        this.$refs.formElement.resetFields()
        this.$emit('handleFormReset', this.formData)
      } else if (type === BUTTON || type === IMPORT || type === EXPORT) {
        handler(this.formData)
      } else if (type === INPUT || type === SELECT || type === DATE) {
        const currentValue = this.formData[rest.field]
        handler(currentValue, this.formData)
      } else if (type === ADD) {
        handler.call(handler)
      }
    },

    // 获取参数
    handlerGetParams() {
      const { filedKey: { currentPage, pageSize }} = this.pageConfig
      return {
        [currentPage]: this.page[currentPage],
        [pageSize]: this.page[pageSize],
        ...this.formData
      }
    },

    // 查询列表,可接受外部参数
    handlerGetList(externalParams) {
      const { api, buttons, extraParams } = this.queryConfig
      let params = { ...this.handlerGetParams(), ...externalParams, ...extraParams }

      // 每次查询按钮存在则需要走查询btn 的查询处理函数
      const searchBtn = buttons.find(x => x.type === SEARCH)
      if (searchBtn) {
        const { handler } = searchBtn
        if (handler) {
          params = handler(params)
        }
      }

      this.tableLoading = true
      api(params).then(res => {
        this.handlerListTableData(res)
      }).finally(() => {
        this.tableLoading = false
      })
    },

    // 获取列表后的处理
    handlerListTableData({ data }) {
      const { filedKey: { total, list }} = this.pageConfig
      this.page[total] = data[total]
      this.tableData = data[list] || []
    },

    // 单选
    handleSingleChange(single) {
      this.singleSelection = single
      this.$emit('handleSingleChange', single)
    },

    // 多选
    handleMultipleChange(multiple) {
      this.multipleSelection = multiple
      this.$emit('handleMultipleChange', multiple)
    },

    // 分页
    handlePageChange(val, type) {
      const { filedKey: { currentPage, pageSize }} = this.pageConfig
      if (type === 'size') {
        this.page[pageSize] = val
      } else if (type === 'current') {
        this.page[currentPage] = val
      }
      this.handlerGetList()
    },

    // 触发事件
    handlerEmitEvent(type) {
      this.$emit(type, this.formData) // 派发查询data
    },

    handleRowClick(row) {
      // const isExpanded = this.expands.includes(row.id)
      // if (isExpanded) {
      //   this.expands = this.expands.filter(x => x !== row.id)
      // } else {
      //   this.expands.push(row.id)
      // }
      // this.$refs.table.toggleRowExpansion(row, isExpanded)

      // this.tableData.forEach(x => {
      //   this.$refs.table.toggleRowExpansion(x, x.id === row.id)
      // })
    },

    // 远程搜索
    handleRemoteMethod(value, data) {
      const { field, remote: { api, queryField, handler }} = data
      this.loading[data.field] = true
      const params = {
        [queryField]: value
      }
      api(params).then(res => {
        this.options[field] = handler(res)
        this.loading[data.field] = false
      })
    }
  }
}
</script>
<style lang="scss">
.table-admin{
  margin: 20px;
  &-data{
    display: flex;
    justify-content: space-between;
  }
  &-pagination{
    padding-top: 20px;
    text-align: right;
  }
}
</style>
