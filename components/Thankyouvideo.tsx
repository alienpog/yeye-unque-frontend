"use client"
import BACKEND_URL from "@/src/apiConfig";
import { useEffect, useRef, useState } from "react";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/solid";

function Thankyouvideo() {
  const [videoplayer, setVideoPlayer] = useState<string | null>(null);
  const [play, setPlay] = useState<boolean>(false);

  const vidref = useRef<HTMLVideoElement>(null);

  const videohandle = () => {
    setPlay((prev) => !prev);
    if (play) {
      vidref.current?.pause();
    } else {
      vidref.current?.play();
    }
  };

  useEffect(() => {
    async function queryVideo() {
      try {
        const res = await fetch(`${BACKEND_URL}thankyouvideo/`);
        if (res.ok) {
          const data = await res.json();
          setVideoPlayer(data.video);
        } else {
          // Handle the error gracefully
          console.error("Failed to fetch video data.");
        }
      } catch (error) {
        // Handle network or other errors
        console.error("An error occurred:", error);
      }
    }
    queryVideo();
  }, []);
  return (
    <div>
      <div className="relative w-full h-full">
        <div
          className={`absolute h-full w-full flex justify-center items-center rounded-lg ${
            !play && "bg-black/40"
          } transition-all duration-500 ease-in-out`}
        >
          <div className="z-10 cursor-pointer" onClick={() => videohandle()}>
            {play ? (
              <PauseCircleIcon className="h-16 w-16 opacity-0 hover:opacity-100 transition-all duration-500 ease-in-out" color="#E8D7D0" />
            ) : (
              <PlayCircleIcon className="h-16 w-16" color="#E8D7D0" />
            )}
          </div>
        </div>
        <video className="w-full max-h-[470px] object-cover rounded-lg" ref={vidref} autoPlay={false} controls={false}>
          <source src={videoplayer || "/animehero.webm"} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Thankyouvideo;
