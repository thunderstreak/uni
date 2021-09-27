import { setKey, clearKey, getKey } from '@/utils/storage'
import { CLEAR_ALL_STATES } from '../types/common'
import { USER_LOGIN_INFO, SET_USER_LOGIN_INFO, GET_USER_LOGIN_INFO } from '../types/app'

const setInitializeState = () => ({
	[USER_LOGIN_INFO]: null
})

const user = {
	state: setInitializeState(),
	mutations: {
		[SET_USER_LOGIN_INFO]: (state, data) => {
			setKey(USER_LOGIN_INFO, data)
			state[USER_LOGIN_INFO] = data
		},
		[CLEAR_ALL_STATES]: (state) => {
			for (const key in state) {
				state[key] = null
			}
			clearKey()
		}
	},
	actions: {
		[SET_USER_LOGIN_INFO]({
			commit
		}, data) {
			commit(SET_USER_LOGIN_INFO, data)
		}
	},
	getters: {
		[GET_USER_LOGIN_INFO](state) {
			return state[USER_LOGIN_INFO] || getKey(USER_LOGIN_INFO)
		}
	}
}
export default user
