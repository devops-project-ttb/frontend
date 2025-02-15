import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCamera } from '../context/CameraContext';

export default function NavBar() {
  const { openCamera } = useCamera();

  const [imageSize, setImageSize] = useState({
    homeIcon: 32,
    photoIcon: 50,
    profileIcon: 40,
  });

  useEffect(() => {
    const updateImageSize = () => {
      if (window.innerWidth < 768) {
        setImageSize({
          homeIcon: 25,
          photoIcon: 45,
          profileIcon: 30,
        });
      } else if (window.innerWidth < 1024) {
        setImageSize({
          homeIcon: 40,
          photoIcon: 60,
          profileIcon: 50,
        });
      } else {
        setImageSize({
          homeIcon: 55,
          photoIcon: 80,
          profileIcon: 55,
        });
      }
    };

    updateImageSize(); 
    window.addEventListener('resize', updateImageSize);

    return () => {
      window.removeEventListener('resize', updateImageSize);
    };
  }, []);

  return (
    <nav className="relative flex px-[6vw] items-center h-[10vh] w-[80vw] bg-[#FFCF82] shadow-md rounded-[20px] sm:w-[70vw] md:w-[50vw] lg:w-[50vw]">

      <div className="flex justify-between items-center w-full mx-auto relative">
        <Image
          src="/HomeIcon.svg"
          alt="Home Icon"
          width={imageSize.homeIcon}
          height={imageSize.homeIcon}
        />

      <div className="absolute sm:bottom-[8vh] md:bottom-[-4.5vh] lg:bottom-[-4vh] left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[27vw] md:w-[20vw] lg:w-[8vw] max-w-[350px] h-[27vw] md:h-[20vw] lg:h-[8vw] max-h-[350px] rounded-full border-2 border-[#FFCF82] bg-white">

          <Image
            src="/PhotoIcon.svg"
            alt="Photo Icon"
            width={imageSize.photoIcon}
            height={imageSize.photoIcon}
            onClick={openCamera}
          />
        </div>

        <Link href="/profile">
          <div className="flex items-center">
            <Image
              src="/ProfileIcon.svg"
              alt="Profile Icon"
              width={imageSize.profileIcon}
              height={imageSize.profileIcon}
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
