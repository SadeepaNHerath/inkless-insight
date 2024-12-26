"use client";

import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { MdDashboard } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LockOpenIcon } from "lucide-react";
import ManageBill from "./stripe/manage-bill";
import { useUser } from "@/lib/store/user";

export default async function HeaderAuth() {
  const user = useUser((state: { user: any }) => state.user);

  const isAdmin = user?.role === "admin";
  const isSub = user?.stripe_customer_id;

  return (
    <Popover>
      <PopoverTrigger>
        <img
          src="user.png"
          alt={user?.email ? `Profile of ${user.email.split("@")[0]}` : "User"}
          width={50}
          height={50}
          className="rounded-full ring-2 ring-green-500"
        />
      </PopoverTrigger>
      <PopoverContent className="space-y-3 divide-y p-2" side="bottom">
        <div className="px-4">
          <p className="text-sm">
            {user?.email ? user.email.split("@")[0] : "Anonymous"}
          </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        {isAdmin && (
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center"
            >
              Dashboard
              <MdDashboard size={24} className="mr-2 text-blue-500" />
            </Button>
          </Link>
        )}

        {!isAdmin && isSub && (
          <ManageBill customerId={user.stripe_customer_id} />
        )}

        <Button
          variant="ghost"
          className="w-full flex justify-between items-center"
          onClick={signOutAction}
        >
          Log out
          <LockOpenIcon size={20} />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
