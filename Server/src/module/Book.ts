import path from "path";
import Zip, { IZipEntry } from "adm-zip";

class Book{
  /**
   * 格納されているファイルのエントリー配列
   */
  public files: IZipEntry[];

  /**
   * アーカイブファイルのパス
   */
  public readonly path: string;

  /**
   * ファイルの名前
   * 拡張子は含みません
   */
  public readonly name: string;

  /**
   * 抽出するファイル拡張子の正規表現
   */
  public static readonly fileExp: RegExp = /\.(jpg|jpeg|png|gif)$/i;

  constructor(filePath: string){
    this.path = filePath;
    this.name = path.basename(filePath,path.extname(filePath));

    const zip: Zip = new Zip(filePath);

    this.files = zip
      .getEntries()
      .filter(entry=>entry.entryName.match(Book.fileExp))
      .sort((a,b)=>a.entryName.localeCompare(b.entryName));
  }

  /**
   * ページ数を取得
   */
  public get pageCount(): number{
    return this.files.length;
  }

  /**
   * サムネイル
   */
  public get thumbnail(): Buffer{
    return this.getPageData(1);
  }

  /**
   * 指定したページの画像バッファを取得します
   */
  public getPageData(page: number): Buffer{
    if(page <= 0||page > this.pageCount) throw new Error("存在しないページです");

    const entry = this.files[page - 1];

    return entry.getData();
  }
}

export default Book;