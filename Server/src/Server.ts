import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import Log from "./Log"
import Config from "./Config";
import Utils from "./Utils";
import Archive from "./module/Archive";
import ArchiveController from "./controller/ArchiveController";
import SeriesController from "./controller/SeriesController";
import BookController from "./controller/BookController";
import Cache from "./Cache";

class Server{
  /**
   * ExpressApp
   */
  public app: Express;

  /**
   * アーカイブ
   */
  public archive: Archive;

  constructor(){
    this.app = express();
    this.archive = new Archive();

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
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors());

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

    this.app.get("/",(req: Request,res: Response)=>{
      res.status(200).send("Archive Viewer");
    });

    this.app.delete("/cache",(req: Request,res: Response)=>{
      if(!Config.isUseApiKey) return res.status(400).json({
        message: "APIキーの使用を有効にしていないため利用できません"
      });

      Cache.reset();

      res.status(200).json({
        message: "キャッシュを削除しました"
      });
    });

    this.app.use("/archive",new ArchiveController(this.archive).router);
    this.app.use("/series",new SeriesController(this.archive).router);
    this.app.use("/book",new BookController(this.archive).router);

    this.app.use((req: Request,res: Response)=>{
      res.status(404).json({
        message: "リソースが存在しません"
      });
    });

    this.app.use((err: Error,req: Request,res: Response)=>{
      res.status(500).json({
        message: "内部エラー",
        stack: err.stack
      });
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