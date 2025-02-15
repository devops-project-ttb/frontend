"use client";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  return (
    <div className="bg-[#FCFCFC] min-h-screen p-8 pb-[10vh]">
      <div className="absolute top-[2vh] left-[2vw]">
        <Link href="/">
          <Image src="/chevron-left.svg" alt="Retour" width={50} height={50} />
        </Link>
      </div>

      <div className="flex justify-center items-center mb-8">
        <Image
          src="/profile_image.png" 
          alt="Image de profil"
          width={100}
          height={100}
          className="rounded-full border-4 border-[#FFCF82]"
        />
      </div>

      <h1 className="text-3xl font-bold text-center text-[#626264] mb-4">Mon Profil</h1>
      <p className="text-lg text-center text-[#626264] mb-10">Gérez vos informations et vins ici.</p>

      {/* Sections */}
      <div className="space-y-10">
        {/* Informations Personnelles */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-[#FFCF82] mb-4">Informations Personnelles</h2>
          <p className="text-lg text-[#626264]">Nom : Jean Dupont</p>
          <p className="text-lg text-[#626264]">Email : jean.dupont@example.com</p>
          <p className="text-lg text-[#626264]">Date de naissance : 12 janvier 1990</p>
          <button className="mt-4 px-6 py-2 bg-[#FFCF82] text-white rounded-md hover:bg-[#e2c872]">
            Modifier les informations
          </button>
        </section>

        {/* Historique */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-[#FFCF82] mb-4">Historique</h2>
          <ul className="space-y-3">
            <li className="flex justify-between text-lg text-[#626264]">
              <span>Achat 1</span> <span>15/01/2025</span>
            </li>
            <li className="flex justify-between text-lg text-[#626264]">
              <span>Achat 2</span> <span>20/12/2024</span>
            </li>
            <li className="flex justify-between text-lg text-[#626264]">
              <span>Achat 3</span> <span>10/11/2024</span>
            </li>
          </ul>
          <button className="mt-4 px-6 py-2 bg-[#FFCF82] text-white rounded-md hover:bg-[#e2c872]">
            Voir l&apos;historique complet
          </button>
        </section>

        {/* Favoris */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-[#FFCF82] mb-4">Favoris</h2>
          <ul className="space-y-3">
            <li className="text-lg text-[#626264]">Produit Favori 1</li>
            <li className="text-lg text-[#626264]">Produit Favori 2</li>
            <li className="text-lg text-[#626264]">Produit Favori 3</li>
          </ul>
          <button className="mt-4 px-6 py-2 bg-[#FFCF82] text-white rounded-md hover:bg-[#e2c872]">
            Voir les favoris complets
          </button>
        </section>
      </div>

    </div>
  );
};

export default Profile;
