import dotenv from 'dotenv'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import azureV2 from "azure-storage"
import * as azureV10 from "@azure/storage-blob" // not using this version
import utils from './utils/functions'

dotenv.config()

window.axios = axios;
Vue.config.productionTip = false

window.azureV2 = azureV2
window.azureV10 = azureV10
window.utils = utils
window.store_account = 'https://sacmyit001.blob.core.windows.net/'
window.rootFolder = 'blbmyit001'

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
