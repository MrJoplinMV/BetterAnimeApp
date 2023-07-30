const { ipcRenderer } = require('electron');

// Verifica se o site está ativo
function isSiteAtivo() {
  // Aqui podemos adicionar a lógica para verificar se o site está ativo.
  // Fazendo uma request http ou verificando a presença de um elemento específico.

  // Retorne true se estiver ativo e false caso contrário.
  return true; // Exemplo considerando o site sempre ativo.
}

// Enviar o resultado para o processo principal
ipcRenderer.send('SiteAtivo', isSiteAtivo());

// Expondo as funções para a janela de renderização
window.defineInSession = function () {
  ipcRenderer.send('defineInSession');
};

window.defineOutSession = function () {
  ipcRenderer.send('defineOutSession');
};