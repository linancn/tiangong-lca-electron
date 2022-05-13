import * as child from "child_process";
import { BrowserWindow, ipcMain } from "electron";

export default function DockerBuider(platform: string): string {
  const mainwindow = BrowserWindow.fromId(1);
  let msg = "";
  let closeCode: number | null = -1;

  let errs: string[] = [];

  switch (platform) {
    case "win32":
      const dbpull = child.spawn("cmd.exe", [
        "/C",
        "docker pull postgres:14 && docker ps",
      ]);
      dbpull.stdout.on("data", (data) => {
        console.log(`${data}`);
        mainwindow?.webContents.send("data", `${data}`);
      });
      dbpull.stderr.on("data", (data) => {
        console.error(`${data}`);
        errs.push(data);
        mainwindow?.webContents.send("data", `${data}`);
      });
      dbpull.on("close", function (code) {
        console.log(`child process exited with code ${code}`);
        closeCode = code;
        mainwindow?.webContents.send("close", `${code}`);
      });
      break;
    case "darwin":
      msg = child.execSync("docker pull postgres:14 && docker ps").toString();
      break;
    default:
      break;
  }

  ipcMain.on("code", () => {
    mainwindow?.webContents.send("close", `${closeCode}`);
  });

  ipcMain.on("err", () => {
    errs.forEach((err) => {
      mainwindow?.webContents.send("data", `${err}`);
    });
    errs = [];
  });

  return msg;
}
