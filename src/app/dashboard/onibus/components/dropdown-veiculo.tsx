"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { api } from "@/data/api";
import { useAuth } from "@/context/AuthContext";
import { UpdateVeiculo } from "./updateVeiculo";

interface DropdownVeiculoProps {
  veiculoId: number;
}

export const DropdownVeiculo = ({ veiculoId }: DropdownVeiculoProps) => {
  const { token } = useAuth();
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const {data} = await api.delete(`/veiculo/${veiculoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
      toast.success("Veículo deletado!", {
        description: data.message
      });
    } catch (error) {
      toast.error("Erro ao deletar o veículo!");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="outline-none">...</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setUpdateDialogOpen(true)}>
            Atualizar Veículo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setAlertDialogOpen(true)}>
            Apagar Veículo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Gostaria de apagar o veiculo?</AlertDialogTitle>
            <AlertDialogDescription>
              Isso irá apagar o veículo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-[#005C58]">
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpdateVeiculo
        isOpen={isUpdateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        veiculoId={veiculoId}
      />
    </>
  );
};
