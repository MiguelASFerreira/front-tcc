import type { Metadata } from "next";
import Image from "next/image";
import BackButton from "./components/back-button";

export const metadata: Metadata = {
  title: "UniBus Administrador",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-10 min-h-screen">
      <div className="col-span-7 relative">
        <Image
          src="/img-inicial.svg"
          alt="Imagem Inicial"
          quality={100}
          priority
          fill
          className="object-cover"
        />
        <BackButton />
      </div>
      <div className="flex items-center justify-center col-span-3">
        {children}
    </div>
    </div>
  );
}
