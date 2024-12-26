"use server";
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
import { createClient } from "@/app/utils/supabase/server";
import { console } from "inspector";

export default  async function HeaderAuth() {
  let customerId = null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user?.id);

    const isAdmin = data?.[0]?.role === "admin";
    const isSub = data?.[0]?.is_subscribed;
    console.log(isAdmin);


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

        {isAdmin && isSub && (
          <ManageBill customerId={user?.id!} />
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
