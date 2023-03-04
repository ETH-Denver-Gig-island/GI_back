import * as dot from 'dotenv';

dot.config();

const env = process.env.NODE_ENV ?? 'local';

export const saltKey = process.env.SECRET_KEY;

export default {
    local: {
        ENV: 'LOCAL',
    },
    prod: {
        ENV: 'PROD',
    }
}[env];