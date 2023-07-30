const { ipcRenderer } = require('electron');

// Verifica se o site está ativo
function isSiteAtivo() {
    // Aqui podemos adicionar a lógica para verificar se o site está ativo.
    // Fazendo uma request http ou verificando a presença de um elemento específico.

    // Retorne true se estiver ativo e false caso contrário.

    return true; // Exemplo considerando o site sempre ativo.

}

// Envie o resultado para o processo principal

ipcRenderer.send('SiteAtivo', isSiteAtivo());