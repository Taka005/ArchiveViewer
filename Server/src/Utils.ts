import { createHash, Hash } from "crypto";

class Utils{
  /**
   * 指定された値をSHA256でハッシュ化します
   */
  public static toHash(value: string): string{
    const hash: Hash = createHash("sha256");

    hash.update(value);

    return hash.digest("hex");
  }
}

export default Utils;