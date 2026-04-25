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
      "How the SDK uses your API key, how the underlying token exchange works, and how to authenticate raw HTTP calls.",
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
        Everything you need to turn user behavior into ranked feeds, smart
        groupings, and clean analytics — reference, recipes, and the SDKs to
        get there. Start with Getting Started if you're new.
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
        Use a typed client in your language of choice. Each SDK takes your API
        key, exchanges it for a short-lived session token transparently, and
        refreshes before expiry — you never handle JWTs by hand.
      </p>
      <div className="grid gap-2 sm:grid-cols-3 mb-10">
        <SdkCard lang="TypeScript" pkg="@simbee-io/sdk" registry="npm" />
        <SdkCard lang="Ruby" pkg="simbee-sdk" registry="gem" />
        <SdkCard lang="Python" pkg="simbee-sdk" registry="pip" />
      </div>

      <h2 id="quick-start" className="text-xl font-semibold mb-3">Quick start</h2>
      <ol className="space-y-4">
        <QuickstartStep
          number="1"
          title="Install the SDK"
          code={`# Ruby
gem install simbee-sdk

# Node / TS
npm install @simbee-io/sdk

# Python
pip install simbee-sdk`}
        />
        <QuickstartStep
          number="2"
          title="Initialize with your API key"
          code={`# Ruby
client = Simbee::Client.new(api_key: ENV.fetch("SIMBEE_API_KEY"))

// TypeScript
const client = new SimbeeClient({ apiKey: process.env.SIMBEE_API_KEY! });

# Python
client = simbee_sdk.Client(api_key=os.environ["SIMBEE_API_KEY"])`}
        />
        <QuickstartStep
          number="3"
          title="Call the API"
          code={`# All three SDKs share the same surface — pick a user, get their feed.
client.feed.ranked(user_id: "alice")`}
        />
      </ol>

      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-6">
        Calling Simbee from a language without an SDK?{" "}
        <Link href="/docs/authentication" className="underline">
          See raw HTTP auth
        </Link>{" "}
        — one POST exchanges your API key for a 15-minute JWT.
      </p>
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
