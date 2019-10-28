import {Menu} from "electron";

import Main from "./main";

class MainMenu {
    constructor(menu: typeof Menu, main: typeof Main) {
        const template = this.createTemplate(main.quit);
        menu.setApplicationMenu(menu.buildFromTemplate(template));
    }

    private createTemplate = (quit: () => void): (Electron.MenuItem | Electron.MenuItemConstructorOptions)[] => {
        return [
            {
                label: "Soubor",
                submenu: [
                    {label: "Otevřít"},
                    {label: "Ukončit", click: quit}
                ]
            }
        ]
    }

}

export function createMainToolbar(main: typeof Main) {
    new MainMenu(Menu, main);
}
