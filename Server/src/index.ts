import Server from "./Server";
import Log from "./Log";

const server = new Server();

server.run();

process.on("uncaughtException",async(error: Error)=>{
  Log.error(error.stack||"不明なエラー");
});

process.on("unhandledRejection",async(error: Error)=>{
  Log.error(error.stack||"不明なエラー");
});