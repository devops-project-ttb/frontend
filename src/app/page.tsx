/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { loginUser } from "../../utils/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUserData } = useAuth(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = await loginUser(email, password);

      localStorage.setItem("token", token); // Stocke le token
      setUserData(email); // Met à jour le contexte avec l'email de l'utilisateur
      console.log("Connexion réussie !", email);

      router.replace("/home"); // Redirige vers la page d'accueil
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center max-h-screen relative">
      <div className="w-[50vw] mt-[14vh] md:w-[50vw]">
        <h1 className="text-[2.1rem] md:text-[4rem] font-bold text-[#626264] text-center">
          Connecte-toi à ton compte
        </h1>
      </div>

      <div className="w-full max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
          <div>
            <label htmlFor="email" className="text-lg text-[#626264]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-[#ccc] rounded-md"
              placeholder="Entrez votre email"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-lg text-[#626264]">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-[#ccc] rounded-md"
              placeholder="Entrez votre mot de passe"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="py-3 bg-[#FFCF82] text-white font-semibold rounded-md mt-4"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
