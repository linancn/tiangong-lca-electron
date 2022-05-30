import * as child from "child_process";

export default function DockerStop(platform: string) {
  switch (platform) {
    case "win32":
      child.spawn("cmd.exe", ["/C", "docker-stop.bat"]);
      break;
    case "darwin":
      child.spawn("/bin/sh", ["-c", "docker-stop.sh"]);
      break;
    default:
      child.spawn("/bin/sh", ["-c", "docker-stop.sh"]);
      break;
  }
}