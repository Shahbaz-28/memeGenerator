import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MemeEditor from "./components/MemeEditor";
import NavSec from "./components/NavSec";

function App() {
  return (
    <>
    {/* <NavSec/> */}
      <Routes>
       <Route path="/" element={<HomePage />} />
        <Route path="/meme-editor" element={<MemeEditor />} />
      </Routes>
    </>
  );
}

export default App;
