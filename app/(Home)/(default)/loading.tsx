import React from "react";

export default function Loading() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 p-5 xl:p-0">
      {[1, 2, 3, 4, 5]?.map((_, index) => {
        return (
          <div
            className="w-full border rounded-md dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 p-5 hover:ring-4 ring-green-500 transition-all cursor-pointer space-y-5 shadow-md animate-pulse"
            key={index}
          >
            <div className="w-full h-72 sm:w-full md:h-64 xl:h-96 relative bg-gray-300 dark:bg-gray-600 rounded-md"></div>

            <div className="space-y-2 mt-3">
              <p className="h-5 bg-gray-400 dark:bg-gray-500 rounded w-3/4"></p>
              <p className="h-10 bg-gray-400 dark:bg-gray-500 rounded w-full"></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}