import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import MemeEditor from "./components/MemeEditor";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.gtag('config', 'G-GYYEQQHZ1D', {
      page_path: location.pathname,
    });
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meme-editor" element={<MemeEditor />} />
      </Routes>
    </>
  );
}

export default App;
