import Config from "./Config";

class Log{
  /**
   * 現在の日時の文字列を取得します
   */
  private static getDate(): string{
    const now: Date = new Date();

    return `\x1b[32m[${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;
  }

  /**
   * 情報ログを表示
   */
  public static info(message: string): void{
    console.log(`\x1b[32m${this.getDate()} [INFO] ${message}\x1b[39m`);
  }

  /**
   * 警告ログを表示
   */
  public static warn(message: string): void{
    console.warn(`\x1b[33m${this.getDate()} [WARN] ${message}\x1b[39m`);
  }

  /**
   * エラーログを表示
   */
  public static error(message: string): void{
    console.error(`\x1b[31m${this.getDate()} [ERROR] ${message}\x1b[39m`);
  }

  /**
   * デバッグログを表示
   * デバッグモードが有効でない場合は表示されません 
   */
  public static debug(message: string): void{
    if(!Config.debugMode) return;

    console.debug(`\x1b[34m${this.getDate()} [DEBUG] ${message}\x1b[39m`);
  }
}

export default Log;