import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "./components/sign-out-button";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersToClinicsTable } from "@/db/schema";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return redirect("/authentication");
  }

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });
  if (clinics.length === 0) {
    return redirect("/clinic-form");
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
