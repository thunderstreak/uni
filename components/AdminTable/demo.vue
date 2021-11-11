<template>
  <div class="system-box">
    <TableFilter :config="filterConfig" @gatheringParams="handlerGatheringParams" />
    <TableData :config="tableConfig" @getList="handlerGetList">
      <template slot="action" slot-scope="{ row }">
        <el-button type="primary" @click="handlerEdit(row)">编辑</el-button>
        <el-button type="danger" @click="handlerDelete(row)">删除</el-button>
      </template>
    </TableData>
  </div>
</template>
<script>

import TableFilter from './TableFilter'
import TableData from './TableData'
import Api from '../../page/System/management/constructionUnit/apis'
export default {
  name: '',
  // props: {
  //     filterConfig: {
  //         type: Object,
  //         default: {}
  //     },
  //     tableConfig: {
  //         type: Object,
  //         default: {}
  //     }
  // },
  components: {
    TableFilter,
    TableData
  },
  data: () => ({
    filterConfig: {
      api: Api.GET_CONSTRUCTION_LIST,
      // 查询条件
      conditions: [
        {
          type: 'input',
          text: '企业名称',
          placeholder: '企业名称',
          field: 'companyName', // 字段
          value: '', // 默认值
          disabled: false, // 是否禁用
          permission: 'manager', // 权限
          event: '', // 事件
          handler(val, form) {
            console.log(val, form)
          }
        }
        /* {
            type: 'select',
            text: '项目状态',
            placeholder: '项目状态',
            field: 'projectStatus', // 字段
            value: 1, // 默认值 选中值
            disabled: false, // 是否禁用
            map: [
                {
                    label:'施工中',
                    value:1,
                },
                {
                    label:'已完工',
                    value:2,
                }
            ], // 下拉值
            handler(){}
        },
        {
            type: 'select',
            text: '项目状态',
            placeholder: '项目状态',
            field: 'projectStatus1', // 字段
            value: 2, // 默认值 选中值
            disabled: false, // 是否禁用
            cascade: 'projectStatus', // 级联
            map: [
                {
                    label:'施工中',
                    value:1,
                },
                {
                    label:'已完工',
                    value:2,
                }
            ], // 下拉值
            handler(){}
        },
        {
            type: 'date',
            text: '项目年份',
            placeholder: '项目年份',
            field: 'prYear', // 字段
            value: '',
            disabled: false, // 是否禁用
            dataType: 'year',
            format: 'yyyy-MM-dd', // 时间格式
            handler(){}
        },*/
      ],
      buttons: [
        {
          type: 'search',
          buttonType: 'primary',
          text: '搜索',
          handler(data) {
            console.log(data)
          }
        },
        {
          type: 'reset',
          buttonType: '',
          text: '重置',
          handler() {}
        },
        {
          type: 'add',
          buttonType: 'primary',
          text: '新建',
          handler() {}
        },
        {
          type: 'import',
          buttonType: 'primary',
          text: '导入',
          handler() {}
        },
        {
          type: 'export',
          buttonType: 'primary',
          text: '导出',
          handler() {}
        }
      ]
    },
    tableConfig: {
      selection: true, // 多选
      index: true, // 序号
      tableData: [], // 表格数据
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 当前条数
        total: 0// 总条数
      },
      columns: [
        {
          title: '项目名称',
          key: 'prName',
          // width: '55',
          align: 'center',
          render(item, index) {
            return `<div>${item.companyName}</div>`
          }
        },
        {
          title: '操作',
          key: 'operation',
          // width: '200',
          align: 'center',
          slot: 'action'
        }
      ]
    }
  }),
  created() {
  },
  mounted() {
  },
  methods: {
    // 获取参数
    handlerGetParams() {
      const { page: { ...rest }} = this.tableConfig
      return { ...rest, ...this.gatheringParams }
    },
    // 查询列表
    handlerGetList() {
      const params = this.handlerGetParams()
      Api.GET_CONSTRUCTION_LIST(params).then(res => this.handlerListTableData(res))
    },
    // 获取列表后的处理
    handlerListTableData(res) {
      const { dataList = [], page: { currentPage = 1, pageSize = 10, totalSize = 0 }} = res.object || {}
      if (!dataList || !dataList.length) {
        return this.tableConfig.tableData = []
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
    },

    // 编辑
    handlerEdit(data) {
      console.log(data)
    },
    // 删除
    handlerDelete(data) {
      console.log(data)
    }
  }
}
</script>
