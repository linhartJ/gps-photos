import { BrowserWindow } from 'electron';
import { KeyboardShortcuts } from "./keyboardShortcuts";

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object.
        Main.mainWindow = null;
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600 });
        Main.initShortcuts();
        Main.mainWindow.maximize();
        Main.mainWindow.loadFile("index.html");
        Main.mainWindow.on('closed', Main.onClose);
    }

    private static initShortcuts() {
        new KeyboardShortcuts(Main.mainWindow)
            .register("F12", () => Main.mainWindow.webContents.openDevTools())
            .register("F5", () => Main.mainWindow.reload());
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies. This
        // makes the code easier to write tests for
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }

    static quit() {
        Main.onWindowAllClosed();
    }

}
