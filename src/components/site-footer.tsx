import Link from "next/link";
import { Hexagon } from "lucide-react";

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
    <footer className="border-t border-border bg-surface-sunken">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Hexagon className="h-5 w-5 text-primary" strokeWidth={2.5} />
              <span>Simbee</span>
            </Link>
            <p className="mt-3 text-sm text-text-secondary max-w-xs">
              API platform for user intelligence, relationships, and
              recommendations.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border text-sm text-text-tertiary">
          &copy; {new Date().getFullYear()} Simbee. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
