import fs from 'fs';
import path from 'path';

const rootDir = path.resolve(__dirname, '..');

const environmentVariables = fs.readFileSync(
  path.join(rootDir, fs.existsSync(path.join(rootDir, '.env')) ? '.env' : '.env.example'),
  'utf-8'
);

fs.writeFileSync(path.join(rootDir, '.dev.vars'), environmentVariables);
