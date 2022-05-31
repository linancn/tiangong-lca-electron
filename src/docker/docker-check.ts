import * as child from "child_process";
import { app, BrowserWindow, ipcMain } from "electron";
import axios from "axios";

export default function DockerBuider(platform: string) {
  const mainwindow = BrowserWindow.fromId(1);
  let isStarted = false;

  const axiosClient = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const Sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const backendCheck = (id: number) => {
    axiosClient
      .get("/api/project/count")
      .then(() => {
        console.log("ok");
        if (mainwindow != null) mainwindow.loadURL("http://localhost:8000");
      })
      .catch(async () => {
        console.log("err");
        mainwindow?.webContents.send("data", `Backend starting... (${id})`);
        await Sleep(1000);
        backendCheck(id + 1);
      });
  };

  switch (platform) {
    case "win32":
      const dockercheck = child.spawn("cmd.exe", ["/C", "docker-check.bat"]);
      dockercheck.stdout.on("data", (data) => {
        console.log(`message: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
        if (`${data}`.search("Docker services started.") > -1) {
          isStarted = true;
          backendCheck(0);
        }
      });

      dockercheck.stderr.on("data", (data) => {
        console.error(`error: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
      });

      dockercheck.on("close", function (code) {
        console.log(`close: ${code}`);
        if (!isStarted) mainwindow?.webContents.send("close", `${code}`);
      });

      break;
    case "darwin":
      const dockercheckmac = child.spawn("/bin/sh", ["-c", "docker-check.sh"]);
      dockercheckmac.stdout.on("data", (data) => {
        console.log(`message: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
        if (`${data}`.search("Docker services started.") > -1) {
          isStarted = true;
          backendCheck(0);
        }
      });

      dockercheckmac.stderr.on("data", (data) => {
        console.error(`error: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
      });

      dockercheckmac.on("close", function (code) {
        console.log(`close: ${code}`);
        if (!isStarted) mainwindow?.webContents.send("close", `${code}`);
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
        if (`${data}`.search("Docker services started.") > -1) {
          isStarted = true;
          backendCheck(0);
        }
      });

      dockerchecklinux.stderr.on("data", (data) => {
        console.error(`error: ${data}`);
        mainwindow?.webContents.send("data", `${data}`);
      });

      dockerchecklinux.on("close", function (code) {
        console.log(`close: ${code}`);
        if (!isStarted) mainwindow?.webContents.send("close", `${code}`);
      });
      break;
  }
}
