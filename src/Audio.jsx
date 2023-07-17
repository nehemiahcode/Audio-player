import React, { useEffect, useRef, useState } from "react";
import { FiPlay, FiPause } from "react-icons/fi";
import { AiOutlineDownload } from "react-icons/ai";
import { AiFillStepForward } from "react-icons/ai";
import { AiFillStepBackward } from "react-icons/ai";
import { AudioFiles } from "./Data";
import { GiMusicalNotes } from "react-icons/gi";
import { PiMusicNotes } from "react-icons/pi";
import Bgimage from  './assets/bgImage.webp'

function Audio() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [type, setType] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const sculpture = AudioFiles[index];

  function handleBackClick() {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : AudioFiles.length - 1
    );
    setIsPlaying(false);
  }

  function handleNextClick() {
    setIndex((prevIndex) =>
      prevIndex < AudioFiles.length - 1 ? prevIndex + 1 : 0
    );
    setIsPlaying(false);
  }

  function handlePlayPause() {
    setIsPlaying((prevIsPlaying) => {
      if (!prevIsPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      return !prevIsPlaying;
    });
  }

  function handleAudioEnded() {
    setIsPlaying(false);
  }
  function handleAddtofavourite() {
    setType(!type);
    setShow(true);
  }
  useEffect(() => {
    setTimeout(() => [setShow(false)], 2000);
  });

  useEffect(() => {
    const Time = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(Time);
  });

  return (
    <>
      {loading ? (
        <div className="  w-screen h-screen bg-black overflow-hidden flex justify-center items-center">
          <div className=" bg-sky-500 rounded-full font-bold -rotate-12 flex items-center 
          justify-center h-[150px] w-[150px] font-Monessa text-black text-3xl">
            Play it
          </div>
        </div>
      ) : (
        <section className="bg-slate-800 w-full  h-screen  lg:px-20 md:px-10 sm:px-5 px-2">
          <div
            className="rounded-xl border-2 pb-20 border-sky-500 bg-black grid  items-center sm:mx-auto
      w-[100%] lg:w-[60%] sm:w-[90%]
      py-9 px-2 h-auto "
          >
            <div
            style={{backgroundImage: `url(${Bgimage})`, backgroundRepeat:'no-repeat', backgroundPosition:"center", backgroundSize:"cover"}}
              className=" relative border-4 border-sky-400 
       animate-pulse rounded-lg p-3 flex items-center
         justify-center h-[350px] w-[100%] lg:w-[100%] sm:w-[100%]"
            >
              <h1 className=" uppercase text-white font-medium text-center  text-2xl ">
                {sculpture.text}
              </h1>
              <audio
                ref={audioRef}
                src={sculpture.audio}
                onEnded={handleAudioEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <span className=" absolute top-5 text-3xl  animate-ping">
                <GiMusicalNotes />
              </span>
              <span className=" absolute  bottom-2 text-3xl">
                <PiMusicNotes />
              </span>
            </div>

            <div>
              <div>
                <div className="w-full">
                  <marquee className="w-full">
                    <h1 className="text-center uppercase font-medium py-2 text-white">
                      {sculpture.movingText}
                    </h1>
                  </marquee>
                  <h1 className="text-gray-400 text-md font-medium text-center">
                    {sculpture.title}
                  </h1>
                </div>

                <div className="flex text-2xl text-white items-center gap-5 my-2 justify-center">
                  <div     onClick={handleAddtofavourite} className=" cursor-pointer relative flex flex-col items-center">
                    <span
                  
                      className={
                        type
                          ? "active:scale-110 text-pink-600"
                          : " text-pink-600"
                      }
                    >
                      <ion-icon
                        name={type ? "heart" : "heart-outline"}
                      ></ion-icon>
                    </span>
                    <p className=" text-white font-medium text-sm">Favourite</p>
                    {show && (
                      <div
                        className={`absolute w-[200px] ${
                          type ? " flex" : "hidden"
                        } flex items-center justify-center  translate-x-[26%]  text-center bg-[rgb(255,255,255)] font-medium top-[-50px] shadow-lg text-black rounded-md text-sm px-3 py-2`}
                      >
                        Added to Favourites
                      </div>
                    )}
                  </div>
                  <a
                      href={`${sculpture.audio}`}
                      download={sculpture.download}
                      className=" active:scale-110"
                    >
                  <span className=" cursor-pointer flex flex-col justify-center gap-3 items-center">
                 
                      <AiOutlineDownload />
                  
                    <p className="text-white font-medium text-sm">Download</p>
                  </span>
                  </a>
                </div>
              </div>

              <div className="flex items-center mt-5 justify-center gap-5">
                <div
                  onClick={handleBackClick}
                  className="bg-yellow-500 lg:cursor-pointer text-2xl active:scale-125 h-[50px] w-[50px] p-2 flex items-center justify-center text-black m-5 rounded-full"
                >
                  <AiFillStepBackward />
                </div>
                <div
                  className="bg-cyan-600 h-[60px] lg:cursor-pointer  active:text-white active:scale-125 w-[60px] rounded-full text-2xl text-black flex items-center justify-center"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <FiPause /> : <FiPlay />}{" "}
                </div>
                <div
                  onClick={handleNextClick}
                  className="bg-yellow-500 text-2xl lg:cursor-pointer  active:scale-125 h-[50px] w-[50px] p-2 flex items-center justify-center text-black m-5 rounded-full"
                >
                  <AiFillStepForward />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Audio;
