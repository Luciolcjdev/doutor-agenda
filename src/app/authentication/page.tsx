"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { z } from "zod";
import SiginUpForm from "./components/sigin-up-form";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export default function AuthenticationPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login">
        <TabsList className="w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar Conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Faça login para continuar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
            <CardFooter>
              <Button>Entrar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <SiginUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
