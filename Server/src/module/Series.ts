import path from "path";
import fs from "fs";
import Book from "./Book";
import Config from "../Config";

/**
 * シリーズの管理
 */
class Series{
  /**
   * 書籍ディレクトリへのパス
   */
  public readonly path: string;
  
  /**
   * 書籍タイトル
   */
  public readonly title: string;

  /**
   * 書籍のサブタイトル
   */
  public readonly subtitle: string | null;

  /**
   * 書籍の一覧
   */
  private books: Book[];

  /**
   * 抽出するファイル拡張子の正規表現
   */
  public static readonly fileExp: RegExp = /\.(zip|cbz)$/i;

  constructor(dirPath: string){
    this.path = dirPath;

    const target: string[] = path.relative(Config.archivePath,dirPath)
      .split("/")
      .filter(dir=>dir !== "");

    if(!target[0]) throw new Error("タイトルが取得できません");
    
    this.title = target[0];
    this.subtitle = target[1]||null;

    const files: string[] = fs.readdirSync(this.path,{ encoding: "utf8" });
    if(!files[0]) throw new Error("書籍が存在しません");

    this.books = files
      .filter(file=>file.match(Series.fileExp))
      .map(file=>new Book(path.join(dirPath,file)));
  }

  /**
   * 書籍数
   */
  public get bookCount(): number{
    return this.books.length;
  }

  /**
   * シリーズのサムネイル
   */
  public get thumbnail(): Buffer{
    return this.books[0].thumbnail;
  }

  /**
   * 指定した書籍番号を取得します
   */
  public getBook(valume: number): Book{
    if(valume <= 0||valume > this.bookCount) throw new Error("存在しない書籍です");

    return this.books[valume - 1];
  }

  /**
   * 全ての書籍を取得します
   */
  public getBooks(): Book[]{
    return this.books;
  }
}

export default Series;