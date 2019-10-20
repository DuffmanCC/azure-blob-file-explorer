import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    itemsAll: [],
    itemsCache: [],
    breadcrumbs: [],
    files: {
      folder: 'mdi-folder',
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-json',
      md: 'mdi-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel'
    }
  },

  mutations: {
    // mutation handler functions must be synchronous
  },

  actions: {
    // Instead of mutating the state, actions commit mutations.
    // Actions can contain arbitrary asynchronous operations.
  }
})
