import { createWriteStream, createReadStream } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib';

async function compressFile(inputPath, outputPath) {
  await pipeline(
    createReadStream(inputPath),
    createGzip(),
    createWriteStream(outputPath),
  );
  
  console.log(`Compressed ${inputPath} -> ${outputPath}`);
}

async function main() {
  const executable = join('executables', 'index.js');
  
  console.log('Preparing release assets...');
  
  await compressFile(
    executable,
    join('executables', `lyric-timer-${process.platform}-${process.arch}.gz`),
  );
  
  console.log('\nExecutables prepared in executables/ directory');
}

main().catch(console.error);
