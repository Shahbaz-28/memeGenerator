import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [memes, setMemes] = useState([]);
  const navigate = useNavigate();

  // Fetch memes from the API
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        if (data.success) {
          setMemes(data.data.memes);
        } else {
          console.error("Failed to load memes");
        }
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };
    fetchMemes();
  }, []);

//   const handleMemeClick = (memeUrl) => {
//     navigate("/meme-editor", { state: { image: memeUrl } });
//   };

const handleMemeClick = async (memeUrl) => {
    try {
      const response = await fetch(memeUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        navigate("/meme-editor", { state: { image: dataUrl } });
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };
  
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Meme Gallery</h1>
      <button className="mb-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition">
        Upload your own template
      </button>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full max-w-8xl">
        {memes.map((meme) => (
          <div
            key={meme.id}
            className="meme cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
            onClick={() => handleMemeClick(meme.url)} // Add onClick here
          >
            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
