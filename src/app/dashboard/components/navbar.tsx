"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import BackButton from "../configuracoes/components/back-button";
import { api } from "@/data/api";

interface EmpresaData {
  id: number;
  email: string;
  nome: string;
  dono: string;
  image_url: string;
  telefone1: number;
  cpf: string;
  CAPACIDADE_MAXIMA: string;
  QUANTIDADE_VEICULOS: number;
  created_at: string;
  updated_at: string;
}

export const Navbar = () => {
  const router = useRouter();
  const { signOut, token } = useAuth();
  const path = usePathname();
  const [empresa, setEmpresa] = useState<EmpresaData>()

  useEffect(() => {
    const detailsEmpresa = async () => {
      try {
        const {data} = await api.get('/empresa', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setEmpresa(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (token) {
      detailsEmpresa()
    }
  },[token])
  return (
    <div
      className={`bg-[#008B85] text-white p-4 flex items-center pr-10 ${path === "/dashboard/configuracoes" ? "justify-between" : "justify-end"}`}
    >
      {path === "/dashboard/configuracoes" && <BackButton />}
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="border-white border">
            <AvatarImage 
              src={empresa?.image_url ? empresa.image_url : "/default-image2.svg"} 
              alt="Imagem de Perfil" 
            />
            <AvatarFallback className="text-black font-bold">UB</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/configuracoes")}
            className="flex items-center gap-2"
          >
            <Settings size={20} /> Configurações
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={signOut}
            className="flex items-center gap-2 text-red-600"
          >
            <LogOut size={20} /> Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
