import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import LoginForm from './components/login-form';
import SiginUpForm from './components/sigin-up-form';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthenticationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-500">
      <Tabs defaultValue="login" className="w-[480px]">
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
  );
}
