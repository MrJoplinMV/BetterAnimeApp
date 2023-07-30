# Funcionalidades do Código Electron.

O código fornecido é um aplicativo desktop criado com o framework Electron, que permite criar aplicativos multiplataforma usando tecnologias web, como HTML, CSS e JavaScript. Ele tem como finalidade exibir uma janela do navegador que carrega a página inicial "https://betteranime.net/login", um site dedicado a animes, e possui funcionalidades específicas relacionadas à janela do aplicativo e à funcionalidade de bloqueio de anúncios.

## Funcionalidades

1. **Janela Principal**
   - O código cria uma janela principal usando o módulo `BrowserWindow` do Electron.
   - A janela é criada com uma posição e tamanho inicial definidos e é capaz de ser redimensionada pelo usuário, mas tem uma largura mínima de 800 pixels e uma altura mínima de 600 pixels.
   - O ícone da janela é definido usando o arquivo "better@1x.ico" localizado na pasta "image" do diretório do aplicativo.

2. **Estado da Janela**
   - O módulo `electron-window-state` é utilizado para preservar o estado da janela, incluindo posição e tamanho, entre as execuções do aplicativo.
   - Quando a janela é fechada, o estado atual é salvo e, quando o aplicativo é iniciado novamente, a janela é restaurada à sua posição e tamanho anteriores.

3. **Carregamento da Página**
   - A página "https://betteranime.net/login" é carregada na janela principal usando `mainWindow.loadURL()`.
   - O aplicativo, portanto, abre em uma página de login do site "betteranime.net".

4. **Remoção da Barra de Menu**
   - O código remove a barra de menu padrão do aplicativo usando `mainWindow.setMenu(null)` e `mainWindow.removeMenu()`.
   - Isso cria uma interface mais limpa, com uma janela sem a barra de menus do sistema operacional.

5. **Bloqueio de Anúncios**
   - O módulo `@cliqz/adblocker-electron` é utilizado para bloquear anúncios na janela do aplicativo.
   - O ElectronBlocker é inicializado a partir de listas de bloqueio completas (`fullLists`) usando `ElectronBlocker.fromLists()`.
   - O bloqueio de anúncios é ativado na sessão da janela principal com `blocker.enableBlockingInSession(mainWindow.webContents.session)`.

6. **Comportamento de Fechamento e Minimização**
   - Quando a janela é fechada pelo usuário, o evento 'closed' é acionado e o aplicativo é encerrado usando `app.quit()`.
   - O aplicativo também pode ser fechado usando os métodos padrão do sistema operacional (por exemplo, clicando no botão "X" da janela).
   - O aplicativo responde ao evento 'window-all-closed', fechando-se completamente apenas se o sistema operacional não for macOS (pois é comum manter os aplicativos abertos após o fechamento da janela nesse sistema).
   - Caso todas as janelas sejam fechadas e o usuário clique no ícone do aplicativo (no dock ou taskbar, por exemplo), a função `createWindow()` é chamada novamente para criar uma nova janela.

## Outros Detalhes

Além das funcionalidades acima, há alguns detalhes adicionais no código:

- O código contém uma verificação para `electron-squirrel-startup`, que é uma biblioteca utilizada para a instalação de aplicativos Electron.
- O aplicativo é iniciado chamando a função `createWindow()` no evento 'ready' do aplicativo.
- O código define funções vazias para os eventos 'minimize', 'maximize' e 'restore', mas esses eventos não têm nenhuma funcionalidade associada a eles no código fornecido.

## Como Executar o Aplicativo

1. Clone ou baixe o repositório contendo o código-fonte.
2. Navegue para o diretório do projeto.
3. Execute o .exe chamado "betteranime.exe" na pasta raiz do projeto  para que a página seja criada executado os códigos.
4. Se divirta vendo seus animes.

**Observação:** Certifique-se de ter uma conexão com a internet ao executar o aplicativo, pois ele carregará a página "https://betteranime.net/login". Além disso, o aplicativo bloqueará anúncios nessa página usando o módulo de bloqueio de anúncios.
