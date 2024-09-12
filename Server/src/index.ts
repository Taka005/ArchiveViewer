import Server from "./Server";
import Log from "./Log";

const server = new Server();

server.run();

process.on("uncaughtException",async(error)=>{
  Log.error(error.stack);
});

process.on("unhandledRejection",async(error)=>{
  Log.error(error.stack);
});