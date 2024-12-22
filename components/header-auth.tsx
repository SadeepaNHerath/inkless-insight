"use client";

import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MdDashboard } from 'react-icons/md';
import { FaBlogger } from "react-icons/fa";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LockOpenIcon } from "lucide-react";
import ManageBill from "./stripe/manage-bill";
import { hasEnvVars } from "@/app/utils/supabase/check-env-vars";
import { createClient } from "@/app/utils/supabase/client";
import { useUser } from "@/lib/store/user";


export default async function AuthButton() {  
  const supabase = createClient();

  const user = useUser((state: { user: any; }) => state.user);

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    )
  } 
  return user ? (
    <Popover>
      <PopoverTrigger>
        <img
          src='user.png'
          alt={user?.email ? user.email.split('@')[1] : ''}
          width={50}
          height={50}
          className="rounded-full ring-2 ring-green-500"
        />
      </PopoverTrigger>
      <PopoverContent className="space-y-3 divide-y p-2" side="bottom">
        <div className="px-4">
          <p className="text-sm">{user?.email ? user.email.split('@')[0] : ''}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center"
          >
            Dashboard <MdDashboard size={24} className="mr-2 text-blue-500" />

          </Button>
        </Link>

        <Link href="/myblogs">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center"
          >
            My Blogs <FaBlogger size={24} className="mr-2 text-blue-500" />

          </Button>
        </Link>
        {user?.stripe_customer_id (
          <ManageBill customerId={user?.stripe_customer_id!} />
        )}
        <Button
          variant="ghost"
          className="w-full flex justify-between items-center"
          onClick={signOutAction}
        >
          Log out <LockOpenIcon />
        </Button>
      </PopoverContent>
    </Popover>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
