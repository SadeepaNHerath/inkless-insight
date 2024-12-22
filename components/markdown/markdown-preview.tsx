import React from "react";
import Markdown from "react-markdown";

import "highlight.js/styles/atom-one-dark.min.css";
import { cn } from "@/lib/utils";
import { PiTerminalThin } from "react-icons/pi";
import { icons } from "@/lib/icons";
import rehypeHighlight from "rehype-highlight";
import CopyButton from "./copy-button";
import { IconType } from "react-icons";

export default function MarkdownPreview({
  content,
  className = "sm:p-10",
}: {
  content: string;
  className?: string;
}) {
  return (
    <Markdown
      className={cn(
        "dark:text-gray-200 text-gray-800 space-y-8 p-4 rounded-md bg-gray-50 dark:bg-zinc-900",
        className
      )}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 {...props} className="text-4xl font-extrabold mt-6 mb-4" />
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-3xl font-bold mt-6 mb-4" />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="text-2xl font-semibold mt-6 mb-4" />
        ),
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const id = (Math.floor(Math.random() * 100) + 1).toString();
          let Icon: IconType = PiTerminalThin;

       if (match?.length && icons.hasOwnProperty(match[1])) {
            Icon = icons[match[1] as keyof typeof icons];
          }

          return (
            <div className="bg-zinc-800 text-gray-100 rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-700 border-b border-zinc-600">
                <div className="flex items-center gap-2">
                  <Icon className="text-gray-400" />
                  <p className="text-sm text-gray-400 font-mono">
                    {match ? match[1] : "Code"}
                  </p>
                </div>
                <CopyButton id={id} />
              </div>
              <div className="p-4 overflow-x-auto" id={id}>
                <pre
                  className="text-sm leading-relaxed font-mono"
                  {...props}
                >
                  {children}
                </pre>
              </div>
            </div>
          );
        },
        p: ({ node, ...props }) => (
          <p {...props} className="leading-7 text-gray-700 dark:text-gray-300" />
        ),
      }}
    >
      {content}
    </Markdown>
  );
}
