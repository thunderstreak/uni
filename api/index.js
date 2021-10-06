import { wrapperPost, wrapperGet, wrapperPostParams } from '@/request/index'
import { setResponseDataDecorator, getMessageDecorator, getLoadingDecorator } from '@/decorator/apply'
import { handlerGetLoginInfoCache, handlerSetLoginInfoCache } from './handler/index'
import { toastSuccess, toastError, showLoading, hideLoading } from '@/utils/changeover'
import { getMockSensorData, getMockLightState } from './mock.js'

// set response tips
const setMessageDecorator = getMessageDecorator({ success: toastSuccess, error: toastError })
const setLoadingDecorator = getLoadingDecorator(showLoading, hideLoading)

export default new class Api {
  // 更新灯光状态
  updateLightState = wrapperPost('/api/v1/light/updateLightState')

  // 获取灯光状态
  @getMockLightState
  lightState = wrapperPost('/api/v1/light/lightState')

  // 获取传感器状态
  @getMockSensorData
  sensorData = wrapperGet('/api/v1/sensor/sensorData')

  // 获取开关状态
  switchAllState = wrapperGet('/api/v1/switch/switchAllState')
}()
