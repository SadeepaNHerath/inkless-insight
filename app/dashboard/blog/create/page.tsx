"use client";
import React from "react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createBlog } from "../../../../lib/actions/blog";
import { BlogFormSchemaType } from "../schema";
import { useRouter } from "next/navigation";
import BlogForm from "../components/blog-form";
import { defaultCreateBlog } from "@/lib/data";
import { toast } from "@/components/ui/use-toast";

export default function CreateForm() {
  const router = useRouter();

  const onHandleSubmit = async (data: BlogFormSchemaType) => {
    try {
      const result = JSON.parse(await createBlog(data));
      const { error } = result as PostgrestSingleResponse<null>;

      if (error?.message) {
        toast({
          title: "Failed to create post 😢",
          description: (
            <pre className="mt-2 w-[340px] overflow-auto rounded-md bg-red-600/10 p-4 text-sm text-red-600">
              <code>{error.message}</code>
            </pre>
          ),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Post created successfully 🎉",
          description: `"${data.title}" has been added.`,
          variant: "default",
        });

        router.push("/dashboard");
      }
    } catch (err) {
      console.error("An unexpected error occurred: ", err);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong while creating the post.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Create a New Blog Post
      </h1>

      <BlogForm
        onHandleSubmit={onHandleSubmit}
        defaultBlog={defaultCreateBlog}
      />
    </div>
  );
}
