import mutations from './mutations'
import * as actions from './actions'

const state = {
   selectDepartmentId:{},
   deviceCheck:{
    resource:[],
    description:'',
    signImg:''
   }

}

export default {
 namespaced: true,
  state,
  actions,
  mutations
}
