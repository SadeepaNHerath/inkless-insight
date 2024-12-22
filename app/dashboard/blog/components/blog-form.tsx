"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { BsSave } from "react-icons/bs";
import { BlogFormSchema, BlogFormSchemaType } from "../schema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import MarkdownPreview from "@/components/markdown/markdown-preview";
import { IBlogDetial } from "@/lib/types";

export default function BlogForm({	onHandleSubmit,
	defaultBlog,
}: {
	defaultBlog: IBlogDetial;
	onHandleSubmit: (data: BlogFormSchemaType) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setPreview] = useState(false);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: defaultBlog?.title || "",
      content: defaultBlog?.blog_content?.content || "",
      image_url: defaultBlog?.image_url || "",
      is_premium: defaultBlog?.is_premium || false,
      is_published: defaultBlog?.is_published || false,
    },
  });

  const onSubmit = (data: any) => {
    startTransition(() => onHandleSubmit(data));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 border rounded-lg shadow-md"
      >
        <div className="flex justify-between items-center gap-4">
          <button
            type="button"
            onClick={() => setPreview(!isPreview)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            {isPreview ? "Edit" : "Preview"}
          </button>

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="is_premium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Premium</FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published</FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormItem>
              )}
            />
          </div>

          <button
            type="submit"
            disabled={!form.formState.isValid || isPending}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md disabled:bg-gray-400"
          >
            {isPending && <BsSave className="mr-2 animate-spin" />}
            Save
          </button>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Blog Title"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://image.url" {...field} />
                </FormControl>
                <div className="mt-4">
                  {isPreview && field.value && (
                    <Image
                      src={field.value}
                      alt="Blog Preview"
                      width={600}
                      height={300}
                      className="rounded-lg"
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  {!isPreview ? (
                    <Textarea
                      placeholder="Write your blog content here..."
                      {...field}
                      rows={10}
                    />
                  ) : (
                    <MarkdownPreview content={field.value} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
