var electron = require('electron');
var app = require("app");
var BrowserWindow = require("browser-window");
var ipc = require("electron").ipcMain;
var mainWindow, viewerWindow;

app.on("ready", function () {
  var electronScreen = electron.screen;
  var displays = electronScreen.getAllDisplays();
  var externalDisplay = null;
  for (var i in displays) {
    if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
      externalDisplay = displays[i];
      break;
    }
  }
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  mainWindow.loadURL("file://" + __dirname + "/www/index.html");

  viewerWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: externalDisplay.bounds.x + 50,
    y: externalDisplay.bounds.y + 50,
    fullscreen: true,
  });
  viewerWindow.loadURL("file://" + __dirname + "/desktop_www/viewer.html");
})

ipc.on('show-line', function(event, arg) {
  console.log('show-line app.js');
  viewerWindow.webContents.send('show-line', arg);
});