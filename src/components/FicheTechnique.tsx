import { FC, useState } from "react";
import Image from "next/image";

interface FicheTechniqueModalProps {
  isModalOpen: boolean; 
  closeModal: () => void; 
}

const FicheTechniqueModal: FC<FicheTechniqueModalProps> = ({ isModalOpen, closeModal }) => {
  const [startY, setStartY] = useState(0);

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
        transform: isModalOpen ? "translateY(0.5%)" : "translateY(100%)",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="bg-white p-8 rounded-t-lg w-full max-w-lg overflow-y-auto"
      style={{ maxHeight:"calc(100vh - 100px)" }}>
      

        <h2 className="text-4xl font-bold text-[#571212] text-center mb-4">Fiche Technique</h2>

        <div className="text-center">
          <Image
            src="/vin.jpg"
            alt="Image de vin"
            width={130}
            height={130}
            className="mx-auto max-w-[130px] h-auto rounded-lg border-4 border-[#571212]">
          </Image>
        </div>

        <div className="overflow-y-auto mt-5">
          <p className="text-lg text-gray-700">Nom du produit : Bonne Nouvelle</p>
          <p className="mt-5 text-lg text-gray-700">Type de vin : Vin rouge désalcoolisé</p>
          <p className="mt-5 text-lg text-gray-700">Origine : France</p>
          <p className="mt-5 text-lg text-gray-700">Volume : 75 cl</p>
          <p className="mt-5 text-lg text-gray-700">Alcool : 13,5%</p>
          <p className="mt-5 text-lg text-gray-700">Cépages : Merlot, Cabernet Sauvignon</p>
          <p className="mt-5 text-lg text-gray-700">Notes de dégustation : Arômes fruités avec des touches de cerise et de framboise, tanins souples et belle longueur en bouche.</p>
          <p className="mt-5 text-lg text-gray-700">Accords mets & vins : Idéal avec des viandes grillées, des fromages affinés ou encore des plats en sauce.</p>
          <p className="mt-5 text-lg text-gray-700">Température de service : 14-16°C</p>
          <p className="mt-5 text-lg text-gray-700">Conservation : À déguster jeune pour profiter de sa fraîcheur aromatique.</p>
          <p className="mt-5 text-lg text-gray-700">Description :</p>
          <p className="mt-5 text-lg text-gray-700">
            Bonne Nouvelle est un vin rouge sans alcool, idéal pour ceux qui souhaitent apprécier les arômes et le goût du vin. 
            Il est conçu à partir de cépages soigneusement sélectionnés et désalcoolisé tout en conservant ses caractéristiques gustatives.
          </p>
          <p className="mt-5 text-lg text-gray-700">
            Grâce à une technologie innovante de désalcoolisation, ce vin garde toute la richesse et la complexité d’un véritable vin rouge, 
            avec des notes de fruits rouges intenses et une belle fraîcheur en bouche.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FicheTechniqueModal;
