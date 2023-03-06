// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
  contextBridge.exposeInMainWorld("electron", {
    OpenWindow: () => ipcRenderer.send("Open-window"),
  });
  contextBridge.exposeInMainWorld("elec_pwd", process.cwd);
  contextBridge.exposeInMainWorld("chdir", process.chdir);
  contextBridge.exposeInMainWorld("elec_ls", fs.readdir);
  contextBridge.exposeInMainWorld("elec_touch", fs.writeFileSync);
  contextBridge.exposeInMainWorld("elec_cat", fs.readFileSync);
  contextBridge.exposeInMainWorld("elec_rm", fs.unlinkSync);
  //contextBridge.exposeInMainWorld("salut", process.env);
});
