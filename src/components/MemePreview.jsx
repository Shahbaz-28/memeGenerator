import React from "react";
import Draggable from "react-draggable";
import { Move } from "lucide-react";

export default function MemePreview({
  image,
  memeTexts,
  textStyle,
  handleTextClick,
}) {
  return (
    <div className="relative w-full mt-4 overflow-hidden" id="meme">
      {image ? (
        <img
          src={image}
          alt="Meme Background"
          className="w-full h-full object-contain"
          crossOrigin="anonymous"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <p>Upload an image to start</p>
        </div>
      )}
      {memeTexts.map((memeText, index) => (
        <Draggable key={index} bounds="parent">
          <div
            onClick={() => handleTextClick(index)}
            style={{
              fontSize: `${textStyle.size}px`,
              color: textStyle.color,
              fontFamily: textStyle.font,
              backgroundColor: textStyle.background,
              WebkitTextStroke: `${textStyle.stroke}px black`,
              textShadow: `2px 2px ${textStyle.shadow}px rgba(0,0,0,0.7)`,
            }}
            className="absolute top-0 left-0 p-2 cursor-pointer whitespace-nowrap"
          >
            {memeText}
            <Move className="w-4 h-4 inline-block ml-2 text-gray-400" />
          </div>
        </Draggable>
      ))}
    </div>
  );
}
