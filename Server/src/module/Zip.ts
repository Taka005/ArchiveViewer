import yauzl from "yauzl";

class Zip{
  public readonly path: string;

  constructor(path: string){
    this.path = path;
  }

  getEntries(){
    return new Promise((resolve,reject)=>{
      yauzl.open(this.zipPath,{ lazyEntries: true },(err,zipfile)=>{
        if(err) return reject(err);

        const entries = [];
        zipfile.readEntry();

        zipfile.on("entry",(entry)=>{
          if(!entry.fileName.endsWith("/")){
            entries.push(entry.fileName);
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

  getData(fileName): Promise<Buffer>{
    return new Promise<Buffer>((resolve,reject)=>{
      yauzl.open(this.zipPath,{ lazyEntries: true },(err,zipfile)=>{
        if(err) return reject(err);

        zipfile.readEntry();

        zipfile.on("entry",(entry)=>{
          if(entry.fileName === fileName){
            zipfile.openReadStream(entry,(err,readStream)=>{
              if(err) return reject(err);

              const chunks = [];

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