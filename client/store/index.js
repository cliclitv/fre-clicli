import Vuex from 'vuex'
import defaultState from './state'
import getters from './getters'
import mutations from './mutations'
import action from './action'


export default ()=>{
  new Vuex.Store({
    defaultState,
    getters,
    mutations,
    action
  })
}

