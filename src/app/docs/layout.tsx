import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s | Simbee Docs",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/docs" className="font-semibold">
            Simbee Docs
          </Link>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link href="/docs" className="hover:underline">
            Overview
          </Link>
          <Link href="/docs/authentication" className="hover:underline">
            Authentication
          </Link>
          <Link href="/docs/reference" className="hover:underline">
            API Reference
          </Link>
          <Link href="/docs/errors" className="hover:underline">
            Errors
          </Link>
        </nav>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        {children}
      </main>
    </div>
  );
}
