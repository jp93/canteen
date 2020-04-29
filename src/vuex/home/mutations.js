import utils from '@/utils'
import * as types from './mutation-type'

const mutations = {
  ['setAttr'](state, data) {
    utils.setAttr(state, data.path, data.value)
  },
  [types.SET_SELECT_DEPARTMENT_ID](state, data) {
    state.selectDepartmentId = data
  },
  [types.RESET_DEVICE_CHECK](state, data) {
    state.deviceCheck = {
      resource:[],
      description:''
    }
  },
  [types.SET_REMARK](state, data) {
    state.deviceCheck.description = data
  },
  [types.SET_SIGN_IMG](state, data) {
    state.signImg = data
  },
  [types.RESET_SIGN_IMG](state, data) {
    state.signImg = ''
  },
  [types.RESET_SELECT_DEPARTMENT](state, data) {
    state.selectDepartmentId = {}
  }
}

export default mutations
