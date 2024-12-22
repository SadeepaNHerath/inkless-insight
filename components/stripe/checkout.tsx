"use server";
import React, { ChangeEvent, useTransition } from "react";
import { FaBolt } from "react-icons/fa6";
import { useUser } from "@/lib/store/user";
import { checkout } from "@/lib/actions/stripe";
import { cn } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname } from "next/navigation";
import { EnvVarWarning } from "../env-var-warning";


export default function Checkout() {
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const user = useUser((state: { user: any; }) => state.user);

  const handleCheckOut = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const data = JSON.parse(
        await checkout(user?.email!, location.origin + pathname)
      );
      const result = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
      );
      await result?.redirectToCheckout({ sessionId: data.id });
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96 gap-4">
        <EnvVarWarning />
        <p className="text-gray-500 text-sm">Please log in to continue.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleCheckOut}
      className={cn(
        "flex flex-col items-center justify-center h-96 w-full space-y-4",
        { hidden: !user?.id },
        { "animate-pulse": isPending }
      )}
    >
      <button
        className="flex flex-col items-center bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300 transition-all duration-300"
        type="submit"
        disabled={isPending}
      >
        <h1 className="uppercase font-bold text-xl flex items-center gap-2">
          <FaBolt
            className={cn(
              "w-6 h-6",
              isPending ? "animate-spin" : "animate-bounce"
            )}
          />
          Upgrade to Pro
        </h1>
        <p className="text-sm text-gray-100">Unlock all inkless-insight contents</p>
      </button>
      {isPending && (
        <p className="text-sm text-gray-500 animate-pulse">
          Redirecting to checkout...
        </p>
      )}
    </form>
  );
}
