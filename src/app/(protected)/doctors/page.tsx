import { eq } from 'drizzle-orm';
import { Plus } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/ui/page-container';
import { db } from '@/db';
import { doctorsTable } from '@/db/schema';
import { auth } from '@/lib/auth';

import AddDoctorsButton from './components/add-doctors-button';
import DoctorCard from './components/doctor-card';

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

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user?.clinic.id),
  });

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
        <div className="grid grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        .
      </PageContent>
    </PageContainer>
  );
}

// <div className="flex h-96 flex-col items-center justify-center">
//   <Avatar className="mb-4 h-24 w-24">
//     <AvatarFallback>
//       <Plus className="h-10 w-10" />
//     </AvatarFallback>
//   </Avatar>
//   <p className="text-lg font-medium text-gray-700">
//     Nenhum médico cadastrado ainda.
//   </p>
//   <p className="text-sm text-gray-500">
//     Clique no botão "Adicionar Médico" para começar a cadastrar.
//   </p>
// </div>
