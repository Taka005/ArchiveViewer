import path from "path";
import { Entry } from "yauzl";
import Utils from "../Utils";

class Page{

  /**
   * フォルダ内でのパス
   */
  public readonly path: string;

  /**
   * ページID
   * パスをMD5でハッシュ化した値です
   * 他のシリーズとIDが同じになる可能性があります
   */
  public readonly id: string;

  /**
   * ファイル名
   * 拡張子を含みます
   */
  public readonly name: string;

  /**
   * ファイルの拡張子
   */
  public readonly extension: string;

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
    this.id = Utils.toMd5(this.path);
    this.name = path.basename(data.fileName);
    this.extension = path.extname(data.fileName);
    this.size = data.uncompressedSize;
    this.updateAt = data.getLastModDate();
  }
}

export default Page;