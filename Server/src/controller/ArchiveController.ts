import { Request, Response } from "express";
import BaseController from "./BaseController";
import Archive from "../module/Archive";

class ArchiveController extends BaseController{
  constructor(archive: Archive){
    super(archive);

    this.router.get("/list",(req: Request,res: Response)=>{
      const seriesList = archive.getAllSeries()
        .map(series=>({
          id: series.id,
          name: series.name,
          title: series.title,
          subtitle: series.subtitle,
          bookCount: series.bookCount
        }));

      res.status(200).json(seriesList);
    });

    this.router.get("/search",(req: Request,res: Response)=>{
      const query = req.params.word;

      if(!query) return res.status(400).json({
        message: "クエリパラメーターが不足しています"
      });

      const seriesList = archive.searchSeries(query)
        .map(series=>({
          id: series.id,
          name: series.name,
          title: series.title,
          subtitle: series.subtitle,
          bookCount: series.bookCount
        }));

      res.status(200).json(seriesList);
    });
  }
}

export default ArchiveController;