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

interface DropdownClientProps {
  id_client: number
}

export const DropdownClient = ({id_client}: DropdownClientProps) => {
  const { token } = useAuth()
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);

  const handleFinalContrato = async () => {
    try {
      const { data } = await api.delete(`/empresa/${id_client}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      window.location.reload()
      console.log(data)
      return toast.success('Usuário removido', {
        description: data.message
      })
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro', {
        description: 'Opa! Tivemos um erro ao tentar, temninar o contrato. Tente Novamente!'
      })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="outline-none">...</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setAlertDialogOpen(true)}>
            Terminar Contrato
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Gostaria de terminar o contrato com o cliente?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Isso irá terminar o contrato com cliente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleFinalContrato} className="bg-[#005C58]">
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
