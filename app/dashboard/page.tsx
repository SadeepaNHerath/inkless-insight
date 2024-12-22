import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import BlogTable from "./blog/components/blog-table";

export default function Blog() {
	return (
		<div className="space-y-6 p-6 bg-gray-50 rounded-md shadow-md">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-extrabold text-gray-800">Blogs</h1>
				<Link href="/dashboard/blog/create">
					<Button
						className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
						aria-label="Create Blog"
					>
						<FaPlus  className="w-5 h-5" />
						<span>Create</span>
					</Button>
				</Link>
			</div>

			<div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
				<BlogTable />
			</div>
		</div>
	);
}
