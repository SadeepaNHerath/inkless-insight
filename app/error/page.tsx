'use client';

export default function ErrorPage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="font-medium text-xl mb-4">Oops! Something went wrong</h1>
      <p className="text-lg mb-6">
        We're sorry for the inconvenience. Please try again or contact support if the issue persists.
      </p>
      <button
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800 transition-colors"
        onClick={handleRetry}
      >
        Retry
      </button>
    </div>
  );
}