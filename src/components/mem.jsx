import React, { useState } from "react";
import Draggable from "react-draggable";
import { Upload, Download, Move } from "lucide-react";
import html2canvas from "html2canvas";

const fontOptions = [
  { value: "Impact", label: "Impact" },
  { value: "Arial", label: "Arial" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Times New Roman", label: "Times New Roman" },
];

export default function MemeEditor() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [memeTexts, setMemeTexts] = useState([]);
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
      reader.onload = () => {
        setImage(reader.result);
        console.log("Image uploaded:", reader.result); // Debug log
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error); // Debug log for error
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected."); // Debug log
    }
  };

  const handleTextChange = (e) => setText(e.target.value);

  const handleAddText = () => {
    if (text) {
      setMemeTexts((prevTexts) => [...prevTexts, text]);
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

  return (
    <div className="container mx-auto p-4 bg-blue-600 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Meme Editor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meme Preview Section */}
        <div className="bg-white border rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-black mb-4">Meme Preview</h2>
          <div
            className="relative w-full aspect-video border border-gray-300 rounded-lg overflow-hidden bg-gray-50"
            id="meme"
          >
            {image ? (
              <img
                src={image}
                alt="Meme Background"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <p>Upload an image to start</p>
              </div>
            )}
            {memeTexts.map((memeText, index) => (
              <Draggable key={index} bounds="parent">
                <div
                  style={{
                    fontSize: `${textStyle.size}px`,
                    color: textStyle.color,
                    fontFamily: textStyle.font,
                    backgroundColor: textStyle.background,
                    WebkitTextStroke: `${textStyle.stroke}px black`,
                    textShadow: `2px 2px ${textStyle.shadow}px rgba(0,0,0,0.7)`,
                  }}
                  className="absolute top-0 left-0 p-2 cursor-move whitespace-nowrap"
                >
                  {memeText}
                  <Move className="w-4 h-4 inline-block ml-2 text-gray-400" />
                </div>
              </Draggable>
            ))}
          </div>
        </div>

        {/* Meme Creator Section */}
        <div className="bg-white border rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Meme Creator</h2>

          <div className="mb-2">
            <h3 className="font-semibold mb-2">Text</h3>
            <input
              type="text"
              placeholder="Type your meme text"
              value={text}
              onChange={handleTextChange}
              className="border rounded-md text-black p-2 w-full bg-white mb-4 focus:bg-white focus:ring focus:ring-blue-300 transition h-[100px]"
            />
            <div className="flex justify-center mb-4">
              <button
                onClick={handleAddText}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                Add Text
              </button>
            </div>

            <div>
              <label htmlFor="dropzone-file">
                <div className="flex items-center bg-black justify-center pt-4 pb-4">
                  <button className="flex items-center rounded-full p-2 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transition-transform transform hover:scale-105">
                    <Upload className="w-8 h-8 mr-2 text-gray-200" /> Upload
                    Image
                  </button>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
            {/* Download Image */}
            <div className="mt-1 mb-4 flex ite justify-center">
              <button
                onClick={downloadMeme}
                disabled={!image}
                className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  type="range"
                  min="10"
                  max="100"
                  value={textStyle.size}
                  onChange={(e) => handleStyleChange("size", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
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
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-full">
                <label className="block text-sm text-black font-medium mb-1">
                  Stroke Width: {textStyle.stroke}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={textStyle.stroke}
                  onChange={(e) => handleStyleChange("stroke", e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm text-black font-medium mb-1">
                  Shadow Blur: {textStyle.shadow}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={textStyle.shadow}
                  onChange={(e) => handleStyleChange("shadow", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}