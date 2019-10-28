export type AppActions = {
    quit: () => void,
    selectFile: () => void
}

let actions: (AppActions | undefined) = undefined;

export function getAppActions(): AppActions {
    if (actions !== undefined) {
        return actions;
    } else {
        throw new Error("Application actions are not yet initialized");
    }
}

export function initAppActions(appActions: AppActions) {
    actions = appActions;
}