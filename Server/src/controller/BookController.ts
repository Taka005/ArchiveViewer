import { Request, Response } from "express";
import BaseController from "./BaseController";
import Archive from "../module/Archive";
import Page from "../module/Page";

class BookController extends BaseController{
  constructor(archive: Archive){
    super(archive);

    this.router.get("/:bookId/info",(req: Request,res: Response)=>{
      const { bookId } = req.params;

      const book = archive.getBook(bookId);
      if(!book) return res.status(400).json({
        message: "存在しない書籍です"
      });

      const pages = book.getPages();

      res.status(200).json(this.parsePage(pages));
    });

    this.router.get("/:bookId/thumbnail",(req: Request,res: Response)=>{
      const { bookId } = req.params;

      const book = archive.getBook(bookId);
      if(!book) return res.status(400).json({
        message: "存在しない書籍です"
      });

      res.set("Content-Type","image/png");
      res.status(200).send(book.thumbnail);
    });
  }

  parsePage(pages: Page[]): {
    name: string
    size: number
    updateAt: string
  }[]{
    return pages.map(page=>({
      name: page.name,
      size: page.size,
      updateAt: page.updateAt.toLocaleString("ja-JP")
    }));
  }
}

export default BookController;