const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  let win = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    //Open the devtools
    win.webContents.openDevTools();
  }
  // win.loadFile('index.html')
  win.on('closed', () => (win = null));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // win === null
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
