import { EntryData } from "../@types";

class Page{
  /**
   * ファイルエントリーデータ
   */
  private data: EntryData;

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

  constructor(data: EntryData){
    this.data = data;
    this.path = data.entryName;
    this.name = data.name;
    this.size = data.size;
    this.updateAt = new Date(data.time);
  }
}

export default Page;