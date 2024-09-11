import { Request, Response } from "express";
import BaseController from "./BaseController";
import Archive from "../module/Archive";
import Book from "src/module/Book";

class SeriesController extends BaseController{
  constructor(archive: Archive){
    super(archive);

    this.router.get("/:seriesId/list",(req: Request,res: Response)=>{
      const { seriesId } = req.param;

      const series = archive.getSeries(seriesId);
      if(!series) return res.status(400).json({
        message: "存在しないシリーズです"
      });

      const books = series.getBooks();

      res.status(200).json(this.parseBooks(books));
    });

    this.router.get("/:seriesId/search",(req: Request,res: Response)=>{
      const { seriesId } = req.param;
      const { word } = req.query;

      if(!word) return res.status(400).json({
        message: "クエリパラメーターが不足しています"
      });

      const series = archive.getSeries(seriesId);
      if(!series) return res.status(400).json({
        message: "存在しないシリーズです"
      });

      const books = series.searchBooks(word);

      res.status(200).json(this.parseBooks(books));
    });

    this.router.get("/:seriesId/thumbnail",(req: Request,res: Response)=>{
      const { seriesId } = req.param;

      const series = archive.getSeries(seriesId);
      if(!series) return res.status(400).json({
        message: "存在しないシリーズです"
      });

      res.status(200).send(series.thumbnail);
    });
  }

  private parseBooks(books: Book[]): {
    id: string
    name: string
    size: number
    pageCount: number
  }[]{
    return books.map(book=>({
      id: book.id,
      name: book.name,
      size: book.size,
      pageCount: book.pageCount
    }));
  }
}

export default SeriesController;