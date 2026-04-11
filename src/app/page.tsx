import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Activity,
  Brain,
  Users,
  Target,
  BarChart3,
  Radio,
  Lock,
  Layers,
  Zap,
  BookOpen,
  ShieldCheck,
  Network,
  ChevronRight,
} from "lucide-react";

const primitives = [
  {
    icon: BookOpen,
    name: "Vocabulary",
    description:
      "Define your domain's taxonomy with tags and topics. The shared language that all other primitives reference.",
    color: "from-amber-500/20 to-amber-600/5",
    iconBg: "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
    accent: "group-hover:border-amber-400/50",
  },
  {
    icon: Activity,
    name: "Signals",
    description:
      "Capture behavioral events — likes, purchases, enrollments, views. Configurable signal types that model any user action.",
    color: "from-orange-500/20 to-orange-600/5",
    iconBg: "bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400",
    accent: "group-hover:border-orange-400/50",
  },
  {
    icon: Network,
    name: "Affinities",
    description:
      "Computed relationship strengths between users and your vocabulary. Signals in, structured relationships out.",
    color: "from-teal-500/20 to-teal-600/5",
    iconBg: "bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-400",
    accent: "group-hover:border-teal-400/50",
  },
  {
    icon: Target,
    name: "Scoring",
    description:
      'Configurable ranking presets that control what "relevant" means. Different presets, different results, same data.',
    color: "from-violet-500/20 to-violet-600/5",
    iconBg: "bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400",
    accent: "group-hover:border-violet-400/50",
  },
  {
    icon: Brain,
    name: "Clustering",
    description:
      "Automatic user segmentation via FAISS + HDBSCAN. Groups form from behavior, not manual rules.",
    color: "from-rose-500/20 to-rose-600/5",
    iconBg: "bg-rose-500/10 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400",
    accent: "group-hover:border-rose-400/50",
  },
  {
    icon: Radio,
    name: "Campaigns",
    description:
      "Targeted content delivery with budget management, item targeting, and impression tracking.",
    color: "from-sky-500/20 to-sky-600/5",
    iconBg: "bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400",
    accent: "group-hover:border-sky-400/50",
  },
  {
    icon: Zap,
    name: "Feed",
    description:
      "Personalized content streams ranked by scoring presets. The composition of signals, affinities, and scoring into a product feature.",
    color: "from-yellow-500/20 to-yellow-600/5",
    iconBg: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400",
    accent: "group-hover:border-yellow-400/50",
  },
  {
    icon: BarChart3,
    name: "Analytics",
    description:
      "Aggregate insights from event streams. Engagement trends, affinity coverage, cluster composition, campaign performance.",
    color: "from-emerald-500/20 to-emerald-600/5",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
    accent: "group-hover:border-emerald-400/50",
  },
] as const;

const useCases = [
  {
    title: "Creator & fan platforms",
    description:
      "Consent-layered matching, affinity-ranked feed, fan engagement signals.",
    primitives: ["Signals", "Affinities", "Feed", "Scoring"],
  },
  {
    title: "Community apps",
    description:
      "Interest clustering, topic-based affinity, user segmentation analytics.",
    primitives: ["Vocabulary", "Clustering", "Analytics"],
  },
  {
    title: "Marketplaces",
    description:
      "Buyer/seller scoring, campaign-driven promotion, engagement tracking.",
    primitives: ["Scoring", "Campaigns", "Analytics"],
  },
  {
    title: "Content platforms",
    description:
      "Behavioral recommendation, content affinity, personalized feed ranking.",
    primitives: ["Signals", "Affinities", "Feed"],
  },
  {
    title: "Learning platforms",
    description:
      "Skill-based clustering, peer matching, progress signals.",
    primitives: ["Clustering", "Scoring", "Signals"],
  },
  {
    title: "Professional networks",
    description:
      "Role-tagged vocabulary, expertise affinity, introduction scoring.",
    primitives: ["Vocabulary", "Affinities", "Scoring"],
  },
] as const;

const architectureFeatures = [
  {
    icon: Lock,
    title: "Encrypted by default",
    description:
      "All PII is encrypted at rest via ShrouDB Cipher. Field-level encryption, blind search indexes, zero plaintext storage.",
  },
  {
    icon: Users,
    title: "Multi-tenant isolation",
    description:
      "Every API call is scoped to a client. Full data isolation, per-tenant configuration, independent scaling.",
  },
  {
    icon: ShieldCheck,
    title: "Consent layers",
    description:
      "Scope what data is visible and matchable. Different interaction tiers for different trust levels, built into the data model.",
  },
  {
    icon: Layers,
    title: "Composable tiers",
    description:
      "Start with the graph — signals, affinities, vocabulary. Add discovery when you need scoring, clustering, campaigns, and feed.",
  },
] as const;

export default function LandingPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <HeroBackground />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50/80 px-3.5 py-1.5 text-sm text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/50 dark:text-amber-300 mb-6">
              <HexIcon className="h-3.5 w-3.5" />
              <span>API platform for user intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
              Turn user behavior into{" "}
              <span className="text-gradient">structured relationships</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Composable primitives — signals, affinities, scoring, clustering,
              campaigns, and feed — that your application assembles into
              personalization, discovery, and analytics features.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/docs">Read the docs</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-tertiary">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Free tier available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                TypeScript, Ruby, Python SDKs
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Self-service signup
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Primitives ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Building blocks
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Composable primitives
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Eight building blocks that combine differently for every
              application. Define your domain, capture behavior, and let the
              platform compute the relationships.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {primitives.map((p) => (
              <div
                key={p.name}
                className={`group relative rounded-xl border border-border bg-surface-raised p-5 transition-all hover:shadow-lg ${p.accent}`}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${p.iconBg}`}>
                      <p.icon className="h-[18px] w-[18px]" />
                    </div>
                    <h3 className="font-semibold">{p.name}</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 sm:py-28 bg-surface-sunken">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Three steps
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              How it works
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              From signup to personalized experiences. The platform handles the
              computation — you define what matters.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <StepCard
              step="1"
              title="Define your domain"
              description="Create a vocabulary of tags and topics that describe your domain. Music genres, skill categories, product types — whatever your users interact with."
              code={`POST /api/v1/vocabulary/tags
{
  "name": "jazz",
  "category": "genre",
  "description": "Jazz music"
}`}
            />
            <StepCard
              step="2"
              title="Capture behavior"
              description="Record signals as users interact. Each signal type is configurable — control what behavior means and how strongly it contributes."
              code={`POST /api/v1/users/u_42/signals
{
  "signal_type": "listen",
  "tag_name": "jazz",
  "strength": 0.8
}`}
            />
            <StepCard
              step="3"
              title="Use the relationships"
              description="Affinities compute automatically. Query the ranked feed, check clusters, run campaigns — primitives compose into product features."
              code={`GET /api/v1/users/u_42/feed/ranked
// Returns users ranked by affinity,
// scored by your configured preset,
// filtered by consent layer.`}
            />
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Use cases
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Built for every domain
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              The same primitives, different compositions. Simbee is not a
              matching API — it is a toolkit that adapts to your application.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="group rounded-xl border border-border bg-surface-raised p-6 transition-all hover:shadow-lg hover:border-border-strong"
              >
                <h3 className="font-semibold mb-2">{uc.title}</h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {uc.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {uc.primitives.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-800/40"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section className="py-20 sm:py-28 bg-surface-sunken">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Infrastructure
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Production-grade from day one
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              API-first, multi-tenant, encryption by default. Designed for
              applications that handle real user data.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {architectureFeatures.map((f) => (
              <div
                key={f.title}
                className="flex gap-4 rounded-xl bg-surface-raised border border-border p-5 transition-all hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-700 shadow-sm dark:from-amber-900/40 dark:to-amber-950/40 dark:text-amber-400">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-amber-50/30 to-surface dark:from-surface dark:via-amber-950/10 dark:to-surface" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="mx-auto max-w-md">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20 mb-6">
              <HexIcon className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Start building
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Create a tenant, get your API key, and make your first call in
              under a minute. Free tier, no credit card required.
            </p>
            <div className="flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Create free account
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/docs/reference">
                  Explore the API
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Step card ── */

function StepCard({
  step,
  title,
  description,
  code,
}: {
  step: string;
  title: string;
  description: string;
  code: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-raised overflow-hidden shadow-sm transition-shadow hover:shadow-lg">
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-bold text-white shadow-sm">
            {step}
          </span>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
      <div className="border-t border-neutral-800">
        <pre className="bg-neutral-950 text-neutral-300 text-xs p-4 overflow-x-auto leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

/* ── Hero background ── */

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-surface to-surface dark:from-amber-950/20 dark:via-surface dark:to-surface" />
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-amber-300/15 blur-3xl dark:bg-amber-500/5" />
      <div className="absolute top-[10%] right-[20%] h-[400px] w-[400px] rounded-full bg-teal-300/10 blur-3xl dark:bg-teal-500/5" />
      {/* Hex grid */}
      <svg
        className="absolute top-0 right-0 w-[800px] h-[600px] opacity-[0.04] dark:opacity-[0.06]"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => {
            const x = col * 100 + (row % 2 === 0 ? 0 : 50);
            const y = row * 86;
            return (
              <polygon
                key={`${row}-${col}`}
                points={hexPoints(x + 50, y + 50, 48)}
                stroke="currentColor"
                strokeWidth="1"
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

/* ── Hex icon (brand mark) ── */

function HexIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" />
    </svg>
  );
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");
}
