"use client";

import { useCamera } from "../context/CameraContext";
import { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import FicheTechniqueModal from "../components/FicheTechnique";

export default function Home() {
  const { isCameraOpen,  setIsCameraOpen, setPhoto } = useCamera();
  const videoRef = useRef<HTMLVideoElement>(null); 
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Erreur d'accès à la caméra", error);
    }
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    setPhoto(null);
    if (videoRef.current) {
      if (videoRef.current.srcObject instanceof MediaStream) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setPhoto(dataUrl);
      }

   
        closeCamera(); 
        setIsModalOpen(true); 
    

    }
  };

  if (isCameraOpen) {
    startCamera();
  }

  return (
    <div className="flex flex-col items-center max-h-screen relative">
      <div className="absolute top-[70vh]">
        <NavBar/>
      </div>  

      {!isCameraOpen && (
        <div className="w-[50vw] mt-[14vh] md:w-[50vw]">
          <h1 className="text-[2.1rem] md:text-[4rem] font-bold text-[#626264] text-center">
            Clique sur le bouton et scanne ton étiquette !
          </h1>
        </div>
      )}

      {isCameraOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              className="border-4 border-[#FFCF82] rounded-lg"
              width="320"
              height="240"
            />
            <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }} />
            <button
              onClick={capturePhoto}
              className="absolute top-[40vh] left-1/2 transform -translate-x-1/2 px-6 py-2 bg-[#FFCF82] text-white rounded-md"
            >
              Prendre la photo
            </button>
          </div>
        </div>
      )}

    <FicheTechniqueModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
     
    </div>
    
  );
}
