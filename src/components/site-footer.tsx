import Link from "next/link";

const footerSections = [
  {
    title: "Product",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/docs/reference", label: "API Reference" },
      { href: "/docs/authentication", label: "Authentication" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs/errors", label: "Error Codes" },
      { href: "/docs#sdks", label: "SDKs" },
      { href: "/docs#quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "https://github.com/simbee-io", label: "GitHub" },
      { href: "mailto:support@simbee.io", label: "Support" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-semibold group">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-sm">
                <HexIcon className="h-4 w-4 text-white" />
              </span>
              <span className="dark:text-neutral-100">Simbee</span>
            </Link>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed">
              API platform for user intelligence, relationships, and
              recommendations.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-400 dark:text-neutral-500">
          &copy; {new Date().getFullYear()} Simbee. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function HexIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" />
    </svg>
  );
}
