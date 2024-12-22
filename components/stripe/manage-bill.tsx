"use client";
import { Button } from "@/components/ui/button";
import { manageBillingPortal } from "@/lib/actions/stripe";
import { cn } from "@/lib/utils";
import { GiBackpack } from "react-icons/gi";
import React, { ChangeEvent, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ManageBill({ customerId }: { customerId: string }) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const data = JSON.parse(await manageBillingPortal(customerId));
      window.location.href = data.url;
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Button
        variant="ghost"
        className={cn(
          "w-full flex justify-between items-center px-4 py-3 rounded-md text-lg font-medium transition-all duration-300",
          "hover:bg-muted hover:text-primary focus:ring focus:ring-primary/50",
          { "opacity-50 pointer-events-none": isPending }
        )}
      >
        <span className="flex items-center gap-3">
          <AiOutlineLoading3Quarters
            className={cn("text-primary animate-spin", { hidden: !isPending })}
            size={18}
          />
          {isPending ? "Processing..." : "Manage Billing"}
        </span>
        <GiBackpack size={20} />
      </Button>
    </form>
  );
}
