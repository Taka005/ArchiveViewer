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

  /**
   * 書籍IDに変換します
   */
  public static toSeriesId(title: string,subtitle: string | null): string{
    const name: string = this.toSeriesName(title,subtitle);

    return this.toHash(name);
  }

  /**
   * 書籍名に変換します
   */
  public static toSeriesName(title: string,subtitle: string | null): string{
    const subtitleStr: string = subtitle ? `-${subtitle}` : "";
  
    return `${title}${subtitleStr}`;
  }
}

export default Utils;