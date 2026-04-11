import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Hexagon,
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
} from "lucide-react";

const primitives = [
  {
    icon: BookOpen,
    name: "Vocabulary",
    description:
      "Define your domain's taxonomy with tags and topics. The shared language that all other primitives reference.",
  },
  {
    icon: Activity,
    name: "Signals",
    description:
      "Capture behavioral events — likes, purchases, enrollments, views. Configurable signal types that model any user action.",
  },
  {
    icon: Network,
    name: "Affinities",
    description:
      "Computed relationship strengths between users and your vocabulary. Signals in, structured relationships out.",
  },
  {
    icon: Target,
    name: "Scoring",
    description:
      "Configurable ranking presets that control what \"relevant\" means. Different presets, different results, same data.",
  },
  {
    icon: Brain,
    name: "Clustering",
    description:
      "Automatic user segmentation via FAISS + HDBSCAN. Groups form from behavior, not manual rules.",
  },
  {
    icon: Radio,
    name: "Campaigns",
    description:
      "Targeted content delivery with budget management, item targeting, and impression tracking.",
  },
  {
    icon: Zap,
    name: "Feed",
    description:
      "Personalized content streams ranked by scoring presets. The composition of signals, affinities, and scoring into a product feature.",
  },
  {
    icon: BarChart3,
    name: "Analytics",
    description:
      "Aggregate insights from event streams. Engagement trends, affinity coverage, cluster composition, campaign performance.",
  },
] as const;

const useCases = [
  {
    title: "Creator & fan platforms",
    description:
      "Consent-layered matching, affinity-ranked feed, fan engagement signals. Model creator-fan relationships with configurable visibility.",
    signals: "Likes, follows, tips, content views",
    output: "Fan affinity scores, creator feed, engagement clusters",
  },
  {
    title: "Community apps",
    description:
      "Interest clustering, topic-based affinity, user segmentation analytics. Let communities self-organize around shared behavior.",
    signals: "Group joins, event RSVPs, topic follows",
    output: "Interest clusters, peer recommendations, community health metrics",
  },
  {
    title: "Marketplaces",
    description:
      "Buyer/seller scoring, campaign-driven promotion, engagement tracking. Surface relevant sellers to buyers and measure what works.",
    signals: "Searches, purchases, reviews, bookmarks",
    output: "Ranked seller feed, promotional campaigns, buyer segments",
  },
  {
    title: "Content platforms",
    description:
      "Behavioral recommendation, content affinity, personalized feed ranking. Turn viewing patterns into personalized discovery.",
    signals: "Views, completions, saves, shares",
    output: "Personalized feed, content affinity map, topic clusters",
  },
  {
    title: "Learning platforms",
    description:
      "Skill-based clustering, peer matching, progress signals. Group learners by behavior and surface relevant peers and content.",
    signals: "Completions, quiz scores, time-on-task, enrollments",
    output: "Skill clusters, peer recommendations, progress analytics",
  },
  {
    title: "Professional networks",
    description:
      "Role-tagged vocabulary, expertise affinity, introduction scoring. Model professional relationships and surface high-value connections.",
    signals: "Endorsements, messages, profile views, content shares",
    output: "Expertise scores, ranked connections, professional clusters",
  },
] as const;

const architectureFeatures = [
  {
    icon: Lock,
    title: "Encrypted by default",
    description:
      "All PII is encrypted at rest via ShrouDB Cipher. Field-level encryption, blind search indexes, and zero plaintext storage.",
  },
  {
    icon: Users,
    title: "Multi-tenant",
    description:
      "Every API call is scoped to a client. Full data isolation, per-tenant configuration, independent scaling.",
  },
  {
    icon: ShieldCheck,
    title: "Consent layers",
    description:
      "Scope what data is visible and matchable. Different interaction tiers for different trust levels — built into the data model.",
  },
  {
    icon: Layers,
    title: "Composable tiers",
    description:
      "Start with the graph (signals, affinities, vocabulary). Add discovery (scoring, clustering, campaigns, feed) when you need it.",
  },
] as const;

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-surface to-surface dark:from-amber-950/20 dark:via-surface dark:to-surface" />
          <HeroPattern />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
              <Hexagon className="h-4 w-4 text-primary" strokeWidth={2.5} />
              <span>API platform for user intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Turn user behavior into{" "}
              <span className="text-primary">structured relationships</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Composable primitives — signals, affinities, scoring, clustering,
              campaigns, and feed — that your application assembles into
              personalization, discovery, and analytics features.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/docs">Read the docs</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-text-tertiary">
              <span>Free tier available</span>
              <span className="h-3 w-px bg-border" />
              <span>TypeScript, Ruby, Python SDKs</span>
              <span className="h-3 w-px bg-border" />
              <span>Self-service signup</span>
            </div>
          </div>
        </div>
      </section>

      {/* Primitives */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
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
                className="group rounded-lg border border-border bg-surface-raised p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                    <p.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-semibold">{p.name}</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-28 bg-surface-sunken">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              How it works
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Three steps from signup to personalized experiences. The platform
              handles the computation — you define what matters.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
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
              description="Record signals as users interact. Each signal type is configurable — control what behavior means and how strongly it contributes to relationships."
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
              description="Affinities compute automatically. Query the ranked feed, check cluster memberships, run campaigns — the primitives compose into your product features."
              code={`GET /api/v1/users/u_42/feed/ranked
// Returns users ranked by affinity,
// scored by your configured preset,
// filtered by consent layer.`}
            />
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Built for every domain
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              The same primitives, different compositions. Simbee is not a
              matching API — it is a toolkit that adapts to your application.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-lg border border-border bg-surface-raised p-6"
              >
                <h3 className="font-semibold mb-2">{uc.title}</h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {uc.description}
                </p>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-medium text-text-secondary">
                      Signals:{" "}
                    </span>
                    <span className="text-text-tertiary">{uc.signals}</span>
                  </div>
                  <div>
                    <span className="font-medium text-text-secondary">
                      Output:{" "}
                    </span>
                    <span className="text-text-tertiary">{uc.output}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 sm:py-28 bg-surface-sunken">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
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
              <div key={f.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
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

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <Hexagon
            className="h-10 w-10 text-primary mx-auto mb-6"
            strokeWidth={1.5}
          />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Start building
          </h2>
          <p className="text-lg text-text-secondary max-w-lg mx-auto mb-8">
            Create a tenant, get your API key, and make your first call in under
            a minute. Free tier, no credit card required.
          </p>
          <div className="flex justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/signup">
                Create free account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/docs/reference">Explore the API</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

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
    <div className="rounded-lg border border-border bg-surface-raised overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-text-on-primary">
            {step}
          </span>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
      <pre className="bg-neutral-900 text-neutral-300 text-xs p-4 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function HeroPattern() {
  return (
    <svg
      className="absolute top-0 right-0 w-[800px] h-[600px] opacity-[0.03] dark:opacity-[0.04]"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hexagonal grid pattern — bee/honeycomb motif */}
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

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");
}
