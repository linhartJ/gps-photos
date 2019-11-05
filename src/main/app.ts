import {BrowserWindow, app, ipcMain} from "electron";
import Main from "./main";
import { createMainMenu } from "./mainMenu";
import {AppActions, getAppActions, initAppActions} from "./appActions";
import { createSelectFileAction } from "./fileBrowser";
import {ActionEvent} from "./events";

Main.main(app, BrowserWindow, (window: BrowserWindow) => {
    const appActions: AppActions = {
        quit: Main.quit,
        selectFile: createSelectFileAction(window)
    };
    initAppActions(appActions);
    createMainMenu();
});

ipcMain.on(ActionEvent.PhotoSelected, () => {
    getAppActions().selectFile();
});
