import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);