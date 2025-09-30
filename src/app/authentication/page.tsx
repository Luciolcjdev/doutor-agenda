import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import LoginForm from "./components/login-form";
import SiginUpForm from "./components/sigin-up-form";

export default async function AuthenticationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen w-screen items-center justify-center space-y-16 bg-gradient-to-br from-teal-900/90 via-blue-900/85 to-slate-900/90">
      <div className="flex items-center justify-center pt-16">
        <Image
          src="/logo.svg"
          width={350}
          height={250}
          alt="Logo Doutor Agenda"
        />
      </div>
      <div className="flex items-center justify-center">
        <Tabs defaultValue="login" className="w-[480px] shadow-2xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Criar Conta</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <SiginUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
