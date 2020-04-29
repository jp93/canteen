import bridge from '@/bridge/h5'
import APIS from "@/apis"
import * as types from './mutation-type'

// export const getHomeSlider = ({commit, state}, data) => {
//   return new Promise((resolve, reject) => {
//     bridge.Request.get(APIS.BACKEND_DOMAIN + APIS.GET_HOME_SLIDER)
//       .then(res => {
//         if (res.code == 'SUCCESS') {
//           commit(types.GET_SWIPER_LIST, res.data)
//           resolve(res.data)
//         } else {
//           reject(new Error(res.message))
//         }
//       })
//       .catch(e => {
//         reject(e)
//       })
//   })
// }


export const resetProductList = ({commit, state}, data) => {
	commit('resetProductList', data)
}

/*
 * data = {
 *   path: 'setAttr的设置state属性路径',
 *   value: 设置的值
 * }
 * */
export const setAttr = ({commit, state}, data) => {
  commit('setAttr', data)
}
