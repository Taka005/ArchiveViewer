import Utils from "./Utils";

class Config{

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
   */
  public static readonly archivePath: string = "/archive";

  /**
   * APIKeyを取得します
   * isUseApiKeyの値が偽でも設定されているtokenから生成されます
   */
  public static getApiKey(): string{
    return Utils.toHash(this.token);
  }

  /**
   * APIKeyを確認します
   * isUseApiKeyが偽の場合は常に真が返されます
   */
  public static checkApiKey(value: string): boolean{
    if(!this.isUseApiKey) return true;

    return value === this.getApiKey();
  }
}

export default Config;