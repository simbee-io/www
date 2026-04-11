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
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800/50",
  },
  {
    icon: Activity,
    name: "Signals",
    description:
      "Capture behavioral events — likes, purchases, enrollments, views. Configurable signal types that model any user action.",
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800/50",
  },
  {
    icon: Network,
    name: "Affinities",
    description:
      "Computed relationship strengths between users and your vocabulary. Signals in, structured relationships out.",
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-teal-500/10 dark:bg-teal-500/15",
    text: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200 dark:border-teal-800/50",
  },
  {
    icon: Target,
    name: "Scoring",
    description:
      'Configurable ranking presets that control what "relevant" means. Different presets, different results, same data.',
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-800/50",
  },
  {
    icon: Brain,
    name: "Clustering",
    description:
      "Automatic user segmentation via FAISS + HDBSCAN. Groups form from behavior, not manual rules.",
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/10 dark:bg-rose-500/15",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-800/50",
  },
  {
    icon: Radio,
    name: "Campaigns",
    description:
      "Targeted content delivery with budget management, item targeting, and impression tracking.",
    gradient: "from-sky-500 to-blue-500",
    bg: "bg-sky-500/10 dark:bg-sky-500/15",
    text: "text-sky-600 dark:text-sky-400",
    border: "border-sky-200 dark:border-sky-800/50",
  },
  {
    icon: Zap,
    name: "Feed",
    description:
      "Personalized content streams ranked by scoring presets. The composition of signals, affinities, and scoring into a product feature.",
    gradient: "from-yellow-500 to-amber-500",
    bg: "bg-yellow-500/10 dark:bg-yellow-500/15",
    text: "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-200 dark:border-yellow-800/50",
  },
  {
    icon: BarChart3,
    name: "Analytics",
    description:
      "Aggregate insights from event streams. Engagement trends, affinity coverage, cluster composition, campaign performance.",
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800/50",
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
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-500/10",
  },
  {
    icon: Users,
    title: "Multi-tenant isolation",
    description:
      "Every API call is scoped to a client. Full data isolation, per-tenant configuration, independent scaling.",
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Consent layers",
    description:
      "Scope what data is visible and matchable. Different interaction tiers for different trust levels, built into the data model.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    icon: Layers,
    title: "Composable tiers",
    description:
      "Start with the graph — signals, affinities, vocabulary. Add discovery when you need scoring, clustering, campaigns, and feed.",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
  },
] as const;

export default function LandingPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-neutral-50 dark:from-neutral-950 dark:to-neutral-950" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-amber-200/30 to-transparent rounded-full blur-3xl dark:from-amber-500/8 dark:to-transparent" />
          <HeroHexGrid />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-sm text-amber-800 dark:border-amber-800/50 dark:bg-amber-950/50 dark:text-amber-300 mb-6">
              <HexIcon className="h-3.5 w-3.5" />
              <span>API platform for user intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-neutral-900 dark:text-neutral-50">
              Turn user behavior into{" "}
              <span className="text-gradient">structured relationships</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
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
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400 dark:text-neutral-500">
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
      <section className="py-20 sm:py-28 bg-neutral-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
              Building blocks
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Composable primitives
            </h2>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
              Eight building blocks that combine differently for every
              application. Define your domain, capture behavior, and let the
              platform compute the relationships.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {primitives.map((p) => (
              <div
                key={p.name}
                className={`group relative rounded-xl border ${p.border} bg-white p-5 transition-all hover:shadow-lg dark:bg-neutral-900`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.bg}`}>
                    <p.icon className={`h-5 w-5 ${p.text}`} />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{p.name}</h3>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 sm:py-28 bg-white dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
              Three steps
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              How it works
            </h2>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
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
      <section className="py-20 sm:py-28 bg-neutral-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
              Use cases
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Built for every domain
            </h2>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
              The same primitives, different compositions. Simbee is not a
              matching API — it is a toolkit that adapts to your application.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{uc.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
                  {uc.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {uc.primitives.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
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
      <section className="py-20 sm:py-28 bg-white dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
              Infrastructure
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Production-grade from day one
            </h2>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
              API-first, multi-tenant, encryption by default. Designed for
              applications that handle real user data.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {architectureFeatures.map((f) => (
              <div
                key={f.title}
                className="flex gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${f.bg}`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{f.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28 bg-neutral-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="mx-auto max-w-md">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20 mb-6">
              <HexIcon className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
              Start building
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8">
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
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden dark:border-neutral-800 dark:bg-neutral-900 transition-shadow hover:shadow-lg">
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-bold text-white shadow-sm">
            {step}
          </span>
          <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">{title}</h3>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
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

/* ── Hero hex grid ── */

function HeroHexGrid() {
  return (
    <svg
      className="absolute top-0 right-0 w-[800px] h-[600px] opacity-[0.06] dark:opacity-[0.08] text-amber-600 dark:text-amber-400"
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
  );
}

/* ── Hex icon ── */

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
