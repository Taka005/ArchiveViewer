import fs from "fs";
import Config from "../Config";
import Book from "./module/Book";
import Page from "./module/Page";
import Log from "./Log";

class Cache{
  /**
   * 保存するパスを取得
   */
  public static getPath(book: Book,page: Page): string{
    return `${Config.cachePath}/${book.id}/${page.id}${page.extension}`;
  }

  /**
   * キャッシュを保存します
   */
  public static save(book: Book,page: Page,buffer: Buffer): void{
    if(!Config.isUseCache) return;

    fs.mkdirSync(`${Config.cachePath}/${book.id}`,{ recursive: true });
    fs.writeFileSync(this.getPath(book,page),buffer,"binary");

    Log.debug(`${book.name}(${book.id})/${page.id}のキャッシュを保存しました`);
  }

  /**
   * キャッシュが存在するか確認します
   * Config.isUseCacheが無効の場合は常に偽が返ります
   */
  public static exist(book: Book,page: Page): boolean{
    if(!Config.isUseCache) return false;

    return fs.existsSync(this.getPath(book,page));
  }

  /**
   * キャッシュを取得します
   */
  public static get(book: Book,page: Page): Buffer{
    if(!this.exist(book,page)) throw new Error("キャッシュが存在しません");

    return fs.readFileSync(this.getPath(book,page),"binary")
  }

  /**
   * キャッシュを全て削除します
   */
  public static reset(): void{
    Log.debug("全てのキャッシュを削除しました");

    fs.rmdir(Config.cachePath,{ recursive: true });
  }
}

export default Cache;