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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useState } from "react";

const onibusSchema = z.object({
  veiculo: z.string().optional(),
  placa: z.string().optional(),
  capacidade: z.string().optional(),
  adaptavel: z.string().optional(),
});

type OnibusSchema = z.infer<typeof onibusSchema>;

interface UpdateVeiculoProps {
  isOpen: boolean;
  onClose: () => void;
  veiculoId: number;
}

export const UpdateVeiculo = ({
  isOpen,
  onClose,
  veiculoId,
}: UpdateVeiculoProps) => {
  const { token } = useAuth();
  const form = useForm<OnibusSchema>({
    resolver: zodResolver(onibusSchema),
    defaultValues: {
      veiculo: "",
      placa: "",
      capacidade: "",
      adaptavel: "",
    },
  });

  const handleUpdate = async (data: OnibusSchema) => {
    try {
      const requestData = {
        nome: data.veiculo ? data.veiculo : null,
        placa: data.placa ? data.placa : null,
        capacidade: data.capacidade ? Number(data.capacidade) : null,
        adaptavel:
          data.adaptavel === "adaptavel"
            ? true
            : data.adaptavel === "naoAdaptavel"
              ? false
              : null,
      };
      const response = await api.patch(`/veiculo/${veiculoId}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
      form.reset();
      toast.success("Veículo atualizado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error("Erro ao atualizar veículo!");
    }
  };

  const veiculo = form.watch("veiculo");
  const placa = form.watch("placa");
  const capacidade = form.watch("capacidade");
  const adaptavel = form.watch("adaptavel");

  const isFormValid = veiculo || placa || capacidade || adaptavel;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Atualizar Veículo</DialogTitle>
          <DialogDescription>Atualizações no Veículo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
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
                    <Input
                      type="number"
                      min="1"
                      placeholder="Ex: 10"
                      {...field}
                    />
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
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adaptavel">Adaptável</SelectItem>
                        <SelectItem value="naoAdaptavel">
                          Não Adaptável
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
              <Button
                type="submit"
                className="bg-[#008B85] w-[48%] h-full rounded text-white"
                disabled={!isFormValid}
              >
                Atualizar Veículo
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
