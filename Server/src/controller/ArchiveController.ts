import { Request, Response } from "express";
import BaseController from "./BaseController";
import Archive from "../module/Archive";
import Series from "../module/Series";

class ArchiveController extends BaseController{
  constructor(archive: Archive){
    super(archive);

    this.router.get("/list",(req: Request,res: Response)=>{
      const seriesList = archive.getAllSeries()

      res.status(200).json(this.parseSeries(seriesList));
    });

    this.router.get("/search",(req: Request,res: Response)=>{
      const { word } = req.query;

      if(!word) return res.status(400).json({
        message: "クエリパラメーターが不足しています"
      });

      const seriesList = archive.searchSeries(word as string);

      res.status(200).json(this.parseSeries(seriesList));
    });
  }

  private parseSeries(seriesList: Series[]): {
    id: string
    name: string
    title: string
    subtitle: string | null
    bookCount: number
  }[]{
    return seriesList.map(series=>({
      id: series.id,
      name: series.name,
      title: series.title,
      subtitle: series.subtitle,
      bookCount: series.bookCount
    }));
  }
}

export default ArchiveController;