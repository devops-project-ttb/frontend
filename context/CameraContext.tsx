"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface CameraContextType {
  isCameraOpen: boolean;
  openCamera: () => void;
  photo: string | null;
  setIsCameraOpen: (value: boolean) => void;
  setPhoto: (value: string | null) => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo , setPhoto] = useState<string | null>(null);

  const openCamera = () => {
    setIsCameraOpen(true);
  };


  return (
    <CameraContext.Provider value={{ isCameraOpen, openCamera , setIsCameraOpen,photo,setPhoto }}>
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
