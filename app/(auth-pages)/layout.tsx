export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-grow container mx-auto max-w-5xl px-4 py-8 flex justify-center items-center">{children}</div>
  );
}
