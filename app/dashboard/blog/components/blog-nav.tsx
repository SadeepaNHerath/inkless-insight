import Link from "next/link";
import React from "react";

export default function BlogNav({ path }: { path: string }) {
  return (
    <nav className="flex items-center gap-3 text-sm text-gray-400">
      <Link href="/dashboard" aria-label="Go to Dashboard">
        <div className="flex items-center gap-1 cursor-pointer transition-colors hover:text-gray-300">
          <span className="text-gray-300">/</span>
          <span>dashboard</span>
        </div>
      </Link>

      <span className="text-gray-500 flex items-center">
        {path}
      </span>
    </nav>
  );
}
