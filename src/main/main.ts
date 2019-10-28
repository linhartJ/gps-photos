import { BrowserWindow } from 'electron';
import { KeyboardShortcuts } from "./keyboardShortcuts";

export default class Main {
    static mainWindow: Electron.BrowserWindow | undefined;
    static application: Electron.App;
    static BrowserWindow;
    static whenReady: (mainWindow: Electron.BrowserWindow) => void = () => undefined;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object.
        Main.mainWindow = undefined;
    }

    private static onReady() {
        const window = new Main.BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });
        Main.mainWindow = window;
        Main.initShortcuts(window);
        window.maximize();
        window.loadFile("index.html");
        window.on('closed', Main.onClose);
        Main.whenReady(window);
    }

    private static initShortcuts(window: BrowserWindow) {
        new KeyboardShortcuts(window)
            .register("F12", () => window.webContents.openDevTools())
            .register("F5", () => window.reload());
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow, whenReady: (BrowserWindow) => void) {
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies. This
        // makes the code easier to write tests for
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        app.on('window-all-closed', Main.onWindowAllClosed);
        app.on('ready', Main.onReady);
        Main.whenReady = whenReady;
    }

    static quit() {
        Main.onWindowAllClosed();
    }

}
