import { wrapperPost, wrapperGet } from '@/request/index.js'

import { setExtraExtensionParameterDecorator } from '@/decorator/apply'

export default new class Api {
   @setExtraExtensionParameterDecorator({ test: 1 })
   get = wrapperGet('https://suggest.taobao.com/sug?code=utf-8&q=%E5%9B%BE%E7%89%87&callback=cb')
}()
