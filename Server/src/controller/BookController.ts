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

      res.json(this.parsePage(pages));
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