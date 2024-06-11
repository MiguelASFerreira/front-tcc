"use client";
import React from "react";
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

export const Navbar = () => {
  const { signOut } = useAuth();

  return (
    <div className="bg-[#008B85] text-white p-4 flex items-end justify-end pr-10">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="border-white border p-1">
            <AvatarImage src="/default-image2.svg" alt="Imagem de Perfil" />
            <AvatarFallback className="text-black font-bold">UB</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <Settings size={20} /> Configurações
          </DropdownMenuItem>
          <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 text-red-600">
            <LogOut size={20} /> Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
