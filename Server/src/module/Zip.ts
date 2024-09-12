import path from "path";
import yauzl from "yauzl";

/**
 * ファイルのエントリーデータ
 */
type Entry = {
  entryName: string
  name: string
  size: number
  time: string
}

class Zip{
  /**
   * ファイルのパス
   */
  public readonly path: string;

  constructor(filePath: string){
    this.path = filePath;
  }

  /**
   * 全てのエントリーを取得
   */
  getEntries(): Promise<Entry[]>{
    return new Promise((resolve,reject)=>{
      yauzl.open(this.zipPath,{ lazyEntrites: true },(err,zipfile)=>{
        if(err) return reject(err);

        const entries: Entry[] = [];
        zipfile.readEntry();

        zipfile.on("entry",(entry)=>{
          if(!entry.fileName.endsWith("/")){
            entries.push({
              entryName: entry.fileName,
              name: path.basename(entry.fileName),
              size: entry.uncompressedSize,
              time: entry.lastModFileTime
            });
          }

          zipfile.readEntry();
        });

        zipfile.on("end",()=>{
          resolve(entries);
        });

        zipfile.on("error",(err)=>{
          reject(err);
        });
      });
    });
  }

  /**
   * ファイルのバッファを取得
   */
  getData(fileName: string): Promise<Buffer>{
    return new Promise<Buffer>((resolve,reject)=>{
      yauzl.open(this.zipPath,{ lazyEntries: true },(err,zipfile)=>{
        if(err) return reject(err);

        zipfile.readEntry();

        zipfile.on("entry",(entry)=>{
          if(entry.fileName === fileName){
            zipfile.openReadStream(entry,(err,readStream)=>{
              if(err) return reject(err);

              const chunks: string = [];

              readStream.on("data",(chunk)=>chunks.push(chunk));

              readStream.on("end",()=>{
                resolve(Buffer.concat(chunks));
                zipfile.close();
              });

              readStream.on("error",(err)=>reject(err));
            });
          }else{
            zipfile.readEntry();
          }
        });

        zipfile.on("error",(err)=>{
          reject(err);
        });
      });
    });
  }
}

export default Zip;