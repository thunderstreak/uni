<template>
  <div class="table-admin">
    <el-card v-if="!queryConfig.hide" class="box-card card-form">
      <el-form ref="formElement" :model="formData" :label-width="queryConfig.labelWidth" :size="queryConfig.size" inline>
        <template v-if="queryConfig.conditions && queryConfig.conditions.length">
          <template v-for="(item, index) in queryConfig.conditions">
            <template v-if="!item.slot">
              <template v-if="item.type === 'input'">
                <el-form-item v-show="!item.hide" :key="index" :label="item.label" :prop="item.field">
                  <el-input v-model.trim="formData[item.field]" :placeholder="item.placeholder || item.text" clearable @change="handlerDefault(item)" />
                </el-form-item>
              </template>
              <template v-if="item.type === 'inputNumber'">
                <el-form-item v-show="!item.hide" :key="index" :label="item.label" :prop="item.field">
                  <el-input-number v-model="formData[item.field]" :placeholder="item.placeholder || item.text" clearable @change="handlerDefault(item)" />
                </el-form-item>
              </template>
              <template v-if="item.type === 'select'">
                <el-form-item v-show="!item.hide" :key="index" :label="item.label" :prop="item.field">
                  <el-select v-model="formData[item.field]" :multiple="item.multiple" :multiple-limit="item.multipleLimit" :placeholder="item.placeholder || item.text" clearable @change="handlerDefault(item)">
                    <!--<el-option label="请选择" value=""></el-option>-->
                    <el-option v-for="it in options[item.field]" :key="it.value" :label="it.label" :value="it.value" />
                  </el-select>
                </el-form-item>
              </template>
              <template v-if="item.type === 'checkbox'">
                <el-form-item v-show="!item.hide" :key="index" :label="item.label" :prop="item.field" class="checkbox-inline">
                  <el-checkbox v-if="item.checkboxConfig && item.checkboxConfig.isAll && !item.checkboxConfig.style" v-model="checkAll" class="checkbox-inline-all" :indeterminate="isIndeterminate" @change="(value) => { handleCheckAllChange(item, value) }">全选</el-checkbox>
                  <el-checkbox-group v-model="formData[item.field]" class="checkbox-inline-group" @change="(value) => handlerDefault(item, value)">
                    <template v-if="item.checkboxConfig && item.checkboxConfig.style === 'button'">
                      <el-checkbox-button v-for="it in options[item.field]" :key="it.value" :label="it.value" :name="item.field">{{ it.label }}</el-checkbox-button>
                    </template>
                    <template v-else>
                      <el-checkbox v-for="it in options[item.field]" :key="it.value" :label="it.value" :name="item.field">{{ it.label }}</el-checkbox>
                    </template>
                  </el-checkbox-group>
                </el-form-item>
              </template>
              <template v-if="item.type === 'selectRemote'">
                <el-form-item v-show="!item.hide" :key="index" :label="item.label" :prop="item.field">
                  <el-select v-model="formData[item.field]" clearable filterable remote reserve-keyword :placeholder="item.placeholder || item.text" :remote-method="value => handleRemoteMethod(value, item)" :loading="loading[item.field]" @change="handlerDefault(item)">
                    <el-option v-for="it in options[item.field]" :key="it.value" :label="it.label" :value="it.value" />
                  </el-select>
                </el-form-item>
              </template>
              <template v-if="item.type === 'date'">
                <el-form-item v-show="!item.hide" :key="index" :label="item.label" :prop="item.field" @change="handlerDefault(item)">
                  <el-date-picker v-model="formData[item.field]" :type="item.dataType" :value-format="item.valueFormat" :format="item.format" :placeholder="item.placeholder || item.text" clearable />
                </el-form-item>
              </template>
              <template v-if="item.type === 'daterange' || item.type === 'datetimerange'">
                <el-form-item v-show="!item.hide" :key="index" :label="item.label" :prop="item.field" @change="handlerDefault(item)">
                  <el-date-picker
                    v-model="formData[item.field]"
                    :type="item.type"
                    :value-format="item.valueFormat"
                    :format="item.format"
                    :placeholder="item.placeholder || item.text"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    clearable
                  />
                </el-form-item>
              </template>
            </template>
            <template v-if="item.insert === 'query' && item.slot">
              <el-form-item :key="index" :label="item.label" :prop="item.field">
                <slot v-show="!item.hide" :props="{ config: { ...item }, data: { ...formData } }" :name="item.slot" />
              </el-form-item>
            </template>
          </template>
        </template>
        <template v-if="queryConfig.buttons && queryConfig.buttons.length">
          <el-form-item label-width="30px">
            <template v-for="(item, index) in queryConfig.buttons">
              <template v-if="!item.insert">
                <template v-if="item.slot">
                  <slot :props="{ config: { ...item }, data: { ...formData } }" :name="item.slot" />
                </template>
                <template v-else-if="!item.hide">
                  <el-button :key="index" :type="item.buttonType" @click="handlerDefault(item)">{{ item.text }}</el-button>
                </template>
              </template>
            </template>
          </el-form-item>
        </template>
      </el-form>
    </el-card>

    <el-card v-if="!tableConfig.hide" class="box-card">
      <div class="table-admin-header">
        <template v-for="(item, index) in queryConfig.buttons">
          <div v-if="item.insert === 'tableHeader' && item.slot" :key="index" class="table-admin-header-li">
            <slot :props="{ config: { ...item }, data: { ...formData } }" :name="item.slot" />
          </div>
        </template>
      </div>
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
          :size="tableConfig.size"
          :data="tableData"
          :border="tableConfig.border"
          :tree-props="tableConfig.treeProps"
          :header-cell-style="tableConfig.headerCellStyle"
          tooltip-effect="light"
          @selection-change="handleMultipleChange"
          @current-change="handleSingleChange"
          @row-click="handleRowClick"
        >
          <template v-if="tableConfig.selection">
            <el-table-column type="selection" width="55" align="center" />
          </template>
          <template v-if="tableConfig.index">
            <el-table-column type="index" label="序号" width="55" align="center" :fixed="tableConfig.fixed" />
          </template>

          <template v-for="(item, index) in tableConfig.columns">
            <el-table-column v-if="columnShowGeneral(item)" :key="index" :prop="item.key" :label="item.title" :align="item.align" :width="item.width" :sortable="item.sortable" :class="item.className" />
            <el-table-column v-if="columnShowComponent(item)" :key="index" :prop="item.key" :label="item.title" :align="item.align" :width="item.width" :sortable="item.sortable" :class="item.className">
              <template v-if="item.component.type === 'imgView'" slot-scope="scope">
                <el-image :style="item.component.style" :class="item.component.className" :src="scope.row[item.key]" :preview-src-list="[scope.row[item.key]]" />
              </template>
            </el-table-column>
            <el-table-column v-if="columnShowRender(item)" :key="index" :prop="item.key" :label="item.title" :align="item.align" :width="item.width" :sortable="item.sortable" :class="item.className">
              <template slot-scope="scope">
                <div v-html="item.render(scope.row, index)" />
              </template>
            </el-table-column>
            <el-table-column v-if="columnShowSlot(item)" :key="index" :prop="item.key" :label="item.title" :fixed="item.fixed" :align="item.align" :width="item.width" :type="item.type" :sortable="item.sortable" :class="item.className">
              <template v-if="item.header">
                <template slot="header" slot-scope="scope">
                  <slot :props="{ row: scope.row, $index: scope.$index, tableData }" :name="item.header.slot" />
                </template>
              </template>
              <template slot-scope="scope">
                <slot :props="{ row: scope.row, $index: scope.$index, tableData }" :name="item.slot" />
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div v-if="!pageConfig.hide" class="table-admin-pagination">
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
import {
  ADD,
  BUTTON,
  CHANGE,
  CHECKBOX,
  DATE,
  DATE_RANGE,
  EXPORT,
  IMPORT,
  INIT_PAGE_CONFIG,
  INIT_PAGE_DATA,
  INPUT,
  INPUT_NUMBER,
  RESET,
  SEARCH,
  SELECT,
  SELECT_REMOTE
} from './constant'

export default {
  name: 'AdminTable',
  props: {
    queryConfig: {
      type: Object,
      default() { return null }
    },
    tableConfig: {
      type: Object,
      default() { return null }
    },
    pageConfig: {
      type: Object,
      default() { return INIT_PAGE_CONFIG }
    },
    lifecycleUpdateCustomCall: {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({
    queryType: [INPUT, SELECT, DATE, DATE_RANGE, INPUT_NUMBER],
    tableLoading: false,
    formData: {},
    singleSelection: {}, // 单选数据
    multipleSelection: [], // 多选数据
    tableData: [], // 表格数据
    page: { ...INIT_PAGE_DATA },
    expands: [], // 可展开的数组
    options: {}, // 远程搜索存放的数组
    loading: {}, // 远程搜索loading

    checkAll: false,
    isIndeterminate: false
  }),
  computed: {
  },
  watch: {
    'config.page'(n) {
      this.page = n
    },
    queryConfig: {
      handler(n) {
        this.handleInitConditions(n)
      },
      deep: true
    },
    tableConfig: {
      handler(n) {
        this.setTableData(n)
      },
      deep: true
    }
  },
  created() {
    this.handleInitConfig()
    const { immediate = true, precondition } = this.queryConfig
    if (immediate) {
      // 前置条件接口查询, 只在配置初始化阶段调用一次
      if (precondition) {
        const { api, handler, extraParams = {}} = precondition
        const isApi = api && typeof api === 'function'
        const isHandler = handler && typeof handler === 'function'
        if (isApi && isHandler) {
          api({ ...extraParams }).then(res => {
            const params = handler(res)
            this.handlerGetList(params)
          })
        } else {
          console.error('precondition.api and precondition.handler is not config')
        }
        return
      }
      this.handlerGetList()
    } else {
      this.setTableData(this.tableConfig)
    }
  },
  updated() {
    const { lifecycleUpdateCustomCall } = this
    // 自定义方法，用于拖拽排序
    if (lifecycleUpdateCustomCall && typeof lifecycleUpdateCustomCall === 'function') {
      lifecycleUpdateCustomCall(this.tableData)
    }
  },
  methods: {
    setTableData(tableConfig) {
      const { data = [] } = tableConfig
      if (data) {
        this.tableData = data
      }
    },
    // 图片预览
    columnShowComponent(item) {
      const { component, render, slot } = item
      return component && !render && !slot
    },
    // 普通column
    columnShowGeneral(item) {
      const { render, slot, component } = item
      return !render && !slot && !component
    },
    // column中配置有render函数
    columnShowRender(item) {
      const { render, slot, component } = item
      return render && !slot && !component
    },
    // column中配置有slot类型
    columnShowSlot(item) {
      const { slot } = item
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
      const { conditions = [] } = data
      conditions.forEach(x => {
        const { type = INPUT, field, value, watch, map, slot } = x
        // 如果slot类型的查询条件是重新赋值，就需要重置当前formData上的数据
        if (slot && value !== this.formData[field]) {
          this.$set(this.formData, field, value)
        }
        // 只有为空的查询条件重新设置
        if (!this.formData[field]) {
          this.$set(this.formData, field, value)
        }
        if (type === INPUT) {
          x.event = CHANGE
        } else if (type === SELECT_REMOTE) {
          this.$set(this.options, field, [])
        } else if (type === CHECKBOX) {
          if (map && Array.isArray(map)) {
            // 设置checkbox选中
            this.checkAll = map.some(x => value.includes(x.value))
            this.isIndeterminate = value.length > 0 && value.length < map.length
            this.$set(this.options, field, map)
          } else {
            throw Error('The map property of the select type in QueryConfig is not an array!')
          }
        } else if (type === SELECT) {
          // 如果监听类型存在
          if (watch) {
            const { associatedField, api, immediate = false, handler, extraParams = {}} = watch
            // 根据传递的watch中的关联字段进行监听, 如果关联字段发生改变就重新请求查询
            this.$watch(`formData.${associatedField}`, (n) => {
              // console.log(associatedField, n)
              const params = {}
              // 当关联的字段存在的时候进行参数传递
              if (associatedField) {
                params[associatedField] = n
              }
              api({ ...params, ...extraParams }).then(res => {
                const list = handler ? handler(res) : res
                this.$set(this.options, field, list)
              })
            }, { immediate })
          } else if (map) {
            // 如果是数组的时候直接使用，对象则直接解构配置
            if (Array.isArray(map)) {
              this.$set(this.options, field, map)
            } else {
              const { api, extraParams = {}, handler } = map
              if (api) {
                api({ ...extraParams }).then(res => {
                  this.options[field] = handler ? handler(res) : res
                })
              }
            }
          }
        }
      })
    },

    // 默认处理
    handlerDefault({ type, checkboxConfig, handler, ...rest }, value = []) {
      if (type === SEARCH) { // 搜索
        this.handlerGetList(this.formData)
      } else if (type === RESET) { // 重置
        // 过滤slot类型的查询条件重置成传递初始的默认值
        const { conditions } = this.queryConfig
        const conditionSlotList = conditions.filter(x => x.slot)
        const conditionOtherList = conditions.filter(x => !x.slot)
        if (conditionSlotList.length) {
          conditionSlotList.forEach(x => {
            const { field, value } = x
            this.$set(this.formData, field, value)
          })
        }
        conditionOtherList.forEach(x => {
          const { field } = x
          this.$set(this.formData, field, '')
        })
        this.$refs.formElement.resetFields()
        this.$emit('handleFormReset', this.formData)
      } else if (type === BUTTON || type === IMPORT || type === EXPORT) {
        handler && handler(this.formData)
      } else if (type === INPUT || type === SELECT || type === DATE) {
        const currentValue = this.formData[rest.field]
        handler && handler(currentValue, this.formData)
      } else if (type === ADD) {
        handler && handler.call(this, arguments)
      } else if (type === CHECKBOX) {
        this.handlerGetList(this.formData)
        // 翻页查询的时候如果不是第一页需要重置分页查询的页数，否则分页状态不正常
        const { filedKey: { currentPage }} = this.pageConfig
        this.page[currentPage] = 1
        // checkbox类型的是否点击就查询
        // const { trigger = false } = checkboxConfig
        // if (trigger) {
        //   this.handlerGetList(this.formData)
        //   const checkedCount = value.length
        //   this.checkAll = checkedCount === rest.map.length
        //   this.isIndeterminate = checkedCount > 0 && checkedCount < rest.map.length
        // }
      }
    },

    // 获取参数
    handlerGetParams() {
      const { filedKey: { currentPage, pageSize }} = { ...INIT_PAGE_CONFIG, ...this.pageConfig }
      return {
        [currentPage]: this.page[currentPage],
        [pageSize]: this.page[pageSize],
        ...this.formData
      }
    },

    // 查询列表,可接受外部参数
    handlerGetList(externalParams) {
      const { api, buttons = [], extraParams, handler } = this.queryConfig
      if (api) {
        let params = { ...this.handlerGetParams(), ...extraParams, ...externalParams }

        // 每次查询按钮存在则需要走查询btn 的查询处理函数
        const searchBtn = buttons.find(x => x.type === SEARCH)
        if (searchBtn) {
          const { handler } = searchBtn
          if (handler) {
            params = { ...handler(params) }
          }
        }

        this.tableLoading = true
        let Api
        if (typeof api === 'function') {
          Api = api(params)
        } else {
          // query.api 是自定义处理函数的时候，解构并返回一个新的api函数
          const { handler: apiHandler, extraParams = {}} = api
          if (apiHandler && typeof apiHandler === 'function') {
            Api = apiHandler({ ...params, ...extraParams })
          } else {
            console.error('queryConfig.api.handler is invalid!')
          }
        }
        Api.then(res => {
          let data = res
          if (handler) {
            data = handler(res)
          }
          this.handlerListTableData(data)
        }).finally(() => {
          this.tableLoading = false
        })
      }
    },

    // 获取列表后的处理
    handlerListTableData({ data }) {
      const { filedKey: { total, list }} = { ...INIT_PAGE_CONFIG, ...this.pageConfig }
      if (Array.isArray(data)) {
        this.tableData = data
        this.page[total] = data.length
      } else {
        this.page[total] = data[total]
        this.tableData = data[list] || []
      }
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
      const { field, remote: { api, queryField, handler, extraParams = {}}} = data
      this.loading[data.field] = true
      const params = {
        [queryField]: value,
        ...extraParams
      }
      api(params).then(res => {
        this.options[field] = handler(res)
        this.loading[data.field] = false
      })
    },
    // 全选
    handleCheckAllChange(data, value) {
      const { field, map } = data
      this.formData[field] = value ? map.map(x => x.value) : []
      this.isIndeterminate = false
      this.handlerGetList()
    }
  }
}
</script>
<style lang="scss">
.table-admin{
  .box-card{
    // margin-bottom: 20px;
    margin: 0 0 20px 0;
    overflow: inherit;
    &:last-child{
      margin: 0;
    }
    &.card-form{
      .el-card__body{
        padding-bottom: 0;
      }
    }
  }
  .checkbox-inline{
    .el-form-item__content{
      display: inline-flex;
    }
    &-all{
      margin-right: 1rem;
    }
    &-group{
      .el-checkbox{
        margin-right: 1rem;
        &:last-of-type{
          margin-right: 0;
        }
      }
    }
  }
  &-header{
    margin-bottom: 10px;
  }
  &-data{
    display: flex;
    justify-content: space-between;
  }
  &-pagination{
    padding-top: 20px;
    text-align: center;
  }
}
</style>
