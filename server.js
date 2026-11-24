// Hostinger Node.js entry point. Run TypeScript through tsx so TypeScript-only
// imports are transpiled before Node loads the Express application.
import { spawn } from 'node:child_process';

const child = spawn(process.execPath, ['./node_modules/tsx/dist/cli.mjs', 'server.ts'], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => process.exit(code ?? 1));
