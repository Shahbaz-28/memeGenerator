import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavSec() {
  const [bounce, setBounce] = useState(false);
 const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

   const memeEditor = ()=>{
      navigate("/meme-editor")
   }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            😂
          </div>
        ))}
      </div>
      <header className="flex flex-col items-center justify-center space-y-4 z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
          <span className="text-purple-600">Meme</span>
          <span
            className={`text-pink-500 inline-block transition-transform duration-300 ${
              bounce ? "animate-bounce" : ""
            }`}
          >
            Social
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium text-center max-w-md">
          Where memes come to life and laughter never dies!
        </p>
        <button className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-5 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105 flex items-center justify-center" onClick={memeEditor}>
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Meme Magic!
        </button>
      </header>
    </div>
  );
}
