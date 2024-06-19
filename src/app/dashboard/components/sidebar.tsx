"use client";

import { MapPin, User, Bus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Sidebar = () => {
  const path = usePathname();

  const isActive = (href: any) => path === href;

  return (
    <div className="bg-[#005C58] h-full p-4 text-white flex flex-col fixed w-[20%]">
      <div className="flex items-center justify-center pt-6">
        <Link href={"/dashboard"}>
          <Image
            src="/logoSidebar.svg"
            alt="Logo Dashboard"
            quality={100}
            width={900}
            height={900}
            priority
            className="object-cover"
          />
        </Link>
      </div>

      <nav className="flex flex-col flex-grow justify-center gap-6">
        <Link
          href="/dashboard/servicos"
          className={`flex items-center justify-center gap-2 text-2xl hover:text-gray-300 ${isActive("/dashboard/servicos") ? "text-gray-300" : ""}`}
        >
          <MapPin /> <span>Serviços</span>
        </Link>
        <Link
          href="/dashboard/clientes"
          className={`flex items-center justify-center gap-2 text-2xl hover:text-gray-300 ${isActive("/dashboard/clientes") ? "text-gray-300" : ""}`}
        >
          <User /> <span>Clientes</span>
        </Link>
        <Link
          href="/dashboard/onibus"
          className={`flex items-center justify-center gap-2 text-2xl hover:text-gray-300 ${isActive("/dashboard/onibus") ? "text-gray-300" : ""}`}
        >
          <Bus /> <span>Ônibus</span>
        </Link>
      </nav>
    </div>
  );
};
