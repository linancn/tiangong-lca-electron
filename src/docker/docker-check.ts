import * as child from "child_process";
import { BrowserWindow, ipcMain } from "electron";

export default function DockerBuider(platform: string) {
  const mainwindow = BrowserWindow.fromId(1);
  let closeCode: number | null = -1;
  let errs: string[] = [];

  switch (platform) {
    case "win32":
      const dockercheck = child.spawn("cmd.exe", ["/C", "docker-check.bat"]);
      dockercheck.stdout.on("data", (data) => {
        console.log(`${data}`);
        mainwindow?.webContents.send("data", `${data}`);
      });
      dockercheck.stderr.on("data", (data) => {
        console.error(`${data}`);
        errs.push(data);
        mainwindow?.webContents.send("data", `${data}`);
      });
      dockercheck.on("close", function (code) {
        closeCode = code;
        mainwindow?.webContents.send("close", `${code}`);
      });
      break;
    case "darwin":
      const dockercheckmac = child.spawn("/bin/sh", ["-c", "docker-check.sh"]);
      dockercheckmac.stdout.on("data", (data) => {
        console.log(`${data}`);
        mainwindow?.webContents.send("data", `${data}`);
      });
      dockercheckmac.stderr.on("data", (data) => {
        console.error(`${data}`);
        errs.push(data);
        mainwindow?.webContents.send("data", `${data}`);
      });
      dockercheckmac.on("close", function (code) {
        closeCode = code;
        mainwindow?.webContents.send("close", `${code}`);
      });
      break;
    default:
      const dockerchecklinux = child.spawn("/bin/sh", [
        "-c",
        "docker-check.sh",
      ]);
      dockerchecklinux.stdout.on("data", (data) => {
        console.log(`${data}`);
        mainwindow?.webContents.send("data", `${data}`);
      });
      dockerchecklinux.stderr.on("data", (data) => {
        console.error(`${data}`);
        errs.push(data);
        mainwindow?.webContents.send("data", `${data}`);
      });
      dockerchecklinux.on("close", function (code) {
        closeCode = code;
        mainwindow?.webContents.send("close", `${code}`);
      });
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
}
