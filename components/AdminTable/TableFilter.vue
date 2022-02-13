<template>
  <div class="system-search">
    <el-form ref="formElement" :model="formData" label-width="80px" size="small">
      <el-row>
        <template v-if="config.conditions && config.conditions.length">
          <template v-for="(item, index) in config.conditions">
            <template v-if="item.type === 'input'">
              <el-col :key="index" :span="6">
                <el-form-item :label="item.text" :prop="item.field" :v-permission="item.permission">
                  <el-input v-model="formData[item.field]" :placeholder="item.text" clearable @change="handlerDefault(item)"></el-input>
                </el-form-item>
              </el-col>
            </template>
            <template v-if="item.type === 'inputNumber'">
              <el-col :key="index" :span="6">
                <el-form-item :label="item.text" :prop="item.field" :v-permission="item.permission">
                  <el-input-number v-model="formData[item.field]" :placeholder="item.text" clearable @change="handlerDefault(item)"></el-input-number>
                </el-form-item>
              </el-col>
            </template>
            <template v-if="item.type === 'select'">
              <el-col :key="index" :span="6">
                <el-form-item :label="item.text" :prop="item.field">
                  <el-select v-model="formData[item.field]" :placeholder="item.text" clearable @change="handlerDefault(item)">
                    <!--<el-option label="请选择" value=""></el-option>-->
                    <el-option v-for="it in item.map" :key="it.value" :label="it.label" :value="it.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </template>
            <template v-if="item.type === 'date'">
              <el-col :key="index" :span="6">
                <el-form-item :label="item.text" :prop="item.field" @change="handlerDefault(item)">
                  <el-date-picker v-model="formData[item.field]" type="year" :value-format="item.format" :placeholder="item.text" clearable></el-date-picker>
                </el-form-item>
              </el-col>
            </template>
          </template>
        </template>
        <template v-if="config.buttons && config.buttons.length">
          <el-col :span="24">
            <el-form-item label-width="10px">
              <el-button v-for="(item, index) in config.buttons" :key="index" :type="item.buttonType" @click="handlerDefault(item)">{{ item.text }}</el-button>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import ALL, { INPUT, SELECT, DATE, EVENT_INPUT, SEARCH, RESET, BUTTON, ADD, EXPORT } from './constant'

export default {
  name: '',
  model: {
    prop: 'gatheringParams',
    event: 'change'
  },
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    gatheringParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: () => ({
    name: 'TableFilter',
    formData: {}
  }),
  beforeCreate() {
  },
  created() {
    this.handleInitConfig()
  },
  mounted() {
  },
  methods: {
    // 初始化
    handleInitConfig() {
      const { conditions, buttons, api } = this.config
      conditions.forEach(x => {
        const { type = INPUT, field, value = '', event = '', disabled = false, permission = '' } = x
        this.$set(this.formData, field, value)
        if (x.permission) {
          x.permission = 'admin' // 默认显示
        }
        if (type === INPUT) {
          x.event = EVENT_INPUT
        }
      })
      this.handlerEmitEvent()
    },

    // 默认处理
    handlerDefault({ type, handler = () => {}, ...rest }) {
      if (type === SEARCH) { // 搜索
        handler(this.formData)
      } else if (type === RESET) { // 重置
        this.$refs.formElement.resetFields()
        return
      } else if (type === BUTTON) {
        handler(this.formData)
      } else if (type === INPUT || type === SELECT || type === DATE) {
        const currentValue = this.formData[rest.field]
        handler(currentValue, this.formData)
      } else if (type === ADD || type === EXPORT) {
        return
      }
      this.handlerEmitEvent()
    },

    // 触发事件
    handlerEmitEvent() {
      this.$emit('gatheringParams', this.formData) // 派发查询data
    }
  }
}
</script>
