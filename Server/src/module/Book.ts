import path from "path";
import Zip from "adm-zip";
import Page from "./Page";
import Utils from "src/Utils";

/**
 * 書籍の管理
 */
class Book{
  /**
   * 格納されているページの配列
   */
  private pages: Page[];

  /**
   * 書籍ファイルのパス
   */
  public readonly path: string;

  /**
   * 書籍ID
   * これは書籍ファイルのパスをハッシュ化した値です
   */
  public readonly id: string;

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
    this.id = Utils.toHash(filePath);
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
   * 書籍のサイズ(Byte)
   * この値は画像ファイルのサイズの合計です
   */
  public get size(): number{
    return this.pages.reduce((total,page)=>total+page.size,0);
  }

  /**
   * サムネイル
   */
  public get thumbnail(): Buffer{
    return this.getPage(1).toBuffer();
  }

  /**
   * 全てのページを取得します
   */
  public getPages(): Page[]{
    return this.pages;
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