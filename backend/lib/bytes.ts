import atob from 'atob';
import btoa from 'btoa';
import { hash } from 'sjcl';


function fromBase64(str: string): Buffer {
  return atob(str);
}

function toBase64(arr: Buffer): string {
  return btoa(
     arr ? arr.reduce((data, byte) => data + String.fromCharCode(byte), '') : ''
  );
};

const hashPassword = (password: string) => {
  return hash.sha256.hash(password).join('');
};

export { hashPassword, fromBase64, toBase64 };
