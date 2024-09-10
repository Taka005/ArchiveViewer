import { IZipEntry } from "adm-zip";

class FileData{
  /**
   * ファイルエントリーデータ
   */
  private data: IZipEntry;

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

  constructor(data: IZipEntry){
    this.data = data;
    this.path = data.entryName;
    this.name = data.name;
    this.size = data.header.size;
    this.updateAt = new Date(data.header.time);
  }

  /**
   * ファイルをバッファーに変換します
   */
  public toBuffer(): Buffer{
    return this.data.getData();
  }
}

export default FileData;