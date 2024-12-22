import { readUsers } from "@/lib/actions/user";
import { users } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default async function Page() {
	const { data } = await readUsers();

	return (
		<div className="rounded-md bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 overflow-y-auto shadow-md">
			<div className="w-full max-w-[900px] mx-auto">
				<div className="grid grid-cols-3 border-b p-5 bg-gray-700 text-gray-300 font-medium">
					<span>Name</span>
					<span>Subscription</span>
					<span>Customer</span>
				</div>

				<div className="space-y-4 p-5">
					{data?.map((user, index) => (
						<div
							className="grid grid-cols-3 items-center gap-4 bg-gray-800 p-4 rounded-md shadow hover:shadow-lg transition-shadow"
							key={index}
						>
							<div className="flex items-center gap-3 font-medium text-gray-200">
								<Image
									src={user.profile_pic!}
									className="rounded-full border-2 border-green-500"
									width={50}
									height={50}
									alt={`${user.display_name}'s profile`}
								/>
								<span>{user.display_name}</span>
							</div>

							<SubscriptionStatus
								status={user.is_subscribed!}
							/>

							<div className="text-gray-400 text-sm truncate">
								<span className="block md:truncate">
									{user.stripe_customer_id}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

const SubscriptionStatus = ({ status }: { status: boolean }) => {
	return (
		<div className="flex items-center justify-center">
			<span
				className={cn(
					"px-3 py-1 text-sm rounded-full capitalize shadow transition-colors",
					status
						? "bg-green-100 text-green-600 border border-green-400"
						: "bg-red-100 text-red-600 border border-red-400"
				)}
				aria-label={`Subscription status: ${status ? "Active" : "Inactive"
					}`}
			>
				{status ? "Active" : "Inactive"}
			</span>
		</div>
	);
};
