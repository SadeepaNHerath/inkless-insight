import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col justify-center items-center">
            <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-b-foreground/10">
              <div className="container mx-auto max-w-5xl flex justify-between items-center p-3 px-4">
                <div className="flex items-center gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    aria-label="Inkless Insight Home"
                  >
                    <span className="font-semibold text-lg">Inkless Insight</span>
                    <svg className="h-8 w-8 text-gray-500" width="24"  height="24"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M12 19l7-7 3 3-7 7-3-3z" />  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />  <path d="M2 2l7.586 7.586" />  <circle cx="11" cy="11" r="2" /></svg>                  
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                  <ThemeSwitcher />
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </div>
            </nav>

              {children}

            <footer className="w-full bg-muted/10 border-t py-12">
              <div className="container mx-auto max-w-5xl px-4 flex flex-col md:flex-row justify-between items-center text-sm">
                <p className="mb-4 md:mb-0">
                  Powered by{" "}
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:underline"
                  >
                    Supabase
                  </a>
                </p>

                <nav className="flex space-x-4">
                  <a href="/about" className="hover:underline">About</a>
                  <a href="/contact" className="hover:underline">Contact</a>
                  <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </nav>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}