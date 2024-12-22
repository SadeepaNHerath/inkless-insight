"use client";

import { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function CopyButton({ id }: { id: string }) {
  const [onCopy, setOnCopy] = useState(false);

  const handleCopy = async () => {
    const text = document.getElementById(id)?.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      setOnCopy(true);
      setTimeout(() => setOnCopy(false), 2000); // Reset state after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      className="relative group"
      role="button"
      aria-label={onCopy ? "Copied!" : "Copy to clipboard"}
      onClick={handleCopy}
    >
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 cursor-pointer ${
          onCopy ? "bg-green-500" : "hover:bg-zinc-700 bg-zinc-800"
        }`}
      >
        {onCopy ? (
          <IoCheckmarkOutline className="text-white w-5 h-5" />
        ) : (
          <BsCopy className="text-gray-300 w-5 h-5" />
        )}
      </div>

      <span
        className={`absolute top-10 left-1/2 transform -translate-x-1/2 text-sm text-gray-100 bg-black bg-opacity-80 rounded-md px-2 py-1 opacity-0 transition-all duration-200 group-hover:opacity-100 ${
          onCopy ? "opacity-100 bg-green-600" : ""
        }`}
      >
        {onCopy ? "Copied!" : "Copy"}
      </span>
    </div>
  );
}
