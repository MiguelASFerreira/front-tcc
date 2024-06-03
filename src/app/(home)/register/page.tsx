"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    nome: z.string(),
    cpf: z.number(),
    nomeEmpresa: z.string(),
    telefone: z.number(),
    email: z.string().email({
      message: "Email Inválido",
    }),
    password: z.string().min(5, {
      message: "Senha acima de 5 caracteres",
    }),
    confirmedPassword: z.string().min(5, {
      message: "Senha de confirmação acima de 5 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "As senhas não são iguais",
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterHome() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: "",
      cpf: undefined,
      nomeEmpresa: "",
      telefone: undefined,
      email: "",
      password: "",
      confirmedPassword: "",
    },
  });

  const handleLogin = (data: RegisterSchema) => {
    return console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <h1 className="font-bold text-[44px] text-welcomeColor">Cadastro</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-2 w-[247.82px]"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="nome"
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-loginColor">
                    Digite seu cpf:
                  </FormLabel>
                  <FormControl className="outline-none">
                    <Input className="rounded-none border-0 border-b-2 border-loginColor" placeholder="CPF" {...field} />
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
                    <Input className="rounded-none border-0 border-b-2 border-loginColor" placeholder="Empresa" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-loginColor">
                    Digite seu telefone ou da empresa:
                  </FormLabel>
                  <FormControl className="outline-none">
                    <Input className="rounded-none border-0 border-b-2 border-loginColor" placeholder="Telefone" {...field} />
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
                    <Input className="rounded-none border-0 border-b-2 border-loginColor" placeholder="Email" {...field} />
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
                    <Input className="rounded-none border-0 border-b-2 border-loginColor" placeholder="Senha" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmedPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-loginColor">
                    Confirme sua senha:
                  </FormLabel>
                  <FormControl className="outline-none">
                    <Input className="rounded-none border-0 border-b-2 border-loginColor" placeholder="Senha" {...field} />
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
