import { EncryptedPayload } from './types';

const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder();

function ensureCrypto(): Crypto {
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    throw new Error('Web Crypto is not available in this environment.');
  }
  return crypto;
}

export async function importAesKey(rawKey: ArrayBuffer): Promise<CryptoKey> {
  const cryptoRef = ensureCrypto();
  return cryptoRef.subtle.importKey('raw', rawKey, 'AES-GCM', false, ['encrypt', 'decrypt']);
}

export async function encryptMessage(message: string, key: CryptoKey): Promise<EncryptedPayload> {
  const cryptoRef = ensureCrypto();
  const iv = cryptoRef.getRandomValues(new Uint8Array(12));
  const encoded = TEXT_ENCODER.encode(message);

  const encrypted = await cryptoRef.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    iv: btoa(String.fromCharCode(...iv)),
    senderId: '',
    timestamp: Date.now()
  };
}

export async function decryptMessage(payload: EncryptedPayload, key: CryptoKey): Promise<string> {
  const cryptoRef = ensureCrypto();
  const ivBytes = Uint8Array.from(atob(payload.iv), c => c.charCodeAt(0));
  const cipherBytes = Uint8Array.from(atob(payload.ciphertext), c => c.charCodeAt(0));

  const decrypted = await cryptoRef.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBytes },
    key,
    cipherBytes
  );

  return TEXT_DECODER.decode(decrypted);
}
