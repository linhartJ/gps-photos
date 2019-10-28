import { ipcRenderer } from "electron";
import { ActionEvent } from "./events";

ipcRenderer.on(ActionEvent.PhotoSelected, (e, path: string | undefined) => {
    const el = document.getElementById("mainArea");
    if (el !== null && path !== undefined) {
        el.innerHTML = path;
    }
});
