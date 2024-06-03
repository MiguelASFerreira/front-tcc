"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogService } from "./components";
import { CardService } from "./components/card_service";
import { toast } from "sonner";
import { api } from "@/data/api";
import { z } from "zod";
import { Spinner } from "@/components/spinner";

const paramsService = z.object({
  id_servico: z.coerce.number(),
  id_servicoOferta: z.coerce.number(),
  rota_inicio: z.string(),
  rota_fim: z.string(),
  vl_servico: z.coerce.number(),
});

type ParamsService = z.infer<typeof paramsService>;

export default function ServicoPage()  {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<ParamsService[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get("/servico/empresa", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(data);
      } catch (error) {
        console.error("Erro ao listar os serviços:", error);
        return toast.error("Erro ao listar os serviços", {
          description: "Reinicie a página!",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchServices();
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-loginColor font-bold text-xl">Serviços</h1>
      <Separator className="bg-[#008B85] h-[2px] rounded mb-5" />
      <div className="mx-4 h-[300px]">
        <h2 className="text-loginColor font-bold text-lg">
          Serviços Existentes
        </h2>
        <Separator className="bg-[#008B85] h-[1px] rounded mb-2" />
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        ) : (
          <ScrollArea className="h-full w-full rounded-md border p-4">
            {services.map((service) => (
              <div key={service.id_servicoOferta} className="mb-4">
                <CardService service={service} />
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
      <div className="mx-4 mt-[45px]">
        <h2 className="text-loginColor font-bold text-lg">
          Adicionar Serviços
        </h2>
        <Separator className="bg-[#008B85] h-[1px] rounded mb-2" />
        <DialogService token={token} />
      </div>
    </div>
  );
}
