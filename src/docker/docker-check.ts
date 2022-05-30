import * as child from "child_process";
import { app, BrowserWindow, ipcMain } from "electron";

export default function DockerBuider(platform: string) {
  const mainwindow = BrowserWindow.fromId(1);

  switch (platform) {
    case "win32":
      const dockercheck = child.spawn("cmd.exe", ["/C", "docker-check.bat"]);

      dockercheck.stdout.on("data", (data) => {
        console.log(`message: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
        if (
          mainwindow != null &&
          `${data}`.search("Docker services started.") > -1
        ) {
          mainwindow.loadURL("http://localhost:8000");
        }
      });

      dockercheck.stderr.on("data", (data) => {
        console.error(`error: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
      });

      dockercheck.on("close", function (code) {
        console.log(`close: ${code}`);
        mainwindow?.webContents.send("close", `${code}`);
      });

      break;
    case "darwin":
      const dockercheckmac = child.spawn("/bin/sh", ["-c", "docker-check.sh"]);
      dockercheckmac.stdout.on("data", (data) => {
        console.log(`message: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
        if (
          mainwindow != null &&
          `${data}`.search("Docker services started.") > -1
        ) {
          mainwindow.loadURL("http://localhost:8000");
        }
      });

      dockercheckmac.stderr.on("data", (data) => {
        console.error(`error: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
      });

      dockercheckmac.on("close", function (code) {
        console.log(`close: ${code}`);
        mainwindow?.webContents.send("close", `${code}`);
      });

      break;
    default:
      const dockerchecklinux = child.spawn("/bin/sh", [
        "-c",
        "docker-check.sh",
      ]);
      dockerchecklinux.stdout.on("data", (data) => {
        console.log(`message: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
        if (
          mainwindow != null &&
          `${data}`.search("Docker services started.") > -1
        ) {
          mainwindow.loadURL("http://localhost:8000");
        }
      });

      dockerchecklinux.stderr.on("data", (data) => {
        console.error(`error: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
      });

      dockerchecklinux.on("close", function (code) {
        console.log(`close: ${code}`);
        mainwindow?.webContents.send("close", `${code}`);
      });
      break;
  }
}
