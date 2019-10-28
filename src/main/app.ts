import { BrowserWindow, app } from "electron";
import Main from "./main";
import { createMainMenu } from "./mainMenu";

Main.main(app, BrowserWindow);
createMainMenu(Main);