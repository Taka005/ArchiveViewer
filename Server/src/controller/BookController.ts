import { Request, Response } from "express";
import BaseController from "./BaseController";
import Archive from "../module/Archive";

class BookController extends BaseController{
  constructor(archive: Archive){
    super(archive);

    this.router.get("/:bookId/list",(req: Request,res: Response)=>{

      res.json();
    });
  }
}

export default BookController;