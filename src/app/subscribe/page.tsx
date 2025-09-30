import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "../(protected)/subscription/components/subscription-plan";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/authentication");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-subscribe.webp"
          alt="Clínica moderna"
          className="h-full w-full object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 via-blue-900/85 to-slate-900/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Marketing text section */}
          <div className="space-y-6 text-white">
            <h1 className="text-4xl leading-tight font-bold text-balance lg:text-5xl">
              Transforme a gestão da sua clínica
            </h1>
            <p className="text-lg leading-relaxed text-pretty text-teal-100 lg:text-xl">
              Simplifique agendamentos, organize prontuários e ofereça uma
              experiência excepcional aos seus pacientes. Tudo em uma plataforma
              intuitiva e segura.
            </p>
            <ul className="space-y-3 text-base lg:text-lg">
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-6 w-6 flex-shrink-0 text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Reduza faltas com confirmações automáticas</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-6 w-6 flex-shrink-0 text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Acesse informações de qualquer lugar, a qualquer hora
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-6 w-6 flex-shrink-0 text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Conformidade total com LGPD e segurança de dados</span>
              </li>
            </ul>
            <div className="pt-4">
              <p className="text-sm text-teal-200">
                Junte-se a mais de 500 profissionais que já confiam em nossa
                plataforma
              </p>
            </div>
          </div>

          {/* Plan card section */}
          <div className="flex justify-center lg:justify-end">
            <SubscriptionPlan userEmail={session.user.email} />
          </div>
        </div>
      </div>
    </div>
  );
}
