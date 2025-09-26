import CryptoJS from "crypto-js";

// Secret key for encryption (Ensure you store this securely in your environment)
const SECRET_KEY = process.env.NEXT_PUBLIC_COOKIE_PASSWORD!;

function encryptData(data: any) {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
  return encrypted;
}
function decryptData(encryptedData: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decrypted;
}
export { encryptData, decryptData };
