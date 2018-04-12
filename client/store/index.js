import Vuex from 'vuex'
import defaultState from './state'
import getters from './getters'
import mutations from './mutations'
import action from './action'


export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    action,
  })
}

