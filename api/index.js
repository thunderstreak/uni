import { wrapperPost, wrapperGet, wrapperPostParams } from '@/request/index'
import { setExtraExtensionParameterDecorator, getCacheaDecorator, setResponseDataDecorator, getMessageDecorator, getLoadingDecorator } from '@/decorator/apply'
import { handlerGetLoginInfoCache, handlerSetLoginInfoCache } from './handler/index'
import { toastSuccess, toastError, showLoading, hideLoading } from '@/utils/changeover'

// set response tips
const setMessageDecorator = getMessageDecorator({ success: toastSuccess, error: toastError })
const setLoadingDecorator = getLoadingDecorator(showLoading, hideLoading)

export default new class Api {
  GetSensorData = wrapperGet('/GetSensorData')
  
  GetOnOffState = wrapperGet('/GetOnOffState')
}()
