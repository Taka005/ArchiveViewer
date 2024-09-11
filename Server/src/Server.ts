import express, { Express, Request, Response, NextFunction } from "express";
import Log from "./Log"
import Config from "./Config";
import Utils from "./Utils";

class Server{
  public app: Express;

  constructor(){
    this.app = express();

    this.route();
  }

  /**
   * サーバーを起動します
   */
  public run(): void{
    if(Config.isUseApiKey){
      Log.info(`API Key: ${this.getApiKey()}`);
    }else{
      Log.warn("Config.isUseApiKeyが無効に設定されているため、全てのユーザーが利用可能です");
    }

    this.app.listen(Config.port,()=>{
      Log.info(`${Config.port}番ポートで起動しました`);
    });
  }

  /**
   * APIの制御
   */
  private route(): void{
    this.app.use((req: Request,res: Response,next: NextFunction)=>{
      Log.info(`${req.ip} - [${req.method}] ${req.originalUrl}`);

      if(this.authorization(req.headers["authorization"])){
        next();
      }else{
        res.status(401).json({
          message: "認証されていません"
        });
      }
    });


  }

  /**
   * APIKeyを確認します
   * Config.isUseApiKeyが無効の場合は常に真が返されます
   */
  private authorization(authHeader: string | undefined): boolean{
    if(!Config.isUseApiKey) return true;

    if(!authHeader||!authHeader.startsWith("Bearer ")) return false;

    return authHeader.split(" ")[1] === this.getApiKey();
  }

  /**
   * APIKeyを取得します
   * Config.isUseApiKeyの値が偽でも設定されているtokenから生成されます
   */
  public getApiKey(): string{
    return Utils.toHash(Config.token);
  }
}

export default Server;