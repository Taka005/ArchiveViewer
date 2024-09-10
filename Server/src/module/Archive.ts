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
   * 指定したタイトル、サブタイトルの書籍を取得します
   * subtitleは任意です
   */
  public getSeries(title: string,subtitle: string | null = null): Series{
    let list: Series[] = this.seriesList.filter(series=>series.title === title);

    if(subtitle){
      list = this.seriesList.filter(series=>series.subtitle === subtitle);
    }

    return list[0];
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

    for(const dir of fs.readdirSync(dirPath)){
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