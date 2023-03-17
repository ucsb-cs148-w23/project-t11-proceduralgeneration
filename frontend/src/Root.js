import { Routes, Route } from "react-router-dom";
import App from "./App";
import NoMatch from "./NoMatch";
import About from "./About";

function Root() {
  return (
    <div className="Root">
      <Routes>
        <Route path="/" element={ <App/> } />
        <Route path="/About" element={ <About/> } />
        <Route path="*" element={ <NoMatch/> } />
      </Routes>
    </div>
  );
}
export default Root;