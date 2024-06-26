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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({
    message: "Email Inválido",
  }),
  password: z.string().min(4, {
    message: "Senha com no mínimo 4 caracteres!",
  }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginHome() {
  const { signIn } = useAuth();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = async (data: LoginSchema): Promise<void> => {
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="font-bold text-[44px] text-welcomeColor">Bem Vindo(a)</h1>
      <h3 className="font-bold text-[22px] text-loginColor">Login</h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-3 w-full"
        >
          <div className="space-y-2">
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
                      type="email"
                      className="rounded-none border-0 border-b-2 border-loginColor"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email.message}
                    </FormMessage>
                  )}
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
                  {form.formState.errors.password && (
                    <FormMessage>
                      {form.formState.errors.password.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="bg-[#005C58] w-full">
            Acessar
          </Button>
        </form>
      </Form>

      <Link
        href={"/register"}
        className="font-semibold text-[12px] text-loginColor hover:underline"
      >
        Primeiro Acesso? Cadastrar-se
      </Link>
      <Link
        href={"/reset-code"}
        className="font-semibold text-[12px] text-loginColor hover:underline mt-1"
      >
        Esqueci a senha
      </Link>
    </div>
  );
}
