/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { analyzeImage } from "../../utils/images";

interface CameraContextType {
  isCameraOpen: boolean;
  openCamera: () => void;
  photo: string | null;
  setIsCameraOpen: (value: boolean) => void;
  setPhoto: (value: string | null) => void;
  analysisResult: any | null;
  isAnalyzing: boolean;
  error: string | null;
  analyzePhoto: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  loadingAnalysis : boolean;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);


  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const analyzePhoto = async () => {
    setLoadingAnalysis(true)
    console.log("📸 On est dans analyzePhoto du contexte");

    if (!photo) {
      console.log("❌ Pas de photo !");
      setError("Aucune photo à analyser");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const data = await analyzeImage(photo);
      setAnalysisResult(data.data);
      console.log("✅ Analyse terminée !");
      
      setIsModalOpen(true); 
    } catch (err) {
      console.error("❌ Erreur d'analyse :", err);
      setError("Erreur lors de l'analyse de la photo");
    } finally {
      setIsAnalyzing(false);
      setPhoto(null)
      setLoadingAnalysis(false)
    }
  };

  useEffect(() => {
    console.log("🔄 useEffect déclenché");
    if (photo !== null) {
      console.log("📸 Nouvelle photo détectée, on analyse...");
      analyzePhoto();
    }
  }, [photo]);

  return (
    <CameraContext.Provider
      value={{
        isCameraOpen,
        openCamera,
        setIsCameraOpen,
        photo,
        setPhoto,
        analysisResult,
        isAnalyzing,
        error,
        analyzePhoto,
        isModalOpen,
        setIsModalOpen, 
        loadingAnalysis,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
};
