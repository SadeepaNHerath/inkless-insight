import React from "react";
import { IBlogDetial } from "@/lib/types";
import { readBlogDeatailById } from "@/lib/actions/blog";
import EditForm from "./components/edit-form";

export default async function Edit({ params }: { params: { id: string } }) {
	const { data: blog } = await readBlogDeatailById(params.id);
	return <EditForm blog={blog as IBlogDetial} />;
}