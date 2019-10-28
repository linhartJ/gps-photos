import { BrowserWindow, app } from "electron";
import Main from "./main";
import { createMainMenu } from "./mainMenu";
import { AppActions, initAppActions } from "./appActions";
import { createSelectFileAction } from "./fileBrowser";

Main.main(app, BrowserWindow, (window: BrowserWindow) => {
    const appActions: AppActions = {
        quit: Main.quit,
        selectFile: createSelectFileAction(window)
    };
    initAppActions(appActions);
    createMainMenu();
});
