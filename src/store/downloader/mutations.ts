import { MutationTree } from 'vuex'
import { ipcRenderer } from "electron";
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
}
