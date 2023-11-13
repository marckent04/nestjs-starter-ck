import { AES, enc } from "crypto-js";

export class Crypto {
  static encrypt(data: any) {
    return AES.encrypt(
      JSON.stringify(data),
      process.env.CRYPTOKEY,
    ).toString();
  }

  static decrypt(data: any) {
    return AES.decrypt(data, process.env.CRYPTOKEY).toString(enc.Utf8);
  }
}
