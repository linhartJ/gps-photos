import { BrowserWindow, app } from "electron";
import Main from "./main";
import { createMainToolbar } from "./mainMenu";

Main.main(app, BrowserWindow);
createMainToolbar(Main);