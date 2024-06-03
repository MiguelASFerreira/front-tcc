"use client";

import { useAuth } from "@/context/AuthContext";
import { api } from "@/data/api";
import React, { useEffect, useState } from "react";
import { EmpresaInfo } from "@/types/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CircleUserRound, Lock, Phone } from "lucide-react";
import { formatPhoneNumber } from "@/utils/formatUtils";

export const Sidebar = () => {
  const { token } = useAuth();
  const [empresaInfo, setEmpresaInfo] = useState<EmpresaInfo | null>(null);

  useEffect(() => {
    const fetchEmpresaInfo = async () => {
      try {
        const response = await api.get("/empresa", {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });
        setEmpresaInfo(response.data as EmpresaInfo);
      } catch (error) {
        console.error("Erro ao buscar informações da empresa:", error);
      }
    };

    if (token) {
      fetchEmpresaInfo();
    }
  }, [token]);

  return (
    <div className="bg-[#005C58] h-full p-4 text-white">
      {empresaInfo ? (
        <div className="flex flex-col items-center">
          <Avatar className="w-[150px] h-[150px]">
            <AvatarImage
              src={"https://github.com/shadcn.png"}
              alt={empresaInfo.nome}
            />
          </Avatar>
          <Separator className="my-2 w-[250px]" />
          <h3 className="text-3xl font-semibold mb-5">{empresaInfo.nome}</h3>

          <div className="flex items-center gap-2 mb-3">
            <CircleUserRound size={22} />
            <p className="text-xl">{empresaInfo.dono}</p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Lock size={22} />
            <p className="text-xl">{empresaInfo.cpf}</p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Phone size={22} />
            <p className="text-xl">{formatPhoneNumber(empresaInfo.telefone1)}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
