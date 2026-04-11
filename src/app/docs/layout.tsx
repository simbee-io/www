import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s | Simbee Docs",
  },
};

const docsNav = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/getting-started", label: "Getting Started" },
  { href: "/docs/concepts", label: "Concepts" },
  { href: "/docs/authentication", label: "Authentication" },
  { href: "/docs/webhooks", label: "Webhooks" },
  { href: "/docs/recipes", label: "Use Case Recipes" },
  { href: "/docs/reference", label: "API Reference" },
  { href: "/docs/errors", label: "Errors" },
] as const;

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="hidden md:block w-56 border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
        <nav className="px-3 py-6 space-y-0.5">
          <p className="px-3 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
            Guides
          </p>
          {docsNav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-3 py-1.5 text-sm rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-white dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-all"
            >
              {label}
            </Link>
          ))}
          <div className="pt-4">
            <p className="px-3 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
              SDKs
            </p>
            <div className="px-3 space-y-1.5 text-sm text-neutral-500 dark:text-neutral-400">
              <p>
                <code className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">@simbee-io/client</code>{" "}
                <span className="text-neutral-400 dark:text-neutral-500 text-xs">npm</span>
              </p>
              <p>
                <code className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">simbee-client</code>{" "}
                <span className="text-neutral-400 dark:text-neutral-500 text-xs">gem</span>
              </p>
              <p>
                <code className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">simbee-client</code>{" "}
                <span className="text-neutral-400 dark:text-neutral-500 text-xs">pip</span>
              </p>
            </div>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 prose-sm">
          {children}
        </article>
      </div>
    </div>
  );
}
