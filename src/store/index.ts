import { playing } from './playing/index'
import { downloader } from './downloader/index'
import { createStore } from 'vuex'

export default createStore({
  modules: {
    playing,
    downloader
  }
})
