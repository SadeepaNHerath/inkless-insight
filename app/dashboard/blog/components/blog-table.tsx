import React from "react";
import { RxEyeOpen } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { IBlog } from "@/lib/types";
import { readBlogAdmin, updateBlogById } from "@/lib/actions/blog";
import SwitchForm from "./switch-form";
import DeleteAlert from "./delete-alert";

export default async function BlogTable() {
	const { data: blogs } = await readBlogAdmin();

	return (
		<div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-y-auto">
			<div className="w-full">
				<div className="grid grid-cols-5 items-center bg-gray-100 p-4 text-sm font-semibold text-gray-600">
					<h1 className="col-span-2">Title</h1>
					<h1>Premium</h1>
					<h1>Publish</h1>
					<h1>Actions</h1>
				</div>

				<div className="space-y-6 p-4">
					{blogs?.map((blog, index) => {
						const updatePremium = updateBlogById.bind(null, blog.id, {
							is_premium: !blog.is_premium,
						} as IBlog);

						const updatePublished = updateBlogById.bind(null, blog.id, {
							is_published: !blog.is_published,
						} as IBlog);

						return (
							<div
								className="grid grid-cols-5 items-center p-4 border-b hover:bg-gray-50 transition duration-150"
								key={index}
							>
								<h1 className="col-span-2 text-gray-800 font-medium truncate">
									{blog.title}
								</h1>

								<SwitchForm
									checked={blog.is_premium!}
									onSubmit={updatePremium}
									name="premium"
								/>

								<SwitchForm
									checked={blog.is_published!}
									onSubmit={updatePublished}
									name="publish"
								/>

								<Actions id={blog.id} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

const Actions = ({ id }: { id: string }) => {
	return (
		<div className="flex items-center gap-2">
			<Link href={`/blog/${id}`}>
				<Button
					className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
					variant="ghost"
					aria-label="View Blog"
				>
					<RxEyeOpen  className="w-5 h-5" />
					<span>View</span>
				</Button>
			</Link>

			<DeleteAlert id={id} />

			<Link href={`/dashboard/blog/edit/${id}`}>
				<Button
					className="flex items-center gap-2 text-gray-600 hover:text-green-600"
					variant="ghost"
					aria-label="Edit Blog"
				>
					<MdOutlineEdit className="w-5 h-5" />
					<span>Edit</span>
				</Button>
			</Link>
		</div>
	);
};
