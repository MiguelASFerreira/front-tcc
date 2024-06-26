"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/data/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email({
    message: "Email Inválido",
  }),
});

const resetCodeSchema = z.object({
  code: z.coerce.number().min(6, {
    message: "A senha tem no mínimo 6 dígitos!",
  }),
  newSenha: z.string(),
});

type EmailSchema = z.infer<typeof emailSchema>;
type ResetCodeSchema = z.infer<typeof resetCodeSchema>;

export default function ResetCodePage() {
    const router = useRouter()
    const [tab, setTab] = useState("email");

    const onTabChange = (value: string) => {
      setTab(value);
    }
  
  const formEmail = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const formResetCode = useForm<ResetCodeSchema>({
    resolver: zodResolver(resetCodeSchema),
    defaultValues: {
      code: undefined,
      newSenha: "",
    },
  });

  const handleEmail = async (data: EmailSchema) => {
    try {
        const response = await api.post('/reset-code-empresa', {
            email: data.email
        })
        toast.success('Sucesso', {
            description: 'O e-mail foi enviado com sucesso!'
        })
        setTab("senha");
        return response.data
    } catch (error) {
        console.log(error)
        toast.error('Ocorreu um erro', {
            description: 'Ocorreu um erro ao enviar o email, tente novamente!'
        })
    }
  }

  const handleResetCode = async (data: ResetCodeSchema) => {
    try {
        await api.post(`/empresa/reset-password/${data.code}`, {
        novaSenha: data.newSenha,
      });
      toast.success("Senha Atualizada com sucesso!");
      router.push("/");
    } catch (error) {
        console.log(error)
        toast.error('Ocorreu um erro', {
            description: 'Ocorreu um erro ao atualizar a senha!'
        })
    }
  }
  return (
    <Tabs value={tab} onValueChange={onTabChange} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="email">Informe o e-mail</TabsTrigger>
        <TabsTrigger value="senha">Nova Senha</TabsTrigger>
      </TabsList>
      <TabsContent value="email">
        <Card>
          <CardHeader>
            <CardTitle>E-mail</CardTitle>
            <CardDescription>
              Informe o e-mail cadastrado, e você receberá uma mensagem com o
              código.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Form {...formEmail}>
                <form onSubmit={formEmail.handleSubmit(handleEmail)}>
                  <FormField
                    control={formEmail.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="E-mail" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-4">
                    Enviar
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="senha">
        <Card>
          <CardHeader>
            <CardTitle>Nova Senha</CardTitle>
            <CardDescription>Coloque o codigo e a nova senha</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...formResetCode}>
              <form onSubmit={formResetCode.handleSubmit(handleResetCode)}>
                <div className="space-y-1">
                  <FormField
                    control={formResetCode.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <FormField
                    control={formResetCode.control}
                    name="newSenha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nova Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Nova Senha" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-7">
                    Enviar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
