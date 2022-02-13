<template>
  <el-dialog class="box-card" :title="formData.operatorTitle" :visible.sync="value" width="70%" :before-close="() => handleClose('ruleForm')" :close-on-click-modal="false">
    <div class="title">{{ formData.operatorTitle }}</div>
    <div class="dialog-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" size="small" :disabled="formData.operatorType === 'DETAIL'">
        <template v-if=" formData.operatorType === 'ADD' || formData.operatorType === 'EDIT' || formData.operatorType === 'DETAIL'">
          <el-form-item label="直播类型：" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio v-for="(item, index) in liveTypeMap" :key="index" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="直播标题：" prop="liveTitle">
                <el-input v-model="ruleForm.liveTitle" placeholder="直播标题" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="直播短标题：" prop="liveSubTitle">
                <el-input v-model="ruleForm.liveSubTitle" placeholder="直播短标题"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="直播分类：">
                <SelectTree
                  v-if="otherData.classifyList.length"
                  class="auto-width"
                  :disabled="formData.operatorType === 'DETAIL'"
                  :props="otherData.classificationProps"
                  :options="otherData.classifyList"
                  :value="ruleForm.classify"
                  placeholder="请选择分类"
                  clearable
                  accordion
                  height="200"
                  @getValue="
                    value => {
                      ruleForm.classify = value.classifyCode;
                    }
                  "
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省：" prop="province">
                <el-select v-model="ruleForm.province" placeholder="请选择省" class="auto-width" @change="value => handleAreaCodeChange(2, value)">
                  <el-option v-for="item in otherData.provinceList" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="市：" prop="city">
                <el-select v-model="ruleForm.city" placeholder="请选择市" class="auto-width" @change="value => handleAreaCodeChange(3, value)">
                  <el-option v-for="item in otherData.cityList" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区：" prop="area">
                <el-select v-model="ruleForm.area" placeholder="请选择区" class="auto-width" @change="value => handleAreaCodeChange(4, value)">
                  <el-option v-for="item in otherData.areaList" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="直播地址：" prop="areaCode">
                <el-input v-model="ruleForm.areaCode" class="hide" placeholder="直播地址"/>
                <BaiduMap :position="position" @changePosition="handleChangePosition"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="直播时间：" prop="startTime">
                <el-date-picker v-model="ruleForm.startTime" class="auto-width" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择直播时间"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="评分：" prop="score">
                <el-input-number v-model="ruleForm.score" class="auto-width auto-height" :precision="1" :step="0.1" :max="5"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="详细地址：" prop="areaAddress">
                <el-input v-model="ruleForm.areaAddress" placeholder="详细地址"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经度：" prop="longitude">
                <el-input v-model="ruleForm.longitude" readonly placeholder="经度"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="纬度：" prop="latitude">
                <el-input v-model="ruleForm.latitude" readonly placeholder="纬度"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="主办单位：">
                <el-input v-model="ruleForm.hostOrganizer" placeholder="主办单位"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="协办单位：">
                <el-input v-model="ruleForm.coOrganizer" placeholder="协办单位"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="承办单位：">
                <el-input v-model="ruleForm.undertakeOrganizer" placeholder="承办单位"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="ruleForm.type === 1" :span="8">
              <el-form-item label="是否需要录制：" prop="isRecord">
                <el-select v-model="ruleForm.isRecord" placeholder="请选择">
                  <el-option v-for="item in recordMap" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间：" prop="showDate">
                <el-date-picker v-model="ruleForm.showDate" class="auto-width" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择发布时间"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="直播简介：">
                <el-input v-model="ruleForm.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" maxlength="1000" show-word-limit placeholder="直播简介"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="焦点图：" prop="pageImg">
            <Cropper id="pageImg" accept=".jpeg,.jpg,.png" :size="10" :limit="1" :disabled="formData.operatorType === 'DETAIL'" :data-list="fileList" @getUpload="handleUpload"/>
            <el-input v-model="ruleForm.pageImg" class="hide" />
          </el-form-item>
          <el-form-item label="详情介绍：">
            <quill-editor :disabled="formData.operatorType === 'DETAIL'" :content="ruleForm.detailDesc" @getEditorData="val => { ruleForm.detailDesc = val }"/>
          </el-form-item>
        </template>
      </el-form>
      <Loading :loading="loading" />
    </div>
    <span class="dialog-footer">
      <el-button size="small" @click="handleClose('ruleForm')">返回</el-button>
      <el-button v-if="formData.operatorType === 'ADD' || formData.operatorType === 'EDIT'" :loading="formLoading" type="primary" size="small" @click="handleSubmit('ruleForm')">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import QuillEditor from '@/components/QuillEditor'
import BaiduMap from '@/components/BaiduMap'
import Loading from '@/components/Loading'
import Cropper from '@/components/Upload/cropper'
import SelectTree from '@/components/SelectTree/treeSelect'
import mixin from '@/mixin'
import LiveApi from '@/api/live'
import CommonApi from '@/api/common'
import moment from 'moment'
import store from '@/store'

const createFormData = () => ({
  type: 1, // 直播类型
  liveH5Url: '', // pc链接
  livePcUrl: '', // h5链接
  liveTitle: '', // 直播标题
  liveSubTitle: '', // 直播短标题
  classify: '', // 直播分类
  areaCode: '', // 直播地址
  areaAddress: '', // 详细地址
  longitude: '', // 经度
  latitude: '', // 维度
  time: '', // 直播时间
  startTime: '', // 直播开始时间
  endTime: '', // 直播结束时间
  showDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), // 发布时间
  isRecord: '', // 是否需要录制
  score: null, // 评分
  remark: '', // 直播简介

  pageImg: '', // 封面图片地址
  hostOrganizer: '', // 主办单位
  coOrganizer: '', // 协办单位
  undertakeOrganizer: '', // 承办单位
  detailDesc: '', // 详情介绍

  province: '',
  city: '',
  area: ''
})
const createOtherData = () => ({
  classificationProps: {
    // 配置项（必选）
    value: 'classifyCode',
    children: 'children',
    label: 'classifyName'
  },
  classifyList: [],
  provinceList: [],
  areaList: [],
  cityList: []
})
export default {
  components: { BaiduMap, Loading, QuillEditor, Cropper, SelectTree },
  mixins: [mixin],
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      ruleForm: createFormData(),
      rules: {
        type: [{ required: true, message: '请选择直播类型', trigger: 'blur' }],
        // liveH5Url: [{ required: true, message: '请填写h5直播链接', trigger: 'blur' }],
        // livePcUrl: [{ required: true, message: '请填写pc直播链接', trigger: 'blur' }],
        liveTitle: [
          { required: true, message: '请输入直播标题', trigger: 'blur' },
          { max: 50, message: '最多输入50个字' }
        ],
        liveSubTitle: [
          { required: true, message: '请输入直播短标题', trigger: 'blur' },
          { max: 50, message: '最多输入50个字' }
        ],
        classify: [
          { required: true, message: '请选择直播分类', trigger: 'blur' }
        ],
        areaCode: [
          { required: true, message: '请选择直播地址', trigger: 'blur' }
        ],
        areaAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        longitude: [{ required: true, message: '请选择经度', trigger: 'blur' }],
        latitude: [{ required: true, message: '请选择纬度', trigger: 'blur' }],
        startTime: [
          { required: true, message: '请选择直播时间', trigger: 'blur' }
        ],
        showDate: [
          { required: true, message: '请选择直播发布时间', trigger: 'blur' }
        ],
        isRecord: [
          { required: true, message: '请选择是否需要录制', trigger: 'blur' }
        ],
        score: [{ required: true, message: '请选择评分', trigger: 'blur' }],
        pageImg: [{ required: true, message: '请上传封面图', trigger: 'blur' }],
        province: [{ required: true, message: '请选择省', trigger: 'blur' }],
        city: [{ required: true, message: '请选择市', trigger: 'blur' }]
      },
      formLoading: false,
      loading: false,
      position: {},
      fileList: [],
      mapShow: false,
      otherData: createOtherData(),
      cascadeProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value = 1 } = node
          const params = { level: level + 2, parentCode: value }
          CommonApi.sysAreaQueryList(params).then((list = []) => {
            const nodes = list.map(x => ({
              ...x,
              label: x.name,
              value: x.code,
              leaf: level >= 2
            }))
            resolve(nodes)
          })
        }
      }
    }
  },
  created() {
    this.handleClassifyQuery()
    this.handleSysAreaQueryList(2, 1)
    this.handleFormData(this.formData)
    const code = store.getters.parentCode
    this.ruleForm.province = code.length >= 2 ? code.substr(0, 2) : ''
    this.ruleForm.city = code.length >= 4 ? code.substr(0, 4) : ''
    this.ruleForm.area = code.length >= 6 ? code.substr(0, 6) : ''
    this.ruleForm.province && this.handleSysAreaQueryList(3, this.ruleForm.province)
    this.ruleForm.city && this.handleSysAreaQueryList(4, this.ruleForm.city)
    const positionAddress = store.getters.positionAddress
    this.ruleForm.areaCode = positionAddress.address
    this.ruleForm.areaAddress = positionAddress.address
    this.ruleForm.longitude = positionAddress.longitude
    this.ruleForm.latitude = positionAddress.latitude
    this.position = {
      address: positionAddress.address,
      lat: positionAddress.latitude,
      lng: positionAddress.longitude
    }
  },
  methods: {
    handleFormData(n) {
      const { operatorType } = n
      // 编辑，详情
      if (operatorType === 'EDIT' || operatorType === 'DETAIL') {
        this.loading = true
        LiveApi.liveDetail({ liveCode: n.liveCode })
          .then(res => {
            const data = res.data
            const { areaAddress, latitude, longitude, areaCode } = res.data
            this.fileList = [{ url: data.pageImg }]
            this.position = {
              address: areaAddress,
              lat: latitude,
              lng: longitude
            }
            const province = areaCode.substring(0, 2)
            const city = areaCode.substring(0, 4)
            const area = areaCode.length > 4 ? areaCode : ''

            this.ruleForm = {
              ...createFormData(),
              ...data,
              province,
              city,
              area
            }
            // 获取省市区回填
            this.handleSysAreaQueryList(2, 1)
            province && this.handleSysAreaQueryList(3, province)
            city && this.handleSysAreaQueryList(4, city)
          })
          .finally(() => {
            this.loading = false
          })
      } else if (operatorType === 'ADD') {
        this.ruleForm = { ...createFormData() }
      }
    },
    handleClose(formName) {
      this.loading = false
      this.formLoading = false
      this.fileList = []

      this.position = {}
      this.ruleForm = createFormData()
      this.otherData = createOtherData()
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.$emit('input', false)
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formLoading = true
          const { operatorType } = this.formData
          let request
          if (operatorType === 'ADD' || operatorType === 'EDIT') {
            const data = this.ruleForm
            // data.areaCode = data.area || data.city || data.province
            if (operatorType === 'ADD') {
              request = LiveApi.liveAdd(data)
            } else if (operatorType === 'EDIT') {
              request = LiveApi.liveUpdate(data)
            }
          }

          request
            .then(() => {
              this.$emit('getList')
              this.handleClose('ruleForm')
            })
            .finally(() => {
              this.formLoading = false
            })
        }
      })
    },
    // 上传
    handleUpload(e) {
      const { file } = e
      if (file.length) {
        this.fileList = [file[0]]
        this.ruleForm.pageImg = this.fileList[0].url
      } else {
        this.fileList = []
        this.ruleForm.pageImg = ''
      }
      console.log(e)
    },
    handleRemove(value) {
      console.log(value)
    },
    handleChangePosition(data) {
      console.log(data)
      const { lat, lng, address } = data
      this.ruleForm.longitude = lng
      this.ruleForm.latitude = lat
      this.ruleForm.areaAddress = address
      // const { position, address } = data
      // const [lng, lat] = position.split(',')
      // this.ruleForm.longitude = lng
      // this.ruleForm.latitude = lat
      // this.ruleForm.areaAddress = address
    },
    handleSysAreaQueryList(level, parentCode) {
      const params = { level, parentCode }
      CommonApi.sysAreaQueryList(params).then((list = []) => {
        const transformList = list.map(x => ({
          ...x,
          label: x.name,
          value: x.code
        }))
        level === 2 && (this.otherData.provinceList = transformList)
        level === 3 && (this.otherData.cityList = transformList)
        level === 4 && (this.otherData.areaList = transformList)
      })
    },
    handleClassifyQuery() {
      CommonApi.classifyQueryByPage().then((list = []) => {
        this.otherData.classifyList = list
      })
    },
    handleAreaCodeChange(level, value) {
      const realLevel = level + 1
      this.ruleForm.areaCode = value
      if (level === 2) {
        this.ruleForm.city = ''
        this.ruleForm.area = ''
      } else if (level === 3) {
        this.ruleForm.area = ''
      }
      if (level > 3) {
        return
      }
      this.handleSysAreaQueryList(realLevel, value)
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 20px 0;
}

.rate-box {
  height: 32px;
  display: flex;
  align-items: center;
  align-content: center;
}

.tips {
  line-height: normal;
}

.auto-width {
  width: 100%;
}

.auto-height {
  height: 33px;
}

.row-box {
  display: flex;
}

.flex-item {
  ::v-deep.el-form-item__content {
    display: flex;

    .el-input {
      margin-right: 10px;
    }
  }
}
</style>
