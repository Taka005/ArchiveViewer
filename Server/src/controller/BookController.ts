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

    this.router.get("/:bookId/thumbnail",async(req: Request,res: Response)=>{
      const { bookId } = req.params;

      const book = archive.getBook(bookId);
      if(!book) return res.status(400).json({
        message: "存在しない書籍です"
      });

      res.set("Content-Type","image/png");
      res.status(200).send(await book.getThumbnail());
    });

    this.router.get("/:bookId/page/:pageNum",async(req: Request,res: Response)=>{
      const { bookId, pageNum } = req.params;

      const book = archive.getBook(bookId);
      if(!book) return res.status(400).json({
        message: "存在しない書籍です"
      });

      if(isNaN(Number(pageNum))) return res.status(400).json({
        message: "ページ数は数字で指定してください"
      });

      try{
        res.set("Content-Type","image/png");
        res.status(200).send(await book.getPageData(Number(pageNum)));
      }catch(error){
        res.status(400).json({
          message: "存在しないページ数です"
        });  
      }
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