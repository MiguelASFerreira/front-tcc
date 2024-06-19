"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  // FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/data/api";
import { formatCPF, formatPhoneNumber } from "@/utils/formatUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  dono: z.string(),
  cpf: z.string(),
  nomeEmpresa: z.string(),
  telefone: z.string(),
  email: z.string().email({
    message: "Email Inválido",
  }),
  password: z.string().min(4, {
    message: "Senha com no mínimo 4 caracteres!",
  }),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterHome() {
  const { signIn } = useAuth();
  const router = useRouter();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      dono: "",
      cpf: "",
      nomeEmpresa: "",
      telefone: "",
      email: "",
      password: "",
    },
  });
  const handleRegister = async (data: RegisterSchema) => {
    try {
      const telefoneLimpo = data.telefone
        ? String(data.telefone).replace(/\D/g, "")
        : null;

      const response = await api.post("/empresa", {
        email: data.email,
        password: data.password,
        nome: data.nomeEmpresa,
        dono: data.dono,
        image_url: "string",
        telefone1: Number(telefoneLimpo),
        cpf: data.cpf
      });

      if (response.status === 201) {
        await signIn(data.email, data.password);
        toast.success("Cadastro realizado com sucesso", {
          description: "Você está sendo redicionado para o Dashboard",
        });
      } else {
        toast.success("Cadastro realizado com sucesso", {
          description: "Você está sendo redicionado para o a tela de login",
        });
        router.push("/");
      }
      return response.data
    } catch (error) {
      console.log(error);
      toast.error("Erro ao realizar o cadastro", {
        description: "Ocorreu um erro ao realizar o cadastro",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-[44px] text-welcomeColor">Cadastro</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="flex flex-col gap-2 w-[247.82px]"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="dono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-loginColor">
                    Digite seu nome:
                  </FormLabel>
                  <FormControl className="outline-none">
                    <Input
                      required
                      placeholder="Nome"
                      {...field}
                      className="rounded-none border-0 border-b-2 border-loginColor"
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
                  <FormLabel className="font-bold text-loginColor">
                    Digite seu cpf:
                  </FormLabel>
                  <FormControl className="outline-none">
                    <Input
                      required
                      onChange={(e) => {
                        const { value } = e.target;
                        e.target.value = formatCPF(value);
                        onChange(e);
                      }}
                      className="rounded-none border-0 border-b-2 border-loginColor"
                      placeholder="CPF"
                      {...props}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nomeEmpresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-loginColor">
                    Digite o nome da empresa:
                  </FormLabel>
                  <FormControl className="outline-none">
                    <Input
                      required
                      className="rounded-none border-0 border-b-2 border-loginColor"
                      placeholder="Empresa"
                      {...field}
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
                  <FormLabel className="font-bold text-loginColor">
                    Digite seu telefone ou da empresa:
                  </FormLabel>
                  <FormControl className="outline-none">
                    <Input
                      required
                      onChange={(e) => {
                        const { value } = e.target;
                        e.target.value = formatPhoneNumber(value);
                        onChange(e);
                      }}
                      className="rounded-none border-0 border-b-2 border-loginColor"
                      placeholder="Telefone"
                      {...props}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-loginColor">
                    Digite seu email:
                  </FormLabel>
                  <FormControl className="outline-none">
                    <Input
                      required
                      className="rounded-none border-0 border-b-2 border-loginColor"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-loginColor">
                    Digite sua senha:
                  </FormLabel>
                  <FormControl className="outline-none">
                    <Input
                      required
                      type="password"
                      className="rounded-none border-0 border-b-2 border-loginColor"
                      placeholder="Senha"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="bg-[#005C58] w-full">
            Acessar
          </Button>
        </form>
      </Form>
    </div>
  );
}
