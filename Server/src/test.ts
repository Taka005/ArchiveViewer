import Zip from "adm-zip";

const zip: Zip = new Zip("/workspaces/ArchiveViewer/Server/src/tmp.zip");

console.log(JSON.stringify(zip.getEntries()[2].header.size,null,"  "));