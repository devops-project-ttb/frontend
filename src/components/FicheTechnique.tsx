import { FC, useState } from "react";
import Image from "next/image";
import { useCamera } from "@/context/CameraContext";

interface FicheTechniqueModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const FicheTechniqueModal: FC<FicheTechniqueModalProps> = ({ isModalOpen, closeModal }) => {
  const [startY, setStartY] = useState(0);
  const { analysisResult } = useCamera();

  console.log("📊 Résultat de l'analyse :", analysisResult);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const moveY = e.touches[0].clientY;
    if (moveY - startY > 50) {
      closeModal();
    }
  };

  // Vérification si l'analyse est en cours ou échouée
  if (!analysisResult) {
    return (
      <div
        className={`fixed bottom-0 justify-center items-end z-50 transition-all duration-500`}
        style={{ transform: isModalOpen ? "translateY(0.5%)" : "translateY(100%)" }}
      >
        <div className="bg-white p-8 rounded-t-lg w-full max-w-lg">
          <h2 className="text-4xl font-bold text-[#571212] text-center mb-4">Fiche Technique</h2>
          <p className="text-lg text-gray-700 text-center">🔍 Analyse en cours...</p>
        </div>
      </div>
    );
  }

  // Extraction des données avec des valeurs par défaut
  const {
    nom = "Nom inconnu",
    provenance = "Provenance inconnue",
    histoire = "Histoire non disponible",
    accompagnement = "Suggestions d'accompagnement non disponibles",
  } = analysisResult;

  return (
    <div
      className={`fixed bottom-0 justify-center items-end z-50 transition-all duration-500`}
      style={{ transform: isModalOpen ? "translateY(0.5%)" : "translateY(100%)" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="bg-white p-8 rounded-t-lg w-full max-w-lg overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>
        <h2 className="text-4xl font-bold text-[#571212] text-center mb-4">Fiche Technique</h2>

        <div className="text-center">
          <Image
            src="/vin.jpg"
            alt="Image de vin"
            width={130}
            height={130}
            className="mx-auto max-w-[130px] h-auto rounded-lg border-4 border-[#571212]"
          />
        </div>

        <div className="overflow-y-auto mt-5">
          <p className="text-lg text-gray-700"><strong>🍷 Nom :</strong> {nom}</p>
          <p className="mt-5 text-lg text-gray-700"><strong>📍 Provenance :</strong> {provenance}</p>
          <p className="mt-5 text-lg text-gray-700"><strong>📖 Histoire :</strong> {histoire}</p>
          <p className="mt-5 text-lg text-gray-700"><strong>🍽️ Accompagnements :</strong> {accompagnement}</p>
        </div>
      </div>
    </div>
  );
};

export default FicheTechniqueModal;
