"use client";

import { useCamera } from "@/context/CameraContext";
import { useEffect, useRef } from "react";
import NavBar from "@/components/NavBar";
import FicheTechniqueModal from "@/components/FicheTechnique";

export default function Home() {
  const {
    isCameraOpen,
    setIsCameraOpen,
    setPhoto,
    isModalOpen,
    setIsModalOpen,
    loadingAnalysis,
  } = useCamera();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("🔄 isModalOpen a changé :", isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    if (isCameraOpen) {
      startCamera();
    }
  }, [isCameraOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("❌ Erreur d'accès à la caméra", error);
    }
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = async () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const dataUrl = canvasRef.current.toDataURL("image/png");
        const cleanedBase64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
        setPhoto(cleanedBase64);
        closeCamera();
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-h-screen relative">
      <div className="absolute top-[70vh]">
        <NavBar />
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
            <canvas
              ref={canvasRef}
              width="320"
              height="240"
              style={{ display: "none" }}
            />
            <button
              onClick={capturePhoto}
              className="absolute top-[40vh] left-1/2 transform -translate-x-1/2 px-6 py-2 bg-[#FFCF82] text-white rounded-md"
            >
              Prendre la photo
            </button>
          </div>
        </div>
      )}

      {loadingAnalysis ? (
        <div className="fixed bottom-0 w-full bg-white p-8 rounded-t-lg text-center">
          <h2 className="text-4xl font-bold text-[#571212]">
            Analyse en cours...
          </h2>
          <p className="text-lg text-gray-700">
            Merci de patienter quelques instants ⏳
          </p>
        </div>
      ) : (
        <FicheTechniqueModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
