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
  { href: "/docs/authentication", label: "Authentication" },
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
      <aside className="hidden md:block w-56 border-r border-border bg-surface-sunken">
        <nav className="px-3 py-6 space-y-0.5">
          <p className="px-3 text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
            Guides
          </p>
          {docsNav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-3 py-1.5 text-sm rounded-md text-text-secondary hover:text-text hover:bg-surface-raised transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="pt-4">
            <p className="px-3 text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
              SDKs
            </p>
            <div className="px-3 space-y-1 text-sm text-text-secondary">
              <p>
                <code className="text-xs">@simbee-io/client</code>{" "}
                <span className="text-text-tertiary text-xs">npm</span>
              </p>
              <p>
                <code className="text-xs">simbee-client</code>{" "}
                <span className="text-text-tertiary text-xs">gem</span>
              </p>
              <p>
                <code className="text-xs">simbee-client</code>{" "}
                <span className="text-text-tertiary text-xs">pip</span>
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
