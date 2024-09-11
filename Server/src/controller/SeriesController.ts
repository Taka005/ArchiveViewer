import { Request, Response } from "express";
import BaseController from "./BaseController";
import Archive from "../module/Archive";

class SeriesController extends BaseController{
  constructor(archive: Archive){
    super(archive);

    this.router.get("/:seriesId/list",(req: Request,res: Response)=>{

      res.json();
    });
  }
}

export default SeriesController;