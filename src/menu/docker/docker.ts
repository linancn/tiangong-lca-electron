import * as child from 'child_process';

export default function DockerBuider(platform: string): string {
  let msg = '';
  switch (platform) {
    case 'windows':
      msg = child.execSync('docker ps').toString();
      break;
    case 'mac':
      msg = child.execSync('docker ps').toString();
      break;
    default:
      break;
  }
  return msg;
}
