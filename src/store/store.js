import Vuex from 'vuex'


export default ()=>{
  new Vuex.Store({
    state: {
      count: 1
    },
    mutations: {
      add(state) {
        state.count += 1
      }
    }
  })
}

