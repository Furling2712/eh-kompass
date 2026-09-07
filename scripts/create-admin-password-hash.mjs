import { printPasswordHash } from './lib/hash-password.mjs';

printPasswordHash(process.argv[2], 'ADMIN_PASSWORD_HASH');
