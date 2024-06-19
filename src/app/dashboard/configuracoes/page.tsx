"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCPF, formatPhoneNumber } from "@/utils/formatUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/data/api";
import { Spinner } from "@/components/spinner";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const updateSchema = z.object({
  nomeEmpresa: z.string().optional(),
  dono: z.string().optional(),
  telefone: z.union([z.coerce.number().optional(), z.string().optional()]),
  cpf: z.string().optional(),
});

const imageSchema = z.object({
  image_url: z.instanceof(File).optional(),
});

type UpdateSchema = z.infer<typeof updateSchema>;
type ImageSchema = z.infer<typeof imageSchema>;

interface DataEmpresa {
  nome: string;
  dono: string;
  telefone1: number | undefined;
  cpf: string;
  CAPACIDADE_MAXIMA: string;
  QUANTIDADE_VEICULOS: number;
  image_url: string;
}

export default function ConfiguracoesPage() {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dataEmpresa, setDataEmpresa] = useState<DataEmpresa | null>(null);
  const form = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      nomeEmpresa: "",
      dono: "",
      telefone: "",
      cpf: "",
    },
  });

  const formImage = useForm<ImageSchema>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      image_url: undefined,
    },
  });

  const handleUpdate = async (data: UpdateSchema) => {
    try {
      const telefoneLimpo = data.telefone
        ? String(data.telefone).replace(/\D/g, "")
        : null;

      const requestData = {
        nome: data.nomeEmpresa ? data.nomeEmpresa : null,
        dono: data.dono ? data.dono : null,
        telefone1: Number(telefoneLimpo),
        cpf: data.cpf ? data.cpf : null,
      };
      const response = await api.patch("/empresa", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form.reset();
      window.location.reload();
      toast.success("Seus novos dados foram salvos!", {
        description: "Novos dados salvos em nosso sistema",
      });
      return response.data;
    } catch (error) {
      toast.error("Erro ao atualizar seus dados", {
        description:
          "Ocorreu um erro ao atualizar seus dados, Tente Novamente!",
      });
    }
  };

  const handleSaveImage = async (data: ImageSchema) => {
    try {
      const response = await api.post(
        "/empresa/upload/image",
        {
          image: data.image_url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );
      formImage.reset();
      window.location.reload();
      toast.success("Sucesso!", {
        description: "Imagem salva com sucesso!",
      });
      return response.data;
    } catch (error) {
      toast.error("Erro ao atualizar seus dados", {
        description:
          "Ocorreu um erro ao atualizar seus dados, Tente Novamente!",
      });
    }
  };

  useEffect(() => {
    const getEmpresa = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get("/empresa", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataEmpresa(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      getEmpresa();
    }
  }, [token]);

  const nomeEmpresa = form.watch("nomeEmpresa");
  const dono = form.watch("dono");
  const telefone = form.watch("telefone");
  const cpf = form.watch("cpf");

  const image = formImage.watch("image_url");

  const isFormValid = nomeEmpresa || dono || telefone || cpf;
  const isFormImageValid = image;
  return (
    <div>
      <h1 className="text-loginColor font-bold text-xl">Configurações</h1>
      <Separator className="bg-[#008B85] h-[2px] rounded mb-2" />
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais da conta</CardTitle>
              <CardDescription>
                Aqui você pode realizar as configurações básicas de sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdate)}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="nomeEmpresa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Empresa:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={dataEmpresa?.nome || ""}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dono"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Dono:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={dataEmpresa?.dono || ""}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field: { onChange, ...props } }) => (
                          <FormItem>
                            <FormLabel>CPF:</FormLabel>
                            <FormControl>
                              <Input
                                onChange={(e) => {
                                  const { value } = e.target;
                                  e.target.value = formatCPF(value);
                                  onChange(e);
                                }}
                                placeholder={dataEmpresa?.cpf || ""}
                                {...props}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field: { onChange, ...props } }) => (
                          <FormItem>
                            <FormLabel>Telefone:</FormLabel>
                            <FormControl>
                              <Input
                                onChange={(e) => {
                                  const { value } = e.target;
                                  e.target.value = formatPhoneNumber(value);
                                  onChange(e);
                                }}
                                placeholder={
                                  dataEmpresa?.telefone1
                                    ? formatPhoneNumber(dataEmpresa.telefone1)
                                    : ""
                                }
                                {...props}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 pl-[250px]"></div>
                  </div>
                  <div className="flex items-center justify-end gap-4 mt-4">
                    <div>
                      <Button
                        type="submit"
                        className="bg-[#005C58] w-[150px]"
                        disabled={!isFormValid}
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="mt-5">
          <CardHeader>
              <CardTitle>Configuração da Imagem de perfil</CardTitle>
              <CardDescription>
                Aqui você pode realizar o upload de uma nova imagem de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
            <Form {...formImage}>
              <form onSubmit={formImage.handleSubmit(handleSaveImage)}>
                <Avatar className="w-[150px] h-[150px]">
                  <AvatarImage
                    src={
                      dataEmpresa?.image_url
                        ? dataEmpresa?.image_url
                        : "/default-image2.svg"
                    }
                    alt="Imagem default"
                  />
                  <AvatarFallback>UB</AvatarFallback>
                </Avatar>
                <FormField
                  control={formImage.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              formImage.setValue("image_url", file);
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-end gap-4 mt-4">
                  <div>
                    <Button
                      type="submit"
                      className="bg-[#005C58] w-[150px]"
                      disabled={!isFormImageValid}
                    >
                      Salvar Imagem
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
