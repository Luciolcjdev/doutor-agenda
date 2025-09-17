import { Button } from '@/components/ui/button';
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/ui/page-container';
import { Plus } from 'lucide-react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AddDoctorsButton from './components/add-doctors-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default async function DoctorsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect('/authentication');
  }
  if (!session.user.clinic) {
    redirect('/clinic-form');
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>
            Gerencie os médicos cadastrados no sistema.
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddDoctorsButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        {/* List of doctors will go here in the future */}
        <div className="flex h-96 flex-col items-center justify-center">
          <Avatar className="mb-4 h-24 w-24">
            <AvatarFallback>
              <Plus className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <p className="text-lg font-medium text-gray-700">
            Nenhum médico cadastrado ainda.
          </p>
          <p className="text-sm text-gray-500">
            Clique no botão "Adicionar Médico" para começar a cadastrar.
          </p>
        </div>
      </PageContent>
    </PageContainer>
  );
}
