import crypto from 'crypto';
import {fromRpcSig, ecrecover} from 'ethereumjs-util';
import {saltKey} from "./config";
import * as jwt from "jsonwebtoken";
import {ASSERT} from "./error/assert";
import ERRORS from "./error/errors";

function toBuffer(value, size) {
    const buffer = Buffer.alloc(size);
    const hexString = value.toString(16);
    const paddingLength = size * 2 - hexString.length;
    if (paddingLength > 0) {
        buffer.fill(0, 0, paddingLength);
    }
    buffer.write(hexString, paddingLength / 2, 'hex');
    return buffer;
}

function publicKeyToCompressed(publicKey) {
    const prefix = publicKey[64] % 2 === 0 ? 2 : 3;
    return Buffer.concat([Buffer.from([prefix]), publicKey.slice(0, 32)]);
}

const helper = {
    verifySignature: (message, signature, publicKey) => {
        const hash = crypto.createHash('sha256').update(message).digest();
        const {r, s, v} = fromRpcSig(signature);
        const uncompressedPublicKey = ecrecover(hash, v, r, s);
        const compressedPublicKey = publicKeyToCompressed(uncompressedPublicKey);
        const publicKeyBuffer = Buffer.from(publicKey, 'hex');
        return publicKeyBuffer.equals(compressedPublicKey);
    },
    getEthereumAddressFromPublicKey: (publicKey) => {
        const publicKeyBuffer = Buffer.from(publicKey, 'hex');
        const compressedPublicKey = publicKeyToCompressed(publicKeyBuffer);
        const hash = crypto.createHash('sha256').update(compressedPublicKey).digest();
        const address = crypto.createHash('ripemd160').update(hash).digest();
        return address.toString('hex');
    },
    generateAuthToken: (address, id) => {
        const key = saltKey;
        return jwt.sign(
            {
                type: 'JWT',
                id,
                address
            },
            key,
            {
                expiresIn: '100d',
                issuer: 'Gig island'
            }
        );
    },
    verifyAuthToken: async (token) => {
        const key = saltKey;
        let tokenVal;

        try {
            tokenVal = await jwt.verify(token.substring(7), key);
            return [tokenVal, null];
        } catch (err) {
            return [null, ASSERT.clientError(ERRORS.INVALID_TOKEN_ERROR)];
        }
    }
}

export default helper;