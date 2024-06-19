"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/data/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { z } from "zod";
import { MoreHorizontal, Ellipsis } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const descontoScehma = z.object({
  desconto: z.string(),
});

interface DropdownClientProps {
  id_client: number;
}

type DescontoSchema = z.infer<typeof descontoScehma>;

export const DropdownClient = ({ id_client }: DropdownClientProps) => {
  const { token } = useAuth();
  const form = useForm<DescontoSchema>({
    resolver: zodResolver(descontoScehma),
    defaultValues: {
      desconto: "",
    },
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);

  const handleFinalContrato = async () => {
    try {
      const { data } = await api.delete(`/empresa/${id_client}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
      return toast.success("Usuário removido", {
        description: data.message,
      });
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro", {
        description:
          "Opa! Tivemos um erro ao tentar, temninar o contrato. Tente Novamente!",
      });
    }
  };

  const handleUpdate = async (data: DescontoSchema) => {
    try {
      const response = await api.patch(
        `/contrato/desconto/${id_client}`,
        {
          desconto: Number(data.desconto),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      form.reset();
      return toast.success("Sucesso!", {
        description: response.data.message,
      });
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro", {
        description:
          "Opa! Tivemos um erro ao tentar, adicionar o desconto. Tente Novamente!",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className="h-8 w-8 p-0 outline-none">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            Adicionar Desconto
          </DropdownMenuItem>
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
            <AlertDialogAction
              onClick={handleFinalContrato}
              className="bg-[#005C58]"
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[1000px]">
          <DialogHeader>
            <DialogTitle>Adicionar Desconto</DialogTitle>
            <DialogDescription>
              Deseja adicionarr um desconto?{" "}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)}>
              <FormField
                control={form.control}
                name="desconto"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel className="font-bold text-loginColor">
                      Qual o novo valor do desconto?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Valor do Desconto"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-between mt-4">
                <DialogClose asChild>
                  <Button className="bg-[#FF3D00] w-[48%] h-full rounded text-white">
                    Cancelar
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="bg-[#008B85] w-[48%] h-full rounded text-white"
                  >
                    Adicionar Desconto
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
