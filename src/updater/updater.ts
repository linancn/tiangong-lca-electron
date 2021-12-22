import { app, dialog } from "electron";
import { AppImageUpdater, MacUpdater, NsisUpdater } from "electron-updater";
import log from "electron-log";
import { AllPublishOptions } from "builder-util-runtime";

function updateHandle() {
  const options = {
    provider: "github",
    owner: "linancn",
    repo: "Electron-CrystaLCA",
  } as AllPublishOptions;

  let autoUpdater: any;
  if (process.platform === "win32") {
    autoUpdater = new NsisUpdater(options);
  } else if (process.platform === "darwin") {
    autoUpdater = new MacUpdater(options);
  } else {
    autoUpdater = new AppImageUpdater(options);
  }

  autoUpdater.autoDownload = false;

  log.transports.file.level = "debug";
  autoUpdater.logger = log;
  log.info("client version", app.getVersion());

  autoUpdater.on("error", (error: { stack: any } | null) => {
    log.info(
      "Error: ",
      error == null ? "unknown" : (error.stack || error).toString()
    );
  });

  autoUpdater.on("checking-for-update", () => {
    log.info("Checking for update");
  });

  autoUpdater.on("update-available", (info: any) => {
    log.info("Got a new client version, will auto download it", info);
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on("update-not-available", (info: any) => {
    log.info("Current version is up-to-date", info);
  });

  autoUpdater.on("update-downloaded", (info: any) => {
    log.info(info);
    dialog
      .showMessageBox({
        type: "info",
        title: "Update",
        message: "New version finded, upgrade now?",
        buttons: ["Yes", "Later"],
      })
      .then((resp) => {
        if (resp.response === 0) {
          log.info("begin to install new version ...");
          autoUpdater.quitAndInstall(true, true);
        }
      });
  });

  autoUpdater.on("download-progress", function (progressObj: any) {
    log.debug("download progress", progressObj);
  });

  autoUpdater.checkForUpdates();
}

export { updateHandle };
