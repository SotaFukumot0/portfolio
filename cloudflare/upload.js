import { fileURLToPath } from 'url';
import { dirname, join, extname, relative } from 'path';
import { readdirSync, statSync } from 'fs';
import { execSync } from 'child_process';

const UNITY_R2_BUCKET="unity-builds"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const UNITY_DIR = join(__dirname, '../Unity');

const MIME_TYPES = {
  '.wasm': 'application/wasm',
  '.js': 'application/javascript',
  '.data': 'application/octet-stream',
  '.json': 'application/json',
  '.txt': 'text/plain',
};

function getMimeType(filename) {
  const ext = extname(filename);
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function uploadDir(baseDir, currentDir = baseDir) {
  const files = readdirSync(currentDir);
  for (const file of files) {
    const fullPath = join(currentDir, file);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      uploadDir(baseDir, fullPath); // 再帰的に処理
    } else {
      const relativePath = relative(baseDir, fullPath).replace(/\\/g, '/'); // Windows対応
      const contentType = getMimeType(file);
      const cmd = `npx wrangler r2 object put ${UNITY_R2_BUCKET}/${relativePath} --file "${fullPath}" --content-type "${contentType}" --remote`;
      console.log('Running command:', cmd);
      console.log(`Uploading ${relativePath} as ${contentType}...`);
      execSync(cmd, { stdio: 'inherit' });
    }
  }
}

uploadDir(PROJECT_ROOT,UNITY_DIR);
