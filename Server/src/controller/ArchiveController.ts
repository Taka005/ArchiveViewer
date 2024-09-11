import { Request, Response } from "express";
import BaseController from "./BaseController";
import Archive from "../module/Archive";

class ArchiveController extends BaseController{
  constructor(archive: Archive){
    super(archive);

    this.router.get("/list",(req: Request,res: Response)=>{

      res.json();
    });
  }
}

export default ArchiveController;