import { app, BrowserWindow, ipcMain } from "electron"
import { download } from 'electron-dl'

export default () => {
  // 注册下载事件
  ipcMain.on('download', (e, params) => {
    let downloadFolder = app.getPath("music")
    let downloadUrl = params.url
    const win = BrowserWindow.getFocusedWindow()

    download(win as BrowserWindow, downloadUrl, {
      filename: `${params.filename}.mp3`,
      directory: downloadFolder, // 本地若不存在该目录会自动创建
      onStarted(downloadItem: any) {
        (win as BrowserWindow).webContents.send('downloadOnStarted', {
          id: params.id,
          name: params.filename,
          totalBytes: downloadItem.getTotalBytes(),
        })
      },
      onProgress(progress: any) {
        (win as BrowserWindow).webContents.send('downloadOnProgress', {
          id: params.id,
          name: params.filename,
          progress: progress.percent * 100,
        })
      },
    })
    // .then(() => {
    //   // console.log(downloadItem)
    //   win.webContents.send('download-success', {
    //     id: args.id,
    //     song: args.song,
    //     downloadFolder,
    //     downloadUrl,
    //   })
    // })
    // .catch(() => {
    //   win.webContents.send('download-error', {
    //     id: args.id,
    //     error: e,
    //   })
    // })
  })
}
