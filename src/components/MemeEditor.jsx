// MemeEditor.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Upload, Download, ArrowLeft } from "lucide-react";
import html2canvas from "html2canvas";
import MemePreview from "./MemePreview";

const fontOptions = [
  { value: "Impact", label: "Impact" },
  { value: "Arial", label: "Arial" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Times New Roman", label: "Times New Roman" },
];

export default function MemeEditor() {
  const location = useLocation();
  const [image, setImage] = useState(location.state?.image || null);
  const [text, setText] = useState("");
  const [memeTexts, setMemeTexts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [textStyle, setTextStyle] = useState({
    font: "Impact",
    size: 40,
    color: "#ffffff",
    stroke: 2,
    shadow: 5,
    background: "transparent",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (e) => {
    const updatedText = e.target.value;
    setText(updatedText);

    if (editingIndex !== null) {
      setMemeTexts((prevTexts) =>
        prevTexts.map((t, index) => (index === editingIndex ? updatedText : t))
      );
    }
  };

  const handleAddText = () => {
    if (text) {
      if (editingIndex !== null) {
        setEditingIndex(null);
      } else {
        setMemeTexts((prevTexts) => [...prevTexts, text]);
      }
      setText("");
    }
  };

  const handleStyleChange = (styleProperty, value) => {
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      [styleProperty]: value,
    }));
  };

  const downloadMeme = () => {
    const meme = document.getElementById("meme");
    if (meme) {
      html2canvas(meme).then((canvas) => {
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  const handleTextClick = (index) => {
    setText(memeTexts[index]);
    setEditingIndex(index);
  };

  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
          <span onClick={backToHome} className="text-purple-600 cursor-pointer">
            Meme
          </span>
          <span
            className={`text-pink-500 cursor-pointer inline-block transition-transform duration-300 ${
              bounce ? "animate-bounce" : ""
            }`}
          >
            Social
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6 shadow-lg">
          <button
            className="p-3 rounded-full bg-white text-gray-800 shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-200"
            aria-label="Go back"
            onClick={backToHome}
          >
            <ArrowLeft className="w-6 h-6 transition-transform duration-300 ease-in-out hover:-translate-x-1" />
          </button>
          <MemePreview
            image={image}
            memeTexts={memeTexts}
            textStyle={textStyle}
            handleTextClick={handleTextClick}
          />
        </div>

        {/* Editor side */}
        <div className="bg-white border rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Meme Creator</h2>

          <div className="mb-2">
            <h3 className="font-semibold mb-2 text-black">Type Your Text:</h3>
            <input
              type="text"
              placeholder="Type your meme text"
              value={text}
              onChange={handleTextChange}
              className="border rounded-md text-black p-2 w-full bg-white mb-4 focus:bg-white focus:outline-none focus:ring focus:ring-blue-300 transition h-[100px] text-left placeholder:text-left"
            />

            <div className="flex justify-center mb-4">
              <button
                onClick={handleAddText}
                className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-4 rounded-full shadow-lg transition-colors"
              >
                {editingIndex !== null ? "Finish Editing" : "Add Text"}
              </button>
            </div>

            {/* Upload and Download Section */}
            <label htmlFor="dropzone-file" className="relative">
              <div className="flex items-center justify-center pb-4">
                <button className="w-full max-w-xs flex items-center justify-center rounded-full p-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transition-colors">
                  <Upload className="w-8 h-8 mr-2 text-gray-200" />
                  <span className="text-center">Upload Image</span>
                </button>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>

            <div className="mt-1 mb-4 flex justify-center">
              <button
                onClick={downloadMeme}
                disabled={!image}
                className="w-full max-w-xs flex items-center justify-center bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-4 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="mr-2 h-4 w-6" /> Download Your Meme
              </button>
            </div>

            <div className="flex gap-4 mb-4">
              <select
                onChange={(e) => handleStyleChange("font", e.target.value)}
                className="border rounded-md p-2 w-full bg-white text-black focus:bg-white focus:ring focus:ring-blue-300 transition"
              >
                <option value="">Select font</option>
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
              <div className="flex items-center w-full">
                <label className="block text-sm text-black font-medium mr-2">
                  Font Size: {textStyle.size}px
                </label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={textStyle.size}
                  onChange={(e) => handleStyleChange("size", e.target.value)}
                  className="w-full bg-white text-black focus:outline-none focus:border-blue-300 transition border p-2 rounded-lg"
                />
              </div>
            </div>
            {/* Text Color */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-4 mb-4 mt-6">
              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  Text Color
                </label>
                <input
                  type="color"
                  value={textStyle.color}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="w-full h-10 border rounded-md focus:outline-none focus:border-blue-300 transition"
                />
              </div>

              <div>
                <label className="block text-sm text-black font-medium mb-1">
                  Background Color
                </label>
                <input
                  type="color"
                  value={textStyle.background}
                  onChange={(e) =>
                    handleStyleChange("background", e.target.value)
                  }
                  className="w-full h-10 border rounded-md focus:outline-none focus:border-blue-300 transition"
                />
              </div>

              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  Text Stroke Width
                </label>
                <input
                  type="number"
                  min="0"
                  value={textStyle.stroke}
                  onChange={(e) => handleStyleChange("stroke", e.target.value)}
                  className="w-full border rounded-md p-2 bg-white text-black focus:bg-white focus:ring focus:ring-blue-300 transition"
                />
              </div>

              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  Text Shadow
                </label>
                <input
                  type="number"
                  min="0"
                  value={textStyle.shadow}
                  onChange={(e) => handleStyleChange("shadow", e.target.value)}
                  className="w-full border rounded-md p-2 bg-white text-black focus:bg-white focus:ring focus:ring-blue-300 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
