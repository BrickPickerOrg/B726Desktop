import { MutationTree } from 'vuex'
import { ipcRenderer, remote } from 'electron'
import { downloaderState } from './types'

export const mutations: MutationTree<downloaderState> = {
  async download(state, params) {
    ipcRenderer.send('download', {
      url: params.downloadUrl,
      id: params.id,
      filename: params.filename,
      downloadDirectoryPath: localStorage.getItem('downloadDirectoryPath')
    })
  },

  // 选择歌曲文件下载路径
  async openPathDialog(state, params) {
    ipcRenderer.send('openDialog')
  },

  // 选择本地下载文件夹
  async openDownloadDirectory(state, params) {
    ipcRenderer.send('openDownloadDirectory', {
      downloadDirectoryPath: localStorage.getItem('downloadDirectoryPath')
    })
  },

  init(state) {
    // 监听歌曲下载开始事件
    ipcRenderer.on('downloadOnStarted', (event, data) => {
      let { id, totalBytes, name } = data
      state.downloads.unshift({ id, totalBytes: totalBytes, progress: 0, name })
    })

    // 监听歌曲下载进度
    ipcRenderer.on('downloadOnProgress', (event, data) => {
      let { id, progress } = data
      state.downloads.forEach(item => {
        if (item.id === id) item.progress = progress
      })
    })

    // 监听歌曲下载成功
    ipcRenderer.on('downloadSuccess', (event, data) => {
      let { id, filename } = data
    })

    // 监听歌曲下载错误
    ipcRenderer.on('downloadError', (event, data) => {
      let { id, filename } = data
    })

    // 监听选择本地下载文件路径
    ipcRenderer.on('setDownloadPath', (event, data) => {
      let { path } = data
      localStorage.setItem('downloadDirectoryPath', path)
    })
  },
}
