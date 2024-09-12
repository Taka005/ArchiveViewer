class Config{
  /**
   * サーバーのポート
   */
  public static readonly port: number = 5000;

  /**
   * APIKeyの使用
   * リクエストにAPIKeyを使用する場合は真に設定してください
   */
  public static readonly isUseApiKey: boolean = false;

  /**
   * APIアクセス鍵
   * この値をSHA256でハッシュ化された値がAPIキーです
   * isUseApiKeyの値が偽の場合この値を指定しても無視されます
   */
  public static readonly token: string = "1234567890";

  /**
   * アーカイブパス
   * この値のパスが公開されます
   * フルパスを指定してください
   */
  public static readonly archivePath: string = "";

  /**
   * キャッシュの使用
   * 無効にするとパフォーマンスが低下する可能性があります
   */
  public static readonly isUseCache: boolean = true;

  /**
   * キャッシュパス
   * 画像のキャッシュが保存されます
   */
  public static readonly cachePath: string = "./cache";

  /**
   * デバッグモード
   */
  public static readonly debugMode: boolean = false;
}

export default Config;