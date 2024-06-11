"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { api, isAxiosError } from "@/data/api";
import { useAuth } from "@/context/AuthContext";

const onibusSchema = z.object({
  veiculo: z.string(),
  placa: z.string(),
  capacidade: z.coerce.number(),
  adaptavel: z.boolean(),
});

type OnibusSchema = z.infer<typeof onibusSchema>;

interface ErrorResponseData {
  message: string;
}

export const AddVeiculo = () => {
  const { token } = useAuth();
  const form = useForm<OnibusSchema>({
    resolver: zodResolver(onibusSchema),
    defaultValues: {
      veiculo: "",
      placa: "",
      capacidade: 1,
      adaptavel: false,
    },
  });

  const handleVeiculo = async (data: OnibusSchema): Promise<void> => {
    try {
      const response = await api.post(
        "/veiculo",
        {
          nome: data.veiculo,
          placa: data.placa,
          capacidade: data.capacidade,
          adaptavel: data.adaptavel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      form.reset();  
      window.location.reload(); 

      toast.success('Suceeso', {
        description: 'Veículo Cadastrado!'
      })

      return response.data;
    } catch (error) {
      form.reset();
      console.log(error);
      if (
        isAxiosError<ErrorResponseData>(error) &&
        error.response?.data?.message ===
          "Este serviço já está cadastrado para esta empresa"
      ) {
        toast.error("Erro ao cadastrar o serviço", {
          description: "Este serviço já está cadastrado para esta empresa",
        });
      } else {
        toast.error("Erro ao cadastrar o serviço", {
          description:
            "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 bg-[#005C58] text-white p-3 rounded m-3">
        <CirclePlus className="text-white" /> Adicionar Veículo
      </DialogTrigger>
      <DialogContent className="w-full ">
        <DialogHeader>
          <DialogTitle>Adicionar Veículo</DialogTitle>
          <DialogDescription>Teste</DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVeiculo)}>
              <FormField
                control={form.control}
                name="veiculo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-loginColor">
                      Digite o tipo de veículo:
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Ônibus / Van / Mini Van"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="placa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-loginColor">
                      Digite o nº da placa do veículo:
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nº da Placa" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-loginColor">
                      Digite a capacidade do veículo:
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 10" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adaptavel"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        O veículo é adaptável:
                      </FormLabel>
                      <FormDescription>
                        Seu veículo é adaptável, para pessoas especiais?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
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
                    Adicionar Veículo
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
