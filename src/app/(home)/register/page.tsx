"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/data/api";
import { formatCPForCNPJ, formatPhoneNumber } from "@/utils/formatUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  dono: z.string().min(1, { message: "Seu nome é obrigatório" }),
  cpfCnpj: z
    .string()
    .min(1, { message: "CPF/CNPJ é obrigatório" })
    .regex(
      /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$|^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/,
      { message: "CPF/CNPJ inválido" }
    ),
  nomeEmpresa: z.string().min(1, { message: "Nome da empresa é obrigatório" }),
  telefone: z
    .string()
    .min(1, { message: "Telefone é obrigatório" })
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, { message: "Telefone inválido" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(4, { message: "Senha com no mínimo 4 caracteres" }),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterHome() {
  const { signIn } = useAuth();
  const router = useRouter();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      dono: "",
      cpfCnpj: "",
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
        cpf: data.cpfCnpj,
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
      return response.data;
    } catch (error: any) {
      console.log(error)
      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.data.message;
        form.setError('email', { message: errorMessage });
    } else {
      toast.error("Erro ao realizar o cadastro", {
        description: "Ocorreu um erro ao realizar o cadastro. Tente Novamente!",
      });
    }
    }
  };

  const dono = form.watch("dono")
  const cpfCnpj = form.watch("cpfCnpj")
  const empresa = form.watch("nomeEmpresa")
  const tel = form.watch("telefone")
  const email = form.watch("email")
  const password = form.watch("password")

  const isValid = dono && cpfCnpj && empresa && tel && email && password

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
                      placeholder="Nome"
                      {...field}
                      className="rounded-none border-0 border-b-2 border-loginColor"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpfCnpj"
              render={({ field: { onChange, ...props } }) => (
                <FormItem>
                  <FormLabel className="font-bold text-loginColor">
                    Digite seu CPF ou CNPJ:
                  </FormLabel>
                  <FormControl className="outline-none">
                    <Input
                      onChange={(e) => {
                        const { value } = e.target;
                        e.target.value = formatCPForCNPJ(value);
                        onChange(e);
                      }}
                      className="rounded-none border-0 border-b-2 border-loginColor"
                      placeholder="CPF"
                      {...props}
                    />
                  </FormControl>
                  <FormMessage />
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
                      className="rounded-none border-0 border-b-2 border-loginColor"
                      placeholder="Empresa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
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
                      className="rounded-none border-0 border-b-2 border-loginColor"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                      type="password"
                      className="rounded-none border-0 border-b-2 border-loginColor"
                      placeholder="Senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={!isValid} type="submit" className="bg-[#005C58] w-full">
            Acessar
          </Button>
        </form>
      </Form>
    </div>
  );
}
