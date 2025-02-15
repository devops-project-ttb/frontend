import { Lobster } from 'next/font/google'; 
import './globals.css';
import { CameraProvider } from '../context/CameraContext';

const lobster = Lobster({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata = {
  title: 'Mon App Etiquet',
  description: 'Application Next.js avec police Lobster',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <CameraProvider>
    <html lang="fr">
      <body className={`${lobster.className} bg-[#FCFCFC]`}>
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-customGold drop-shadow-[2px_2px_0px_black] text-center mt-4">
        Etiquet&apos;
      </h1>

        {children}
      </body>
    </html>
    </CameraProvider>
  );
}
