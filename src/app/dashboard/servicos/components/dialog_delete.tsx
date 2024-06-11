"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/data/api";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DialogDeleteProps {
  id_servico: number;
}

export const DialogDelete = ({ id_servico }: DialogDeleteProps) => {
  const { token } = useAuth();
  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/servico-oferta/empresa/${id_servico}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.reload();
      return toast.success("Sucesso", {
        description: `${response.data.message}`,
      });
    } catch (error) {
      return toast.error("Ocorreu um erro", {
        description: `${error}`,
      });
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center justify-center gap-1 text-white bg-[#FF3D00] h-[22px] p-2 rounded">
          <Trash className="h-4 w-4" /> Apagar
        </DialogTrigger>
        <DialogContent className="w-[1000px]">
          <DialogHeader>
            <DialogTitle>Excluir Serviço</DialogTitle>
            <DialogDescription className="flex flex-col items-center justify-start">
              <div>Deseja apagar o serviço? </div>
              <div>
                <span className="text-red-700">Atenção: </span>
                Antes de apagar o serviço certifique-se de enncerar o contrato
                com os clientes do serviço
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between mt-4">
            <DialogClose asChild>
              <Button className="bg-[#FF3D00] w-[48%] h-full rounded text-white">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={handleDelete}
                className="bg-[#008B85] w-[48%] h-full rounded text-white"
              >
                Apagar Serviço
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
