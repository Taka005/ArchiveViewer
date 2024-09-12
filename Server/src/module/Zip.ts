import yauzl, { Entry } from "yauzl";

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
      yauzl.open(this.path,{ lazyEntries: true },(err,zipfile)=>{
        if(err) return reject(err);

        const entries: Entry[] = [];

        zipfile.readEntry();

        zipfile.on("entry",(entry: Entry)=>{
          if(!entry.fileName.endsWith("/")){
            entries.push(entry);
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
      yauzl.open(this.path,{ lazyEntries: true },(err,zipfile)=>{
        if(err) return reject(err);

        zipfile.readEntry();

        zipfile.on("entry",(entry: Entry)=>{
          if(entry.fileName === fileName){
            zipfile.openReadStream(entry,(err,readStream)=>{
              if(err) return reject(err);

              const chunks: Uint8Array[] = [];

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