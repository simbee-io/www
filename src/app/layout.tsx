import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader, SiteFooter } from "@skeptik/ui";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Simbee — User Intelligence API",
    template: "%s | Simbee",
  },
  description:
    "Ship personalization, discovery, and analytics features without building a recommender. Send events, get ranked users, groups, and feeds — on infrastructure you don't have to run.",
};

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

const logo = (
  <>
    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-sm">
      <HexIcon className="h-4 w-4 text-white" />
    </span>
    Simbee
  </>
);

const nav = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/reference", label: "API Reference" },
];

const footerLinkGroups = [
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
      { href: "https://github.com/simbee-io", label: "GitHub", external: true },
      { href: "mailto:support@simbee.io", label: "Support" },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${dmSans.variable} ${jetBrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <SiteHeader
            logo={logo}
            nav={nav}
            actions={[
              { href: "/login", label: "Log in", variant: "ghost" },
              { href: "/signup", label: "Get started" },
            ]}
            maxWidth="max-w-7xl"
          />
          <main className="flex-1">{children}</main>
          <SiteFooter
            logo={logo}
            description="Turn user behavior into ranked feeds, smart groupings, and clean analytics — without running the infrastructure."
            linkGroups={footerLinkGroups}
            legal={{ holder: "Simbee", notice: "All rights reserved" }}
            maxWidth="max-w-7xl"
          />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
