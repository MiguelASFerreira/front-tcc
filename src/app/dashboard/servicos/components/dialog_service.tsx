"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandEmpty,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown, CirclePlus, Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api, isAxiosError } from "@/data/api";

const servicoSchema = z.object({
  servicoId: z.number(),
  valor: z.coerce.number().nonnegative(),
});

type ServicoSchema = z.infer<typeof servicoSchema>;

interface DialogServiceProps {
  token: string | null;
}

interface ErrorResponseData {
  message: string;
}

export const DialogService: React.FC<DialogServiceProps> = ({ token }) => {
  const [options, setOptions] = useState<any[]>([]);
  const form = useForm<ServicoSchema>({
    resolver: zodResolver(servicoSchema),
    defaultValues: {
      servicoId: undefined,
      valor: 0,
    },
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await api.get("/servico");
        const optionsFormatted = data
          ? data.map((item: any) => ({
              value: item.id,
              label: item.rota,
            }))
          : [];
        setOptions(optionsFormatted);
      } catch (error) {
        console.error("Erro ao buscar opções:", error);
        toast.error("Erro ao buscar os serviços", {
          description: "Feche o modal e tente novamente!",
        });
      }
    };

    fetchOptions();
  }, []);

  const handleService = async (data: ServicoSchema): Promise<void> => {
    try {
      if (data.valor <= 0) {
        toast.warning("Cuidado!", {
          description: "Não pode haver valores negativos ou zero!",
        });
        return;
      }
      const response = await api.post(
        "/servico-oferta",
        {
          id_servico: data.servicoId,
          vl_servico: data.valor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      form.reset();
      window.location.reload();

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
      <DialogTrigger className="flex items-center justify-center w-full bg-[#008B85] rounded-sm h-[46px]">
        <CirclePlus className="text-white" />
      </DialogTrigger>
      <DialogContent className="w-[1000px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Serviço</DialogTitle>
          <DialogDescription>
            Preencha todos os campos abaixo para adicionar um novo serviço.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleService)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex flex-col items-center gap-4 col-span-1">
              <div className="flex items-center gap-2 w-full h-full">
                <div className="flex items-center justify-center bg-[#008B85] w-8 h-full text-center text-white font-bold rounded">
                  1
                </div>
                <FormField
                  control={form.control}
                  name="servicoId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="font-bold text-loginColor">
                        Escolha um serviço:{" "}
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? options.find(
                                    (option) => option.value === field.value
                                  )?.label
                                : "Selecione um serviço"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Selecione um serviço" />
                            <CommandEmpty>Sem Serviços</CommandEmpty>
                            <CommandList className="w-[320px]">
                              <CommandGroup>
                                {options.map((option) => (
                                  <CommandItem
                                    value={option.label}
                                    key={option.value}
                                    onSelect={() => {
                                      form.setValue("servicoId", option.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        option.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {option.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 col-span-1">
              <div className="flex items-center gap-2 w-full">
                <div className="flex items-center justify-center bg-[#008B85] w-8 h-full text-center text-white font-bold rounded">
                  2
                </div>
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-loginColor">
                        Digite o valor do serviço:
                      </FormLabel>
                      <FormControl className="outline-none">
                        <Input
                          type="number"
                          min="1"
                          className="rounded-none border-0 border-b-2 border-loginColor"
                          placeholder="Ex: 100.00"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.valor && (
                        <FormMessage>
                          {form.formState.errors.valor.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center gap-1 col-span-1">
              <DialogClose asChild>
                <Button className="bg-[#FF3D00] w-full h-full rounded text-white">
                  Cancelar
                </Button>
              </DialogClose>
            </div>
            <div className="flex items-center gap-1 col-span-1">
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="bg-[#008B85] w-full h-full rounded text-white"
                >
                  Adicionar Serviço
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
