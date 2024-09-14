import { Routes, Route } from "react-router-dom";
import Archive from "./routes/Archive"
import Series from "./routes/Series";
import Viewer from "./routes/Viewer";
import Book from "./routes/Book";
import Setting from "./routes/Setting";
import NotFound from "./routes/NotFound";

const App = ()=>{
  return (
    <Routes>
      <Route path="/" element={ <Archive /> } >
        <Route path=":seriesId" element={ <Series /> } />
      </Route>
      <Route path="/viewer" element={ <Viewer /> } >
        <Route path=":bookId" element={ <Book /> } />
      </Route>
      <Route path="/setting" element={ <Setting /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
