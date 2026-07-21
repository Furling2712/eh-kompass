import { randomBytes, scryptSync } from 'node:crypto';

export function printPasswordHash(password, envVarName) {
  if (!password) {
    console.error(`Benutzung: npm run <script> -- "DeinPasswort"`);
    process.exit(1);
  }

  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, Buffer.from(salt, 'hex'), 64).toString('hex');

  console.log('\nTrage das in deine .env ein:\n');
  console.log(`${envVarName}=${salt}:${hash}`);
  console.log('');
}
