"use client";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import { ChangeEvent, useTransition } from "react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { deleteBlogById } from "@/lib/actions/blog";

export default function DeleteAlert({ id }: { id: string }) {
	const [isPending, startTransition] = useTransition();

	const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(async () => {
			const { error } = JSON.parse(
				await deleteBlogById(id)
			) as PostgrestSingleResponse<null>;
			if (error) {
				toast({
					title: "Failed to delete",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-red-100 text-red-800 p-4">
							<code>{error?.message}</code>
						</pre>
					),
					variant: "destructive",
				});
			} else {
				toast({
					title: "Successfully deleted 🎉",
					variant: "default",
				});
			}
		});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className="flex gap-2 items-center text-red-600 hover:bg-red-100"
					variant="outline"
				>
					<FaTrashAlt />
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="animate-slide-in bg-white shadow-lg rounded-md">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-lg font-semibold text-gray-800">
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription className="text-sm text-gray-600">
						This action cannot be undone. It will permanently delete
						your blog and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex justify-between">
					<AlertDialogCancel className="text-gray-600 hover:bg-gray-100">
						Cancel
					</AlertDialogCancel>
					<form onSubmit={onSubmit}>
						<Button
							className={cn(
								"flex gap-2 items-center bg-red-600 text-white hover:bg-red-700",
								{ "opacity-50 cursor-not-allowed": isPending }
							)}
							disabled={isPending}
						>
							<AiOutlineLoading3Quarters
								className={cn("animate-spin", {
									hidden: !isPending,
								})}
							/>
							{isPending ? "Processing..." : "Continue"}
						</Button>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
