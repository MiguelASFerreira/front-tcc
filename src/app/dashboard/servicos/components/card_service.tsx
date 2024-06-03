"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { z } from "zod";
import { DialogDelete } from "./dialog_delete";
import { DialogUpdate } from "./dialog_update";

const paramsService = z.object({
  id_servico: z.coerce.number(),
  id_servicoOferta: z.coerce.number(),
  rota_inicio: z.string(),
  rota_fim: z.string(),
  vl_servico: z.coerce.number(),
});

type ParamsService = z.infer<typeof paramsService>;

interface CardServiceProps {
  service: ParamsService;
}

export const CardService: React.FC<CardServiceProps> = ({ service }) => {
  return (
    <Card className="h-[150px] rounded-t-lg overflow-hidden">
      <div className="bg-[#008B85] w-full flex justify-end items-center p-2 rounded-t-lg">
        <div className="flex items-center justify-center space-x-2">
          <DialogUpdate 
            id_servico={service.id_servico}
          />
          <DialogDelete
            id_servico={service.id_servico}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-[#005C58] w-full h-[40px] text-white text-center m-3 flex items-center justify-center">
          {service.rota_inicio} X {service.rota_fim}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-[#008B85] text-white text-center py-2 w-[324px] mx-4 rounded">
          Valor do serviço:{" "}
          <span>
            {service.vl_servico?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </Card>
  );
};
