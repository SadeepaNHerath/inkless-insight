import React from "react";

export default function Loading() {
	return (
		<div className="animate-pulse space-y-6 p-5">
			<div className="flex justify-between items-center">
				<div className="h-10 w-56 bg-gradient-to-r from-gray-300 to-gray-400 rounded-md"></div>
				<div className="h-10 w-48 bg-gradient-to-r from-gray-300 to-gray-400 rounded-md"></div>
			</div>

			<div className="border h-96 rounded-md bg-gradient-to-r from-gray-300 to-gray-400"></div>

			<div className="grid grid-cols-3 gap-4">
				<div className="h-8 w-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-md"></div>
				<div className="h-8 w-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-md"></div>
				<div className="h-8 w-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-md"></div>
			</div>

			<div className="flex space-x-4">
				<div className="h-10 w-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-md"></div>
				<div className="h-10 w-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-md"></div>
			</div>
		</div>
	);
}
