import fs, { Stats } from "fs";
import path from "path";
import Series from "./Series";
import Config from "../Config";

class Archive{
  /**
   * シリーズ一覧
   */
  public seriesList: Series[];

  constructor(){
    this.seriesList = this.findDir(Config.archivePath)
      .map(dir=>new Series(dir));
  }

  /**
   * シリーズ数を取得します
   */
  public get seriesCount(): number{
    return this.seriesList.length;
  }

  /**
   * 書籍を検索します
   * 部分一致での検索をします
   */
  public searchSeries(name: string): Series[]{
    return this.seriesList.filter(series=>series.name.indexOf(name) >= 0);
  }

  /**
   * 指定したIDの書籍を取得します
   */
  public getSeries(id: string): Series | null{
    return this.seriesList.find(series=>series.id === id)||null;
  }

  /**
   * 全てのシリーズを取得します
   */
  public getAllSeries(): Series[]{
    return this.seriesList;
  }

  /**
   * 指定されたディレクトリのフォルダを探索します
   */
  private findDir(dirPath: string, depth: number = 0): string[]{
    if(depth > 2) return [];
  
    let dirs: string[] = [];

    for(const dir of fs.readdirSync(dirPath,{ encoding: "utf8" })){
      const fullPath: string = path.join(dirPath,dir);
      const stats: Stats = fs.statSync(fullPath);
  
      if(stats.isDirectory()){
        dirs.push(fullPath);
        dirs = dirs.concat(this.findDir(fullPath,depth + 1));
      }
    }
  
    return dirs;
  }
}

export default Archive;