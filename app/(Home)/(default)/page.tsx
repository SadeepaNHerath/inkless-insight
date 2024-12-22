import Link from "next/link";
import React from "react";
import Image from "next/image";
import { readBlog } from "@/lib/actions/blog";

export default async function Home() {
  let { data: blogs } = await readBlog();

  if (!blogs?.length) {
    blogs = [];
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 xl:p-0">
      {blogs.map((blog, index) => {
        return (
          <Link
            href={"/blog/" + blog.id}
            className="w-full border rounded-md dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 p-5 hover:ring-4 ring-green-500 transition-all cursor-pointer space-y-5 shadow-md hover:shadow-xl"
            key={index}
          >
            <div className="w-full h-72 sm:w-full md:h-64 xl:h-96 relative">
              <Image
                priority
                src={blog.image_url}
                alt="cover"
                fill
                className="rounded-md object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="space-y-2 mt-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(blog.created_at).toDateString()}
              </p>

              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-300 hover:text-green-500 transition-colors">
                {blog.title}
              </h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
