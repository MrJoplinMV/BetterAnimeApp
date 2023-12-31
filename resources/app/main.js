const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');
const { ElectronBlocker, fullLists } = require('@cliqz/adblocker-electron');
const localShortcut = require('electron-localshortcut');

const createWindow = async () => {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600,
  });

  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'image', 'better@1x.ico'),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  mainWindowState.manage(mainWindow);

  mainWindow.loadURL('https://betteranime.net/login');

  mainWindow.setMenu(null);

  mainWindow.removeMenu();

  mainWindow.on('closed', () => {
    app.quit();
  });

  const blocker = await ElectronBlocker.fromLists(fetch, fullLists, {
    enableCompression: true,
  });

  blocker.enableBlockingInSession(mainWindow.webContents.session);

  localShortcut.register(mainWindow, 'F5', () => {
    mainWindow.reload();
  });

};

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('SiteAtivo', (event, isSiteAtivo) => {
  if (isSiteAtivo) {

    defineInSession();

  } else {

    defineOutSession();

  }
});

function defineInSession() {
  console.log('InSession: Sessão Válida, recursos acessíveis.');
}

function defineOutSession() {
  console.log('OutSession: Sessão Inválida, recursos restritos.');
}