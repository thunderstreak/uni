export const INPUT = 'input' // 输入框 事件类型
export const SELECT = 'select' // 下拉框
export const DATE = 'date' // 时间选择
export const DATE_RANGE = 'daterange' // 时间段选择
export const INPUT_NUMBER = 'inputNumber' // 数字输入框
export const SELECT_REMOTE = 'selectRemote' // 数字输入框

export const SEARCH = 'search' // 查询
export const RESET = 'reset' // 重置
export const BUTTON = 'button' // 默认按钮
export const ADD = 'add' // 新建
export const EDIT = 'edit' // 编辑
export const VIEW = 'view' // 查看
export const DELETE = 'delete' // 删除
export const EXPORT = 'export' // 导出
export const IMPORT = 'import' // 导入
export const CHECKBOX = 'checkbox' // 导入

export const CHANGE = 'change' // 事件类型
export const BLUR = 'blur' // 事件类型
export const FOCUS = 'focus' // 事件类型
export const CLEAR = 'clear' // 事件类型

export const FORM_RESET = 'form-reset' // 表单重置
export const EVENT_INPUT = {
  [CHANGE]: CHANGE,
  [INPUT]: INPUT,
  [BLUR]: BLUR,
  [FOCUS]: FOCUS,
  [CLEAR]: CLEAR
}

export default {
  [INPUT]: INPUT,
  [SELECT]: SELECT,
  [DATE]: DATE,
  'event_input': EVENT_INPUT
}
export const INIT_PAGE_CONFIG = {
  filedKey: {
    currentPage: 'currentPage',
    pageSize: 'pageSize',
    total: 'total',
    list: 'list'
  }
}
export const INIT_PAGE_DATA = {
  currentPage: 1, // 当前页
  pageSize: 10, // 当前条数
  total: 0// 总条数
}
