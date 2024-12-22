"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { ChangeEvent } from "react";

export default function SwitchForm({
	checked,
	onSubmit,
	name,
}: {
	checked: boolean;
	onSubmit: () => Promise<string>;
	name: string;
}) {
	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { error } = JSON.parse( await onSubmit());
			if (error) {
				toast({
					variant: "destructive",
					title: `Failed to update ${name} ❌`,
					description: `An error occurred while updating ${name}. Please try again.`,
				});
			} else {
				toast({
					variant: "default",
					title: `Successfully updated ${name} 🎉`,
					description: `${name} has been updated successfully.`,
				});
			}
		} catch (err) {
			toast({
				variant: "destructive",
				title: "Unexpected Error",
				description: "Something went wrong. Please try again later.",
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Switch
				type="submit"
				checked={checked}
				className={`${
					checked ? "bg-green-500" : "bg-gray-300"
				} transition-colors`}
				aria-label={`Toggle ${name}`}
			/>
		</form>
	);
}
