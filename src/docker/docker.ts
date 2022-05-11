import * as child from "child_process";
import { BrowserWindow } from "electron";

export default function DockerBuider(platform: string): string {
  const mainwindow = BrowserWindow.fromId(1);
  let msg = "";
  switch (platform) {
    case "win32":
      const dbpull = child.spawn("cmd.exe", [
        "/C",
        "docker pull postgres:14 && docker ps",
      ]);
      dbpull.stdout.on("data", (data) => {
        console.log(`${data}`);
        mainwindow?.webContents.send(`${data}`);
      });
      dbpull.stderr.on("data", (data) => {
        console.error(`${data}`);
      });
      dbpull.on("close", function (code) {
        console.log(`child process exited with code ${code}`);
        mainwindow?.webContents.send(`code ${code}`);
      });
      break;
    case "darwin":
      msg = child.execSync("docker pull postgres:14 && docker ps").toString();
      break;
    default:
      break;
  }
  return msg;
}
