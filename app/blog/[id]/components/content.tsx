"use client";
import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect, useState } from "react";
import MarkdownPreview from "@/components/markdown/markdown-preview";
import { BlogContentLoading } from "./skeleton";
import Checkout from "@/components/stripe/checkout";

export default function Content({ blogId }: { blogId: string }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<{
    blog_id: string;
    content: string;
    created_at: string;
  } | null>(null);

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const readBlogContent = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_content")
        .select("*")
        .eq("blog_id", blogId)
        .single();

      if (error) {
        console.error("Error fetching blog content:", error.message);
        setBlog(null);
      } else {
        setBlog({
          blog_id: data.id,
          content: data.content,
          created_at: data.created_at,
        });
      }
      setLoading(false);
    } catch (err) {
      console.error("Unexpected error:", err);
      setBlog(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    readBlogContent();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <BlogContentLoading />
      </div>
    );
  }

  if (!blog?.content) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Checkout />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <MarkdownPreview content={blog?.content || ""} />
    </div>
  );
}
