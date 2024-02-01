import * as crypto from "crypto";
import { secret_key_aes } from "../../configs";

const algorithm: string = "aes-256-ctr";
const secretKey: Buffer = Buffer.from(secret_key_aes, 'base64');
// const secretKey: Buffer = crypto.randomBytes(32);
const iv: Buffer = crypto.randomBytes(16);

export interface EncryptedData {
  iv: string;
  content: string;
}

export const encrypt = (text: string): EncryptedData => {
  console.log("hans [encrypt] text: ", text, algorithm, secretKey.toString('base64'), iv);
  const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  console.log("hans [encrypt] cipher: ", cipher);
  const encrypted: Buffer = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  console.log("hans [encrypt] encrypted: ", encrypted);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (hash: EncryptedData): string => {
  const decipher: crypto.Decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );
  const decrypted: Buffer = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
};

// Example usage:
const encryptedData: EncryptedData = encrypt("Hello, TypeScript!");
console.log(encryptedData);

const decryptedData: string = decrypt(encryptedData);
console.log(decryptedData);
