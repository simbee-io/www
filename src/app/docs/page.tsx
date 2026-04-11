import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Code,
  Key,
  AlertTriangle,
  Rocket,
  Puzzle,
  Bell,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation",
};

const guides = [
  {
    href: "/docs/getting-started",
    icon: Rocket,
    title: "Getting Started",
    description:
      "Step-by-step tutorial covering users, signals, affinities, feed, clusters, campaigns, and analytics.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    href: "/docs/concepts",
    icon: Puzzle,
    title: "Concepts",
    description:
      "How each primitive works independently and how they compose into different application patterns.",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    href: "/docs/authentication",
    icon: Key,
    title: "Authentication",
    description:
      "Sign up, create API keys, exchange credentials for JWTs, and make authenticated requests.",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    href: "/docs/webhooks",
    icon: Bell,
    title: "Webhooks",
    description:
      "Event catalog, payload schemas, signature verification, and delivery guarantees.",
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-900/20",
  },
  {
    href: "/docs/recipes",
    icon: BookOpen,
    title: "Use Case Recipes",
    description:
      "Content recommendation, community matching, marketplace discovery, and more.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    href: "/docs/reference",
    icon: Code,
    title: "API Reference",
    description:
      "Interactive reference for all endpoints, generated from the OpenAPI spec.",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    href: "/docs/errors",
    icon: AlertTriangle,
    title: "Error Codes",
    description:
      "Standard error response format, HTTP status codes, and retry guidance.",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
] as const;

export default function DocsHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Simbee Documentation</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-10 max-w-2xl leading-relaxed">
        Simbee is an API platform that turns user behavior into structured
        relationships, recommendations, and insights. It provides composable
        primitives — signals, affinities, vocabulary, scoring, clustering,
        campaigns, and feed — that your application composes to build
        personalization, discovery, and analytics features.
      </p>

      <h2 className="text-xl font-semibold mb-4">Guides</h2>
      <div className="grid gap-3 sm:grid-cols-2 mb-10">
        {guides.map((g) => (
          <Link key={g.href} href={g.href} className="group">
            <Card className="h-full transition-all group-hover:border-neutral-300 dark:border-neutral-700 group-hover:shadow-lg">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${g.bg} ${g.color}`}>
                    <g.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-sm">{g.title}</h3>
                      <ArrowRight className="h-3 w-3 text-neutral-400 dark:text-neutral-500 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 id="sdks" className="text-xl font-semibold mb-3">SDKs</h2>
      <p className="text-neutral-500 dark:text-neutral-400 mb-3">
        Typed clients are available for all three major server languages:
      </p>
      <div className="grid gap-2 sm:grid-cols-3 mb-10">
        <SdkCard lang="TypeScript" pkg="@simbee-io/client" registry="npm" />
        <SdkCard lang="Ruby" pkg="simbee-client" registry="gem" />
        <SdkCard lang="Python" pkg="simbee-client" registry="pip" />
      </div>

      <h2 id="quick-start" className="text-xl font-semibold mb-3">Quick start</h2>
      <ol className="space-y-4">
        <QuickstartStep
          number="1"
          title="Sign up"
          code={`curl -X POST https://api.simbee.io/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@example.com", "password": "...", "company_name": "Acme"}'`}
        />
        <QuickstartStep
          number="2"
          title="Authenticate"
          code={`curl -X POST https://api.simbee.io/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@example.com", "password": "..."}'`}
        />
        <QuickstartStep
          number="3"
          title="Make API calls"
          code={`curl https://api.simbee.io/api/v1/users \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}
        />
      </ol>
    </div>
  );
}

function SdkCard({
  lang,
  pkg,
  registry,
}: {
  lang: string;
  pkg: string;
  registry: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm font-medium">{lang}</p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
        <code className="font-mono bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded text-xs">{pkg}</code>{" "}
        <span className="text-neutral-400 dark:text-neutral-500">({registry})</span>
      </p>
    </div>
  );
}

function QuickstartStep({
  number,
  title,
  code,
}: {
  number: string;
  title: string;
  code: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-bold text-white mt-0.5 shadow-sm">
        {number}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold mb-1.5">{title}</p>
        <pre className="rounded-xl bg-neutral-950 text-neutral-300 px-4 py-3 text-xs overflow-x-auto leading-relaxed border border-neutral-800">
          <code>{code}</code>
        </pre>
      </div>
    </li>
  );
}
