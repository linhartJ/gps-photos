import { Menu } from "electron";
import { AppActions, getAppActions } from "./appActions";

class MainMenu {
    constructor(menu: typeof Menu, appActions: AppActions) {
        const template = this.createTemplate(appActions);
        menu.setApplicationMenu(menu.buildFromTemplate(template));
    }

    private createTemplate = (actions: AppActions): (Electron.MenuItem | Electron.MenuItemConstructorOptions)[] => {
        return [
            {
                label: "Soubor",
                submenu: [
                    { label: "Otevřít", click: actions.selectFile, accelerator: "CommandOrControl+O" },
                    { type: "separator" },
                    { label: "Ukončit", click: actions.quit, accelerator: "CommandOrControl+W" }
                ]
            }
        ]
    }

}

export function createMainMenu() {
    new MainMenu(Menu, getAppActions());
}
