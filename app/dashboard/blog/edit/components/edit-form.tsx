"use client";
import React from "react";
import { IBlogDetial } from "@/lib/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { updateBlogDetail } from "@/lib/actions/blog";
import { BlogFormSchemaType } from "../../schema";
import BlogForm from "../../components/blog-form";
import { toast } from "@/components/ui/use-toast";

export default function EditForm({ blog }: { blog: IBlogDetial }) {
  const router = useRouter();

  const onHandleSubmit = async (data: BlogFormSchemaType) => {
    try {
      const result = JSON.parse(
        await updateBlogDetail(blog?.id!, data)
      ) as PostgrestSingleResponse<null>;

      if (result.error) {
        toast({
          title: "Failed to update blog 😢",
          description: (
            <pre className="mt-2 w-[340px] overflow-auto rounded-md bg-red-600/10 p-4 text-sm text-red-600">
              <code>{result.error?.message}</code>
            </pre>
          ),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Blog updated successfully 🎉",
          description: `"${data.title}" has been updated.`,
          action: (
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-2 text-indigo-600 underline hover:text-indigo-800"
            >
              Go to Dashboard
            </button>
          ),
          variant: "default",
        });

        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong while updating the blog.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Edit Blog Post
      </h1>

      <BlogForm
        onHandleSubmit={onHandleSubmit}
        defaultBlog={blog}
      />
    </div>
  );
}
