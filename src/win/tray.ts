const { Tray, Menu, nativeTheme, BrowserWindow } = require('electron')
const path = require('path')
const lightIcon = path.join(
  __dirname,
  '..',
  '..',
  'resources',
  'tray',
  'StatusIcon_light.png'
)
const darkIcon = path.join(
  __dirname,
  '..',
  '..',
  'resources',
  'tray',
  'StatusIcon_dark.png'
)
let tray = new Tray(nativeTheme.shouldUseDarkColors ? darkIcon : lightIcon)
// 根据系统主题显示不同的主题图标
tray = new Tray(nativeTheme.shouldUseDarkColors ? darkIcon : lightIcon)
tray.setToolTip('Electron-Playground')
const contextMenu = Menu.buildFromTemplate([
  {
    label: '删除图标',
    click: () => {
      tray.destroy()
    },
  },
])
// 设置上下文菜单
tray.setContextMenu(contextMenu)
tray.setTitle("Compiled successfully")
