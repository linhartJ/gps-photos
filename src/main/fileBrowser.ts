import { BrowserWindow, dialog } from "electron";
import { ActionEvent } from "./events";

class FileBrowser {
    private window: BrowserWindow;

    constructor(window: Electron.BrowserWindow) {
        this.window = window;
    }

    selectPhoto = (): void => {
        const selectedFiles = dialog.showOpenDialogSync(this.window, {
            properties: ["openFile"],
            filters: [{ name: 'Fotografie', extensions: ['jpg', 'jpeg', 'png', 'raw'] }]
        });
        const path = selectedFiles && selectedFiles[0];
        this.window.webContents.send(ActionEvent.PhotoSelected, path)
    }

}

export function createSelectFileAction(window: BrowserWindow): () => void {
    return () => {
        new FileBrowser(window).selectPhoto();
    }
}