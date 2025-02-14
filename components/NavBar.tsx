import { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import { useCamera } from '../context/CameraContext';

export default function NavBar() {
  const [loading, setLoading] = useState(false);
  const { openCamera } = useCamera();

  return (
    <nav className="relative flex px-[6vw] items-center h-[10vh] w-[80vw] bg-[#FFCF82] shadow-md rounded-[20px]">
      <div className="flex justify-between items-center w-full mx-auto relative">
        <Image src="/HomeIcon.svg" alt="Home Icon" width={32} height={32} />

        <div className="absolute bottom-[-4.5vh] left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[25vw] h-[14.5vh] rounded-full border-2 border-[#FFCF82] bg-white">
          {loading ? (
            <div className="text-center text-xl font-semibold">Chargement...</div>
          ) : (
            <Image src="/PhotoIcon.svg" alt="Photo Icon" width={50} height={50} onClick={openCamera} />
          )}
        </div>

        <Link href="/profile">
          <div className="flex items-center">
            <Image src="/ProfileIcon.svg" alt="Profile Icon" width={40} height={40} />
          </div>
        </Link>
      </div>
    </nav>
  );
}
