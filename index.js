const electron = require('electron')
const path = require('path')
// const all = require('@electron/get')
const fs = require('fs')
const axios = require('axios')
const {app, BrowserWindow,dialog,ipcMain} = electron;
var mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      webSecurity:false,
      nodeIntegration:true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // globalShortcut.register('ESC', () => {
  //   win.setFullScreen(false);
  // })
  mainWindow.loadFile('./dist/index.html')
  // mainWindow.loadURL('http://ttnjs.wang/')
  // mainWindow.loadURL('https://www.baidu.com/')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  mainWindow.webContents.send('message', 'text')

  handleUpdate()
  
})
// const electronLog = require('electron-log')
const { autoUpdater } = require('electron-updater')


ipcMain.on('message',(e,a)=>{
  console.log(e,a)
})
// autoUpdater.setFeedURL('http://ttnjs.wang/pcApp/')
// autoUpdater.on('update-downloaded', () => {
//   autoUpdater.quitAndInstall()
// })
// autoUpdater.checkForUpdates()
// app.on('ready', () => {
//   if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
// })



function handleUpdate() {
  const returnData = {
      error: {status: -1, msg: '检测更新查询异常'},
      checking: {status: 0, msg: '正在检查应用程序更新'},
      updateAva: {status: 1, msg: '检测到新版本，正在下载,请稍后'},
      updateNotAva: {status: -1, msg: '您现在使用的版本为最新版本,无需更新!'},
  };

  // autoUpdater.logger = electronLog
  // electronLog.transports.file.level = "info"
  //和之前package.json配置的一样
  autoUpdater.setFeedURL('http://ttnjs.wang/pcApp/')

  //更新错误
  autoUpdater.on('error', function (error) {
      sendUpdateMessage('errors:'+returnData.error)
  });

  //检查中
  autoUpdater.on('checking-for-update', function () {
      sendUpdateMessage('updates:'+returnData.checking)
  });

  //发现新版本
  autoUpdater.on('update-available', function (info) {
      sendUpdateMessage('available:'+returnData.updateAva)
    return;
  });

  //当前版本为最新版本
  autoUpdater.on('update-not-available', function (info) {
      setTimeout(function () {
          sendUpdateMessage('notavailable:'+returnData.updateNotAva)
      }, 1000);
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
      mainWindow.webContents.send('downloadProgress'+progressObj)
  });


  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    
      sendUpdateMessage('download success!')
      // ipcMain.on('isUpdateNow', (e, arg) => {
      //     //some code here to handle event
          // autoUpdater.quitAndInstall();
      // });
      
      // mainWindow.webContents.send('isUpdateNow')
  });

  //执行自动更新检查
  autoUpdater.checkForUpdates();
}
function sendUpdateMessage(text) {
  dialog.showMessageBox({
    message :text
  })
  // mainWindow.webContents.send('message', text)
}
