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

  constructor(dirPath: string){
    this.path = dirPath;

    const target: string[] = path.relative(Config.archivePath,dirPath)
      .split("/")
      .filter(dir=>dir !== "");

    if(!target[0]) throw new Error("タイトルが取得できません");
    
    this.title = target[0];
    this.subtitle = target[1]||null;

    const files: string[] = fs.readdirSync(this.path);
    if(!files[0]) throw new Error("書籍が存在しません");

    this.books = files.map(file=>new Book(file));
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
}

export default Series;