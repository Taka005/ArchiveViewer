class Config{
  /**
   * サーバーのポート
   */
  public static readonly port: number = 5000;

  /**
   * APIKeyの使用
   * リクエストにAPIKeyを使用する場合は真に設定してください
   */
  public static readonly isUseApiKey: boolean = true;

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
  public static readonly archivePath: string = "/archive";

  /**
   * デバッグモード
   */
  public static readonly debugMode: boolean = false;
}

export default Config;