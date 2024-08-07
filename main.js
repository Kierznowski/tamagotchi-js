import { app, BrowserWindow } from 'electron';
import { __dirname } from './utils.js'; 

let window;

function createWindow() {
    window = new BrowserWindow({width: 300, height: 320, show: true, 
        backgroundColor: '#086323',
    useContentSize: true,
        webPreferences: {nodeIntegration: true, contextIsolation: false, contextIsolation: true,
            enableRemoteModule: false, nodeIntegration: false,
        },
    });
    window.resizable = true;
    window.setMenu(null);
    window.loadFile('./html/index.html');

    window.webContents.openDevTools();

    window.on('closed', () => {
        window = null;
    })

    window.once('ready-to-show', () => {
        window.show();
    });
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(window === null) {
        createWindow();
    }
});