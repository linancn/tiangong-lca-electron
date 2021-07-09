import * as child from 'child_process';

export default function DockerBuider(platform: string): string {
  let msg = '';
  switch (platform) {
    case 'windows':
      msg = child.execSync('docker stop 5153627520c0').toString();
      break;
    case 'mac':
      msg = child.execSync('docker stop 5153627520c0').toString();
      break;
    default:
      break;
  }
  return msg;
}
