import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import { download } from 'electron-dl'

export default () => {
  // 注册下载事件
  ipcMain.on('download', (e, params) => {
    // 默认使用本地音乐文件夹
    // 本地若不存在该目录会自动创建
    let downloadFolder = params.downloadDirectoryPath || app.getPath('music')
    let downloadUrl = params.url
    const win = BrowserWindow.getFocusedWindow() as BrowserWindow

    download(win, downloadUrl, {
      filename: `${params.filename}.mp3`,
      directory: downloadFolder,
      onStarted(downloadItem: any) {
        win.webContents.send('downloadOnStarted', {
          id: params.id,
          name: params.filename,
          totalBytes: downloadItem.getTotalBytes(),
        })
      },
      onProgress(progress: any) {
        win.webContents.send('downloadOnProgress', {
          id: params.id,
          name: params.filename,
          progress: progress.percent * 100,
        })
      },
    }).then(() => {
      win.webContents.send('downloadSuccess', {
        id: params.id,
        name: params.filename,
      })
    }).catch(() => {
      win.webContents.send('downloadError', {
        id: params.id,
        name: params.filename,
        error: e,
      })
    })
  })

  // 选择下载路径
  ipcMain.on('openDialog', async (event) => {
    const win = BrowserWindow.getFocusedWindow() as BrowserWindow
    const result = await dialog.showOpenDialog({
      buttonLabel: '确定',
      properties: ['openDirectory'],
    })

    if (!result.canceled) {
      win.webContents.send('setDownloadPath', {
        path: result.filePaths[0],
      })
    }
  })

  // 打开本地下载文件夹
  ipcMain.on('openDownloadDirectory', async (event, params) => {
    let downloadFolder = params.downloadDirectoryPath || app.getPath('music')
    shell.openPath(downloadFolder)
  })
}
