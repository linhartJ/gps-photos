import { BrowserWindow } from "electron";
import * as Shortcuts from "electron-localshortcut";

export class KeyboardShortcuts {
    private window: BrowserWindow;

    constructor(window: Electron.BrowserWindow) {
        this.window = window;
    }

    register = (accelerator: string, action: () => void): KeyboardShortcuts => {
        Shortcuts.register(this.window, accelerator, action);
        return this
    }

}