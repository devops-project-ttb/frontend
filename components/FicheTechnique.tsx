import { FC, useState } from "react";

interface FicheTechniqueModalProps {
  isModalOpen: boolean;  // Contrôle si le modal est ouvert ou fermé
  closeModal: () => void; // Fonction pour fermer le modal
}

const FicheTechniqueModal: FC<FicheTechniqueModalProps> = ({ isModalOpen, closeModal }) => {
  const [startY, setStartY] = useState(0);

  // Gestion du glissement vers le bas pour fermer le modal
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const moveY = e.touches[0].clientY;
    if (moveY - startY > 50) {
      closeModal();
    }
  };

  return (
    <div
      className={`fixed bottom-0  justify-center items-end z-50 transition-all duration-500`}
      style={{
        transform: isModalOpen ? "translateY(15%)" : "translateY(100%)",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="bg-white p-8 rounded-t-lg w-full max-w-lg overflow-y-auto">
        <h2 className="text-4xl font-bold text-[#571212] text-center mb-4">Fiche Technique</h2>

        <div className="text-center">
          <img
            src="/vin.jpg"
            alt="Image de vin"
            className="mx-auto max-w-[130px] h-auto rounded-lg border-4 border-[#571212]"
          />
        </div>

        {/* Conteneur avec overflow pour le scroll */}
        <div className="overflow-y-auto max-h-[300px] mt-5">
          <p className="text-lg text-gray-700">Nom du produit : Bonne Nouvelle</p>
          <p className="mt-5 text-lg text-gray-700">Type de vin : Vin rouge désalcoolisé</p>
          <p className="mt-5 text-lg text-gray-700">Origine : France</p>
          <p className="mt-5 text-lg text-gray-700">Volume : 75 cl</p>
          <p className="mt-5 text-lg text-gray-700">Alcool : 13,5%</p>
          <p className="mt-5 text-lg text-gray-700">
            Bonne Nouvelle est un vin rouge sans alcool, idéal pour ceux qui souhaitent apprécier les arômes et le goût du vin. Il est conçu à partir de cépages soigneusement sélectionnés et désalcoolisé tout en conservant ses caractéristiques gustatives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FicheTechniqueModal;
