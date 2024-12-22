import React from "react";
import { IBlog } from "@/lib/types";
import Image from "next/image";
import Content from "./components/content";

// export async function generateStaticParams() {
//   const { data: blogs } = await fetch(
//     `${process.env.SITE_URL}/api/blog?id=*`
//   ).then((res) => res.json());

//   return blogs;
// }

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   const { data: blog } = (await fetch(
//     `${process.env.SITE_URL}/api/blog?id=${params.id}`
//   ).then((res) => res.json())) as { data: IBlog };

//   return {
//     title: blog?.title,
//     authors: { name: "Sadeepa Herath" },
//     openGraph: {
//       title: blog?.title,
//       url: `${process.env.SITE_URL}/api/blog?id=${params.id}`,
//       siteName: "Inkless Insight",
//       images: blog?.image_url,
//       type: "website",
//     },
//     keywords: ["daily web coding", "Sadeepa Herath", "dailywebcoding"],
//   };
// }

export default async function Page({ params }: { params: { id: string } }) {
  const { data: blog } = (await fetch(
    `${process.env.SITE_URL}/api/blog?id=${params.id}`
  ).then((res) => res.json())) as { data: IBlog };

  if (!blog?.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl font-semibold text-red-500">
          Blog not found. Please check the URL or try again later.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen px-4 sm:px-10 pt-10 space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">
          {blog?.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Published on: {new Date(blog?.created_at!).toDateString()}
        </p>
      </div>

      <div className="relative w-full h-96 shadow-lg rounded-lg overflow-hidden">
        <Image
          priority
          src={blog?.image_url!}
          alt={`${blog?.title} cover image`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        />
      </div>

      <Content blogId={params.id} />
    </div>
  );
}
