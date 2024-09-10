import path from "path";
import Zip from "adm-zip";
import FileData from "./FileData";

/**
 * 書籍の管理
 */
class Book{
  /**
   * 格納されているファイルのエントリー配列
   */
  private files: FileData[];

  /**
   * 書籍ファイルのパス
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

    this.files = zip.getEntries()
      .filter(entry=>entry.entryName.match(Book.fileExp)&&!entry.isDirectory)
      .sort((a,b)=>a.entryName.localeCompare(b.entryName))
      .map(entry=>new FileData(entry));
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

    const file = this.files[page - 1];

    return file.toBuffer();
  }
}

export default Book;