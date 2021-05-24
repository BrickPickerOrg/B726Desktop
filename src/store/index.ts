import { playing } from './playing/index'
import { lyric } from './lyric/index'
import { downloader } from './downloader/index'
import { createStore } from 'vuex'

export default createStore({
  modules: {
    playing,
    lyric,
    downloader
  }
})
