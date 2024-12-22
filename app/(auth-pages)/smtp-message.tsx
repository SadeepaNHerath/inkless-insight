import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

export function SmtpMessage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex gap-4 items-start">
      <div className="flex-shrink-0">
        <InfoIcon size={20} className="text-blue-500" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-800 dark:text-gray-300">
          <strong>Note:</strong> Emails are rate limited. Enable Custom SMTP to
          increase the rate limit.
        </p>
        <Link
          href="https://supabase.com/docs/guides/auth/auth-smtp"
          target="_blank"
          className="text-blue-600 dark:text-blue-400 flex items-center text-sm font-medium hover:underline gap-1"
        >
          Learn more <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}