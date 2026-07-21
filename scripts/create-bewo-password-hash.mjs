import { printPasswordHash } from './lib/hash-password.mjs';

printPasswordHash(process.argv[2], 'CLIENT_PASSWORD_HASH');
