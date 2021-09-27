import { wrapperPost, wrapperGet, wrapperPostParams } from '@/request/index'
import { setExtraExtensionParameterDecorator, getCacheaDecorator, setResponseDataDecorator } from '@/decorator/apply'
import { handlerGetLoginInfoCache, handlerSetLoginInfoCache } from './handler/index'

export default new class Api {
	@setExtraExtensionParameterDecorator({ test: 1 })
  get = wrapperGet('https://suggest.taobao.com/sug?code=utf-8&q=%E5%9B%BE%E7%89%87&callback=cb')
  
	@getCacheaDecorator(handlerGetLoginInfoCache)
	@setResponseDataDecorator(handlerSetLoginInfoCache)
  appLogin = wrapperPostParams('/restful/v1/aky/appLogin')
}()

