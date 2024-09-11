import { Router } from "express";
import Archive from "../module/Archive";

class BaseController{
  /**
   * アーカイブクラス
   */
  public archive: Archive;

  /**
   * ルーター
   */
  public router: Router;

  constructor(archive: Archive){
    this.archive = archive;
    this.router = Router();
  }
}

export default BaseController;