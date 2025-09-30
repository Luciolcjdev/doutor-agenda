"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CircleCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface SubscriptionPlanProps {
  active?: boolean;
  className?: string;
  userEmail: string;
}

export function SubscriptionPlan({
  active = false,
  userEmail,
}: SubscriptionPlanProps) {
  const router = useRouter();

  const createStripeCheckoutAction = useAction(createStripeCheckout, {
    onSuccess: async ({ data }) => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key not found");
      }
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );
      if (!stripe) {
        throw new Error("Stripe not found");
      }
      if (!data?.sessionId) {
        throw new Error("Session ID not found");
      }
      await stripe.redirectToCheckout({
        sessionId: data?.sessionId,
      });
    },
  });

  const features = [
    "Cadastro de até 3 médicos",
    "Agendamentos ilimitados",
    "Métricas básicas",
    "Cadastro de pacientes",
    "Confirmação manual",
    "Suporte via e-mail",
  ];

  const handleSubscriptionClick = () => {
    createStripeCheckoutAction.execute();
  };

  const handleManagePlanClick = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${userEmail}`,
    );
  };

  return (
    <Card className={"w-full max-w-sm border border-gray-200 bg-white"}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Essential</h3>
            <p className="mt-1 text-sm text-gray-600">
              Para profissionais autônomos ou pequenas clínicas
            </p>
          </div>
          {active && (
            <Badge className="border-teal-200 bg-teal-100 text-teal-700 hover:bg-teal-100">
              Atual
            </Badge>
          )}
        </div>

        <div className="mt-4">
          <span className="text-3xl font-bold text-gray-900">R$59</span>
          <span className="ml-1 text-gray-600">/ mês</span>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
                <CircleCheck className="h-4 w-4 text-teal-600" />
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="bg-primary w-full text-white"
          size="lg"
          variant="outline"
          onClick={active ? handleManagePlanClick : handleSubscriptionClick}
          disabled={createStripeCheckoutAction.isExecuting}
        >
          {createStripeCheckoutAction.isExecuting ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : active ? (
            "Gerenciar assinatura"
          ) : (
            "Fazer assinatura"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
