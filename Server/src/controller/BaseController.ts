import { Router } from "express";
import Archive from "../module/Archive";

class BaseController{
  public archive: Archive;

  public router: Router;

  constructor(archive: Archive){
    this.archive = archive;
    this.router = Router();
  }
}

export default BaseController;