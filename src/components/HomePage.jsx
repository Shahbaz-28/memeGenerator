import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavSec from "./NavSec";

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
    <>
    <NavSec/>
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 to-pink-100 p-2  min-h-screen">
      <div className="grid grid-cols-2 mt-6 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full max-w-8xl">
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
    </>
  );
}

export default HomePage;
