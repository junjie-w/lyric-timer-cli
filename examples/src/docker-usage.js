import { execSync } from 'child_process';

const IMAGE_NAME = 'junjiewu0/lyric-timer-cli';
const IMAGE_TAG = 'latest';
const CONTAINER_NAME = 'lyric-timer-example';

console.log(`
🐳 LyricTimer Docker Example
===========================
`);

let isArm = false;
try {
  const arch = execSync('uname -m').toString().trim();
  isArm = arch === 'arm64' || arch === 'aarch64';
} catch (error) {
  console.error('\n❌ Error:', error);
  isArm = false;
}

const runDocker = (platformFlag = '') => {
  console.log('1. Pulling Docker image...');
  execSync(`docker pull ${platformFlag}${IMAGE_NAME}:${IMAGE_TAG}`, { stdio: 'inherit' });

  console.log('\n2. Starting LyricTimer in container...');
  execSync(`docker run ${platformFlag}-it --rm --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}`, {
    stdio: 'inherit',
  });
};

try {
  if (isArm) {
    console.log(`
⚠️  ARM64 Architecture Detected (Apple Silicon Macs)
Running with platform flag...
`);
    runDocker('--platform linux/amd64 ');
  } else {
    runDocker();
  }
} catch (error) {
  console.error('\n❌ Error:', error);

  console.log(`
Troubleshooting:
1. Make sure Docker is running
2. For ARM-based machines (Apple Silicon, etc.), try manually:
   docker run --platform linux/amd64 -it ${IMAGE_NAME}:${IMAGE_TAG}

3. For other architectures:
   docker run -it ${IMAGE_NAME}:${IMAGE_TAG}

Note: The -it flags are required for interactive CLI tools.
`);
}
