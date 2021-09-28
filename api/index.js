import { wrapperPost, wrapperGet, wrapperPostParams } from '@/request/index'
import { setExtraExtensionParameterDecorator, getCacheaDecorator, setResponseDataDecorator, getMessageDecorator, getLoadingDecorator } from '@/decorator/apply'
import { handlerGetLoginInfoCache, handlerSetLoginInfoCache } from './handler/index'
import { toastSuccess, toastError, showLoading, hideLoading } from '@/utils/changeover'

// set response tips
const setMessageDecorator = getMessageDecorator({ success: toastSuccess, error: toastError })
const setLoadingDecorator = getLoadingDecorator(showLoading, hideLoading)

export default new class Api {
	@setExtraExtensionParameterDecorator({ test: 1 })
  refreshToken = wrapperGet('/restful/v1/aky/refreshToken')

	@getCacheaDecorator(handlerGetLoginInfoCache)
	@setResponseDataDecorator(handlerSetLoginInfoCache)
  @setMessageDecorator({ msgKey: 'message' })
  @setLoadingDecorator
  appLogin = wrapperPostParams('/restful/v1/aky/appLogins')

  @setMessageDecorator({ msgKey: 'message' })
  logout = wrapperGet('/restful/v1/aky/logout')

  GetSensorData = wrapperGet('http://127.0.0.1/GetSensorData')
  GetOnOffState = wrapperGet('http://127.0.0.1/GetOnOffState')
}()
