import { MutationTree } from 'vuex'
import { ipcRenderer } from 'electron'
import { downloaderState } from './types'

export const mutations: MutationTree<downloaderState> = {
  async download(state, params) {
    state.downloadUrl = params.downloadUrl
    ipcRenderer.send('download', {
      url: params.downloadUrl,
      id: params.id,
      filename: params.filename,
    })
  },

  init(state) {
    ipcRenderer.on('downloadOnStarted', (event, data) => {
      let { id, totalBytes, name } = data
      state.downloads.unshift({ id, totalBytes: totalBytes, progress: 0, name })
    })

    ipcRenderer.on('downloadOnProgress', (event, data) => {
      let { id, progress } = data
      state.downloads.forEach(item => {
        if (item.id === id) item.progress = progress
      })
    })
  },
}
