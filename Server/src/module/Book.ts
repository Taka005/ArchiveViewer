import path from "path";
import Zip from "adm-zip";
import Page from "./Page";

/**
 * 書籍の管理
 */
class Book{
  /**
   * 格納されているファイルのエントリー配列
   */
  private pages: Page[];

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

    this.pages = zip.getEntries()
      .filter(entry=>entry.entryName.match(Book.fileExp)&&!entry.isDirectory)
      .sort((a,b)=>a.entryName.localeCompare(b.entryName))
      .map(entry=>new Page(entry));
  }

  /**
   * ページ数を取得
   */
  public get pageCount(): number{
    return this.pages.length;
  }

  /**
   * サムネイル
   */
  public get thumbnail(): Buffer{
    return this.getPage(1).toBuffer();
  }

  /**
   * 指定したページを取得します
   */
  public getPage(page: number): Page{
    if(page <= 0||page > this.pageCount) throw new Error("存在しないページです");

    return this.pages[page - 1];
  }
}

export default Book;