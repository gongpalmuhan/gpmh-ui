import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const packageName = process.argv[2];

if (!['tokens', 'ui'].includes(packageName)) {
  throw new Error('Expected a package name: tokens or ui.');
}

const packageDirectory = resolve(import.meta.dirname, '..', 'packages', packageName);
const source = resolve(packageDirectory, 'src');
const destination = resolve(packageDirectory, 'dist');

await mkdir(destination, { recursive: true });

for (const asset of packageName === 'tokens' ? ['tokens.css'] : ['styles.css']) {
  await rm(resolve(destination, asset), { force: true });
  await cp(resolve(source, asset), resolve(destination, asset));
}
