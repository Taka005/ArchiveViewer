import path from "path";
import Zip from "./Zip";
import Page from "./Page";
import Utils from "src/Utils";
import Log from "src/Log";

/**
 * 書籍の管理
 */
class Book{
  private file: Zip;

  /**
   * 格納されているページの配列
   */
  private pages: Page[] = [];

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
    this.id = Utils.toMd5(filePath);
    this.name = path.basename(filePath,path.extname(filePath));

    this.file = new Zip(filePath);

    this.file.getEntries()
      .then(entries=>{
        this.pages = entries
          .filter(entry=>entry.fileName.match(Book.fileExp))
          .sort((a,b)=>a.fileName.localeCompare(b.fileName))
          .map(entry=>new Page(entry));

        Log.debug(`${this.name}(${this.id})の書籍をロードしました`);
      });
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

  public getPageData(pageNum: number): Promise<Buffer>{
    const page = this.getPage(pageNum);

    return this.file.getData(page.path);
  }

  /**
   * サムネイル
   */
  public getThumbnail(): Promise<Buffer>{
    return this.getPageData(1);
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