import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recents: []
  },
  mutations: {
    ADD: function (state, element) {
      if (!element || state.recents.includes(element)) return
      state.recents.push(element)
    },
    ADD_MULTIPLE: function (state, elements) {
      elements.filter(element => !state.recents.includes(element))
        .map(element => state.recents.push(element))
    }
  }
})

export default store
