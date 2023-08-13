const { ipcRenderer } = require('electron');

function isSiteAtivo() {
  return true;
}

ipcRenderer.send('SiteAtivo', isSiteAtivo());

window.defineInSession = function () {
  ipcRenderer.send('defineInSession');
};

window.defineOutSession = function () {
  ipcRenderer.send('defineOutSession');
};