import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Key, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation",
};

const guides = [
  {
    href: "/docs/authentication",
    icon: Key,
    title: "Authentication",
    description:
      "Sign up, create API keys, exchange credentials for JWTs, and make authenticated requests.",
  },
  {
    href: "/docs/reference",
    icon: Code,
    title: "API Reference",
    description:
      "Interactive reference for all endpoints, generated from the OpenAPI spec.",
  },
  {
    href: "/docs/errors",
    icon: AlertTriangle,
    title: "Error Codes",
    description:
      "Standard error response format, HTTP status codes, and retry guidance.",
  },
] as const;

export default function DocsHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Simbee Documentation</h1>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
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
            <Card className="h-full transition-colors group-hover:border-primary/40">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                    <g.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-sm">{g.title}</h3>
                      <ArrowRight className="h-3 w-3 text-text-tertiary group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-text-secondary mt-0.5">
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
      <p className="text-text-secondary mb-3">
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
  -d '{"client_id": "YOUR_CLIENT_ID", "user_id": "owner", "password": "..."}'`}
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
    <div className="rounded-md border border-border px-4 py-3">
      <p className="text-sm font-medium">{lang}</p>
      <p className="text-xs text-text-secondary mt-0.5">
        <code>{pkg}</code>{" "}
        <span className="text-text-tertiary">({registry})</span>
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
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-text-on-primary mt-0.5">
        {number}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold mb-1.5">{title}</p>
        <pre className="rounded-md bg-neutral-900 text-neutral-300 px-4 py-3 text-xs overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </li>
  );
}
