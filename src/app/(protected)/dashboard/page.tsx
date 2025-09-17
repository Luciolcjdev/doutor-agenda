import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import SignOutButton from './components/sign-out-button';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return redirect('/authentication');
  }
  if (!session.user.clinic) {
    return redirect('/clinic-form');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {session?.user.name}</h2>
      <p>Cadastrado com o e-mail: {session?.user.email}</p>
      <div>
        <SignOutButton />
      </div>
    </div>
  );
}
