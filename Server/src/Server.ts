import express from "express";
import Log from "./Log"
import Config from "./Config";
import Utils from "./Utils";

class Server{
  public app: express.Express;

  constructor(){
    this.app = express();
  }

  public run(): void{
    this.app.listen(Config.port,()=>{
      Log.info(`${Config.port}番ポートで起動しました`);
    });
  }

  /**
   * APIKeyを取得します
   * Config.isUseApiKeyの値が偽でも設定されているtokenから生成されます
   */
  public getApiKey(): string{
    return Utils.toHash(Config.token);
  }

  /**
   * APIKeyを確認します
   * Config.isUseApiKeyが偽の場合は常に真が返されます
   */
  public checkApiKey(value: string): boolean{
    if(!Config.isUseApiKey) return true;

    return value === this.getApiKey();
  }
}

export default Server;