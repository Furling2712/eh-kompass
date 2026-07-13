import { randomBytes, scryptSync } from 'node:crypto';

const password = process.argv[2];

if (!password) {
  console.error('Benutzung: npm run staff:hash -- "DeinPasswort"');
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, Buffer.from(salt, 'hex'), 64).toString('hex');

console.log('\nTrage das in deine .env ein:\n');
console.log(`STAFF_PASSWORD_HASH=${salt}:${hash}`);
console.log('');
