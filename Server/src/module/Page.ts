import path from "path";
import { Entry } from "yauzl";

class Page{
  /**
   * フォルダ内でのパス
   */
  public readonly path: string;

  /**
   * ファイル名
   * 拡張子を含みます
   */
  public readonly name: string;

  /**
   * ファイルサイズ(Byte)
   */
  public readonly size: number;

  /**
   * 更新日時
   */
  public readonly updateAt: Date;

  constructor(data: Entry){
    this.path = data.fileName;
    this.name = path.basename(data.fileName);
    this.size = data.uncompressedSize;
    this.updateAt = data.getLastModDate();
  }
}

export default Page;