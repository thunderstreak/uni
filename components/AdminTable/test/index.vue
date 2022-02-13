<template>
  <div class="box-table">
    <FormInfo v-if="formShow" :form-data="formData" @getList="handleGetList" @input="value => { formShow = value }" />
    <AdminTable v-show="!formShow" ref="AdminTable" :query-config="queryConfig" :table-config="tableConfig" :page-config="pageConfig" @handleFormReset="handleFormReset">
      <template slot="classify">
        <SelectTree
          class="auto-width"
          :props="{ value: 'classifyCode', children: 'children', label: 'classifyName' }"
          :options="G_CLASSIFY"
          :value="queryConfig.conditions[1].value"
          placeholder="请选择分类"
          clearable
          accordion
          height="200"
          @getValue="handleSelectTree"
        />
      </template>
      <template slot="add" slot-scope="{ props }">
        <el-button v-permission="'M6802'" size="small" type="primary" @click="() => handleAction(props, 'ADD', '新建')">新建</el-button>
      </template>
      <template slot="topSort" slot-scope="{ props }">
        <el-button v-permission="'M6803'" type="primary" @click="() => handleAction(props, 'TOP_SORT', '置顶管理')">置顶排序</el-button>
      </template>

      <template slot="isShow" slot-scope="{ props }">
        <el-switch v-model="props.row.isShow" v-permission="'M6808'" :active-value="1" :inactive-value="0" @change="(value) => handleAction(props, 'PUBLISH', '发布', value)" />
      </template>
      <template slot="isTop" slot-scope="{ props }">
        <el-switch v-model="props.row.isTop" v-permission="'M6809'" :active-value="1" :inactive-value="0" @change="(value) => handleAction(props, 'TOP', '置顶', value)" />
      </template>

      <template slot="operation" slot-scope="{ props }">
        <template v-if="props.row.liveState !== 3 && props.row.liveState !== 4">
          <!--外链没有直播间管理 v-if="props.row.type !== 2"-->
          <el-button v-permission="'M6804'" size="small" type="text" @click="handleAction(props, 'ROOM', '直播间管理')">直播间管理</el-button>
        </template>
        <template v-if="props.row.isShow === 0">
          <el-button v-permission="'M6805'" size="small" type="text" @click="handleAction(props, 'EDIT', '编辑')">编辑</el-button>
          <el-button v-permission="'M6806'" size="small" type="text" @click="handleAction(props, 'DELETE', '删除')">删除</el-button>
        </template>
        <template v-if="(props.row.liveState === 3 || props.row.liveState === 4) && props.row.isRecord === 1">
          <el-button v-permission="'M6807'" size="small" type="text" @click="handleAction(props, 'RETROSPECT', '回看设置')">回看设置</el-button>
          <el-button v-permission="'M9700'" size="small" type="text" @click="handleAction(props, 'TRANSCRIBE', '查看录制视频')">查看录制视频</el-button>
        </template>
        <el-button v-permission="'M9699'" size="small" type="text" @click="handleAction(props, 'DETAIL', '查看')">查看</el-button>
      </template>
    </AdminTable>
    <TopSort v-if="topSortShow" v-model="topSortShow" :form-data="formData" @getList="handleGetList" />
  </div>
</template>

<script>
import SelectTree from '@/components/SelectTree/treeSelect'
import AdminTable from '@/components/AdminTable'
import FormInfo from './formInfo'
import TopSort from './topSort'
import mixin from '@/mixin'
import { liveTypeMap, liveStatusMap, recordMap, topMap } from '@/mixin/staticData'
import LiveApi from '@/api/live'
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'
import { flatMap, listToObject } from '@/utils'
import CommonApi from '@/api/common'
export default {
  components: {
    FormInfo,
    AdminTable,
    SelectTree,
    TopSort
  },
  mixins: [mixin],
  data() {
    const liveClassifyMap = flatMap(store.getters.G_CLASSIFY, 'children')
    return {
      formData: {},
      formShow: false,
      topSortShow: false,

      queryConfig: {
        api: LiveApi.livePage,
        labelWidth: '110px',
        size: 'small',
        conditions: [
          {
            type: 'input',
            label: '直播标题',
            placeholder: '直播标题',
            field: 'liveTitle', // 字段
            value: '' // 默认值
          },
          {
            type: 'select',
            label: '直播分类',
            placeholder: '直播分类',
            field: 'classify', // 字段
            value: '', // 默认值
            slot: 'classify',
            insert: 'query' // 插入位置
          },
          {
            type: 'datetimerange',
            label: '直播时间',
            placeholder: '直播时间',
            field: 'time', // 字段
            value: '', // 默认值
            format: 'yyyy-MM-dd HH:mm:ss',
            valueFormat: 'yyyy-MM-dd HH:mm:ss'
          },
          {
            type: 'select',
            label: '直播类型',
            placeholder: '直播类型',
            field: 'type', // 字段
            value: '', // 默认值
            map: liveTypeMap
          },
          {
            type: 'select',
            label: '直播状态',
            placeholder: '直播状态',
            field: 'liveState', // 字段
            value: '', // 默认值
            map: liveStatusMap
          },
          {
            type: 'select',
            label: '是否需要录制',
            placeholder: '是否需要录制',
            field: 'isRecord', // 字段
            value: '', // 默认值
            map: recordMap
          },
          {
            type: 'checkbox',
            label: '只看置顶直播',
            placeholder: '只看置顶直播',
            field: 'isTop', // 字段
            value: [], // 默认值
            map: topMap.filter(x => x.value === 1).map(x => ({ value: x.value }))
          }
        ],
        buttons: [
          {
            type: 'search',
            buttonType: 'primary',
            text: '查询',
            handler(params) {
              const { isTop = [], time = [], cpage } = params
              let cPage = cpage
              if (isTop && isTop.length) {
                cPage = 1
              }
              let data = {}
              if (time) {
                const [startTime = '', endTime = ''] = time
                data = { startTime, endTime }
              }
              return { ...params, isTop: isTop.toString(), ...data, cpage: cPage }
            }
          },
          {
            type: 'reset',
            text: '重置'
          },
          {
            type: 'add',
            buttonType: 'primary',
            text: '新增',
            slot: 'add',
            insert: 'tableHeader'
          },
          {
            type: 'topSort',
            buttonType: 'primary',
            text: '置顶排序',
            slot: 'topSort'
          }
        ]
      },
      tableConfig: {
        index: true,
        fixed: true,
        border: true,
        headerCellStyle: { background: '#eef1f6', color: '#606266' },
        size: 'small',
        columns: [
          {
            title: '焦点图',
            key: 'pageImg',
            align: 'left',
            width: '105',
            component: {
              type: 'imgView',
              className: 'page-img'
            }
          },
          {
            title: '直播标题',
            key: 'liveTitle',
            align: 'left'
          },
          {
            title: '直播短标题',
            key: 'liveSubTitle',
            align: 'left'
          },
          {
            title: '直播分类',
            key: 'classify',
            align: 'left',
            render(item) {
              const find = liveClassifyMap.find(x => x.classifyCode === item.classify) || {}
              return find.classifyName || '-'
            }
          },
          {
            title: '直播类型',
            key: 'type',
            align: 'left',
            render(item) {
              return listToObject(liveTypeMap)[item.type]
            }
          },
          {
            title: '是否需要录制',
            key: 'isRecord',
            align: 'left',
            render(item) {
              return listToObject(recordMap)[item.isRecord]
            }
          },
          {
            title: '直播时间',
            key: 'startTime',
            align: 'left'
          },
          {
            title: '直播状态',
            key: 'liveState',
            align: 'left',
            render(item) {
              const { liveState, type } = item
              // 外链直播
              // if (type === 2) {
              //   return '-'
              // }
              return listToObject(liveStatusMap)[liveState]
            }
          },
          {
            title: '发布状态',
            key: 'isShow',
            align: 'left',
            slot: 'isShow'
          },
          {
            title: '置顶状态',
            key: 'isTop',
            align: 'left',
            slot: 'isTop'
          },
          {
            title: '浏览量',
            key: 'lookNum',
            align: 'left'
          },
          {
            title: '点赞量',
            key: 'goodNum',
            align: 'left'
          },
          {
            title: '评论量',
            key: 'commentNum',
            align: 'left'
          },
          {
            title: '收藏量',
            key: 'collectionNum',
            align: 'left'
          },
          {
            title: '更新人',
            key: 'updateName',
            align: 'left'
          },
          {
            title: '更新时间',
            key: 'updateTime',
            align: 'left'
          },
          {
            title: '操作',
            key: 'operation',
            width: '250',
            align: 'left',
            fixed: 'right',
            slot: 'operation'
          }
        ]
      },
      pageConfig: {
        filedKey: {
          currentPage: 'cpage',
          pageSize: 'pageSize',
          total: 'totalRow',
          list: 'recordList'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['G_CLASSIFY'])
  },
  mounted() {
    // 全局存储类型类别
    CommonApi.classifyQueryByPage().then(list => {
      this.A_CLASSIFY(list)
    })
  },
  methods: {
    ...mapActions(['A_CLASSIFY']),
    handleGetList() {
      this.$refs.AdminTable.handlerGetList()
    },
    handleFormReset() {
      this.queryConfig.conditions[1].value = ''
    },
    handleAction({ row = {}}, type, title, value) {
      const { liveTitle, liveCode } = row
      switch (type) {
        case 'ADD':
        case 'EDIT':
        case 'DETAIL':
          this.formData = { ...row }
          this.formData.operatorTitle = title
          this.formData.operatorType = type
          this.formShow = true
          break
        case 'TOP_SORT': // 置顶排序
          this.formData = { ...row }
          this.formData.operatorTitle = title
          this.formData.operatorType = type
          this.topSortShow = true
          break
        case 'DELETE': // 删除
          LiveApi.liveDelete({ liveCode }).then(this.handleGetList)
          break
        case 'PUBLISH': // 发布
          LiveApi.livePublish({ liveCode, isShow: value }).then(() => {
            row.isShow = value
            this.handleGetList()
          }).catch(() => {
            row.isShow = row.isShow === 1 ? 0 : 1
          })
          break
        case 'TOP': // 置顶
          LiveApi.liveTop({ liveCode, isTop: value }).then(() => {
            row.isTop = value
            this.handleGetList()
          }).catch(() => {
            row.isTop = row.isTop === 1 ? 0 : 1
          })
          break
        case 'ROOM': // 直播间管理
          this.$router.push({ path: '/publicPage/live/room', query: { liveCode }})
          break
        case 'RETROSPECT': // 直播间回看设置
          this.$router.push({ path: '/publicPage/live/retrospect', query: { liveCode }})
          break
        case 'TRANSCRIBE': // 查看录制视频
          this.$router.push({ path: '/publicPage/live/transcribe', query: { liveTitle }})
          break
      }
    },
    handleSelectTree(value) {
      this.queryConfig.conditions[1].value = value?.classifyCode
    }
  }
}
</script>
<style lang="scss">
.page-img{
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  > img {
    object-fit: cover;
    width: 80px;
    height: 60px;
  }
}
</style>
