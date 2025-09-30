import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";

import ClinicForm from "./components/form";

export default async function ClinicFormPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return redirect("/authentication");
  }
  if (!session.user.plan) {
    return redirect("/subscribe");
  }

  return (
    <Dialog open={true}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicione uma clínica</DialogTitle>
            <DialogDescription>
              Adicione uma clínica para continuar.
            </DialogDescription>
          </DialogHeader>
          <ClinicForm />
        </DialogContent>
      </form>
    </Dialog>
  );
}
