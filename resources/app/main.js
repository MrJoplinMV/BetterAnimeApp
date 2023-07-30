const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');
const { session } = require('electron');
const { ElectronBlocker, fullLists } = require('@cliqz/adblocker-electron');

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
      contextIsolation: false,
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

  mainWindow.on('minimize', () => {
  });

  mainWindow.on('maximize', () => {
  });

  mainWindow.on('restore', () => {
  });

  const blocker = await ElectronBlocker.fromLists(fetch, fullLists, {
    enableCompression: true,
  });

  blocker.enableBlockingInSession(mainWindow.webContents.session);
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

// Recebe o resultado da verificação do site e define a segurança da sessão.

ipcMain.on('SiteAtivo', (event, isSiteAtivo) => {
  if (isSiteAtivo) {
    // sessão válida (InSession)
    // Coloque aqui a lógica para lidar com a sessão em andamento.
    defineInSession();

  }

  else {
    // Sessão inválida (OutSession)
    // Coloque aqui a lógica para lidar com a sessão que não está em andamento.
    defineOutSession();
  }
});


// Definindo ações para o InSession.

function defineInSession() {
  console.log('InSession: Sessão Válida, recursos acessíveis.')
}

// Definindo ações para o OutSession.

function defineOutSession() {
  console.log('OutSession: Sessão Inválida, recursos restritos.')
}