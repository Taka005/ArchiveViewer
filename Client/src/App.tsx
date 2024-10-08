import { Routes, Route } from "react-router-dom";
import Archive from "./routes/Archive"
import Series from "./routes/Series";
import Viewer from "./routes/Viewer";
import Setting from "./routes/Setting";
import NotFound from "./routes/NotFound";

const App = ()=>{
  return (
    <Routes>
      <Route path="/" element={ <Archive /> } />
      <Route path="/archive/:seriesId" element={ <Series /> } />
      <Route path="/viewer/:bookId" element={ <Viewer /> } />
      <Route path="/setting" element={ <Setting /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
