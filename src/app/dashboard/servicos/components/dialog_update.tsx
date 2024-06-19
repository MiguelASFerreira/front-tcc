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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/data/api";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface DialogUpdateProps {
  id_servico: number;
}

const servicoSchema = z.object({
  valor: z.coerce.number(),
});

type ServicoSchema = z.infer<typeof servicoSchema>;

export const DialogUpdate = ({ id_servico }: DialogUpdateProps) => {
  const { token } = useAuth();
  const form = useForm<ServicoSchema>({
    resolver: zodResolver(servicoSchema),
    defaultValues: {
      valor: 0,
    },
  });

  const handleUpdate = async (data: ServicoSchema) => {
    try {
        const response = await api.patch(
          `/servico-oferta/empresa`,
          {
            id_servico: id_servico,
            valor: data.valor
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        form.reset()
        window.location.reload();
        return toast.success("Sucesso", {
          description: `${response.data.message}`,
        });
    } catch (error) {
      form.reset()
      return toast.error("Ocorreu um erro", {
        description: `${error}`,
      });
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center justify-center gap-1 text-white bg-[#00413E] h-[22px] p-2 rounded">
          <Edit className="h-4 w-4" /> Editar
        </DialogTrigger>
        <DialogContent className="w-[1000px]">
          <DialogHeader>
            <DialogTitle>Excluir Serviço</DialogTitle>
            <DialogDescription>Deseja editar o serviço? </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)}>
              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel className="font-bold text-loginColor">Qual o novo valor do serviço?</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Novo Valor" {...field} />
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
                    Editar Serviço
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
