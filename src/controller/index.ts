import fs from 'fs';

const files: string[] = fs.readdirSync(__dirname)
files.forEach(f => {
  if (f !== 'index.ts') {
    require(`./${f}`);
  }
})