import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concepts",
};

export default function ConceptsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Concepts</h1>
      <p className="text-lg text-text-secondary mb-8">
        Simbee provides a set of composable primitives that your application
        assembles to build personalization, discovery, and analytics features.
        This guide explains each primitive independently, then shows how they
        combine.
      </p>

      <nav className="rounded-lg border border-border bg-surface-raised p-4 mb-10">
        <p className="font-semibold text-sm mb-2">On this page</p>
        <ol className="list-decimal list-inside text-sm space-y-1 text-text-secondary">
          <li><a href="#vocabulary" className="hover:text-text transition-colors">Vocabulary</a></li>
          <li><a href="#signals" className="hover:text-text transition-colors">Signals</a></li>
          <li><a href="#affinities" className="hover:text-text transition-colors">Affinities</a></li>
          <li><a href="#scoring" className="hover:text-text transition-colors">Scoring</a></li>
          <li><a href="#clustering" className="hover:text-text transition-colors">Clustering</a></li>
          <li><a href="#consent-layers" className="hover:text-text transition-colors">Consent layers</a></li>
          <li><a href="#campaigns" className="hover:text-text transition-colors">Campaigns</a></li>
          <li><a href="#feed" className="hover:text-text transition-colors">Feed</a></li>
          <li><a href="#analytics" className="hover:text-text transition-colors">Analytics</a></li>
          <li><a href="#composition" className="hover:text-text transition-colors">Composition patterns</a></li>
        </ol>
      </nav>

      {/* Vocabulary */}
      <section id="vocabulary" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Vocabulary</h2>
        <p className="mb-4 text-text-secondary">
          Vocabulary is your domain&apos;s language. It defines the taxonomy that
          Simbee uses to understand what your users care about. Vocabulary
          consists of two structures:
        </p>

        <h3 className="text-lg font-semibold mb-2">Tags</h3>
        <p className="mb-4 text-text-secondary">
          Tags are flat labels that describe atomic interests. They have no
          hierarchy &mdash; each tag is an independent concept. Users accumulate
          affinity toward tags through their behavior (signals). Tags are the
          finest-grained unit of preference in the system.
        </p>
        <div className="mb-4 rounded-md border border-border bg-surface-sunken px-4 py-3 text-sm text-text-secondary">
          <p className="font-medium text-text mb-1">Examples by domain</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Creator platform:</strong> jazz, photography, digital-art, cooking</li>
            <li><strong>Learning app:</strong> python, machine-learning, statistics, algebra</li>
            <li><strong>Marketplace:</strong> vintage, handmade, electronics, organic</li>
            <li><strong>Professional network:</strong> rust, distributed-systems, product-management</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-2">Topics</h3>
        <p className="mb-4 text-text-secondary">
          Topics are broader categories that group related tags. They provide a
          second level of aggregation &mdash; Simbee computes affinity at both
          the tag level and the topic level, giving you fine-grained and
          coarse-grained preference data simultaneously.
        </p>
        <div className="mb-4 rounded-md border border-border bg-surface-sunken px-4 py-3 text-sm text-text-secondary">
          <p className="font-medium text-text mb-1">Examples by domain</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Creator platform:</strong> Music, Visual Arts, Lifestyle</li>
            <li><strong>Learning app:</strong> Computer Science, Mathematics, Data Science</li>
            <li><strong>Marketplace:</strong> Fashion, Home &amp; Garden, Technology</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-2">Designing your vocabulary</h3>
        <p className="mb-4 text-text-secondary">
          Start small. You can add tags and topics at any time without breaking
          existing data &mdash; affinities are computed incrementally. A good
          starting vocabulary has 10&ndash;30 tags grouped under 3&ndash;8
          topics. Avoid creating tags that are too specific (they won&apos;t
          accumulate enough signal) or too broad (they won&apos;t differentiate
          users).
        </p>
        <p className="text-sm text-text-secondary">
          Vocabulary is configured via{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">POST /api/v1/config/signal_types</code>{" "}
          (for signal type taxonomy) and through the tag/topic affinities that
          signals create. See the{" "}
          <Link href="/docs/getting-started" className="text-primary hover:underline">
            Getting Started
          </Link>{" "}
          guide for a hands-on walkthrough.
        </p>
      </section>

      {/* Signals */}
      <section id="signals" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Signals</h2>
        <p className="mb-4 text-text-secondary">
          Signals are behavioral events that express user intent. Every
          meaningful user action &mdash; a like, a purchase, a page view, a
          course completion &mdash; is captured as a signal. Signals are the raw
          input to the affinity computation pipeline.
        </p>

        <h3 className="text-lg font-semibold mb-2">Anatomy of a signal</h3>
        <p className="mb-3 text-text-secondary">
          Each signal connects a user to a target (another user, a piece of
          content, or a vocabulary item) with a type and strength:
        </p>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-border bg-surface-sunken">
              <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Field</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">signal_type_id</code></td>
              <td className="px-4 py-2.5 text-text-secondary">The kind of behavior (e.g. &quot;like&quot;, &quot;purchase&quot;, &quot;view&quot;)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">target_id</code></td>
              <td className="px-4 py-2.5 text-text-secondary">What the user interacted with</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">target_type</code></td>
              <td className="px-4 py-2.5 text-text-secondary">The kind of target (&quot;user&quot;, &quot;content&quot;, &quot;tag&quot;, etc.)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">strength</code></td>
              <td className="px-4 py-2.5 text-text-secondary">Numeric weight (0.0&ndash;1.0). Defaults based on signal type config.</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-lg font-semibold mb-2">Signal types</h3>
        <p className="mb-4 text-text-secondary">
          Signal types let you define what behaviors mean in your domain. Each
          type has a default strength and a decay strategy that controls how the
          signal&apos;s influence fades over time.
        </p>
        <div className="mb-4 rounded-md border border-border bg-surface-sunken px-4 py-3 text-sm text-text-secondary">
          <p className="font-medium text-text mb-1">The same primitive, different meanings</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Social app:</strong> &quot;like&quot; (0.3), &quot;follow&quot; (0.7), &quot;message&quot; (0.9)</li>
            <li><strong>Marketplace:</strong> &quot;view&quot; (0.1), &quot;save&quot; (0.4), &quot;purchase&quot; (1.0)</li>
            <li><strong>Learning:</strong> &quot;enroll&quot; (0.5), &quot;complete_lesson&quot; (0.7), &quot;earn_certificate&quot; (1.0)</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-2">Batch ingestion</h3>
        <p className="text-text-secondary">
          For high-volume applications, use{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">POST /api/v1/signal_batches</code>{" "}
          to submit up to 1,000 signals per call. Batch signals are processed
          asynchronously &mdash; the API returns immediately with a batch ID
          that you can poll for completion status.
        </p>
      </section>

      {/* Affinities */}
      <section id="affinities" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Affinities</h2>
        <p className="mb-4 text-text-secondary">
          Affinities are computed relationship strengths between users and
          vocabulary items. They are the output of the signal processing
          pipeline &mdash; Simbee aggregates a user&apos;s signals, applies
          decay and normalization, and produces numeric affinity scores for each
          tag and topic the user has interacted with.
        </p>

        <h3 className="text-lg font-semibold mb-2">Tag affinities vs. topic affinities</h3>
        <p className="mb-4 text-text-secondary">
          Tag affinities are fine-grained: &quot;this user has 0.82 affinity
          toward jazz.&quot; Topic affinities are aggregated: &quot;this user has
          0.71 affinity toward Music.&quot; Both are available via the API. Use
          tag affinities for precise recommendations and topic affinities for
          broad categorization.
        </p>

        <h3 className="text-lg font-semibold mb-2">Affinity summary</h3>
        <p className="mb-4 text-text-secondary">
          The{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">GET /api/v1/users/{"{external_id}"}/affinity/summary</code>{" "}
          endpoint returns a user&apos;s complete affinity profile &mdash; all
          tag and topic scores in a single response. This is the primary input
          for scoring and feed ranking.
        </p>

        <h3 className="text-lg font-semibold mb-2">Explicit vs. computed</h3>
        <p className="text-text-secondary">
          Signals are explicit &mdash; the user did something. Affinities are
          computed &mdash; Simbee inferred a preference. This distinction matters
          for consent and transparency: you can always explain <em>why</em> a
          user has a particular affinity by tracing it back to their signals.
        </p>
      </section>

      {/* Scoring */}
      <section id="scoring" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Scoring</h2>
        <p className="mb-4 text-text-secondary">
          Scoring determines how Simbee ranks users relative to each other.
          When a user requests a feed or match results, Simbee evaluates every
          candidate against a scoring formula and returns them in ranked order.
        </p>

        <h3 className="text-lg font-semibold mb-2">Scoring presets</h3>
        <p className="mb-4 text-text-secondary">
          Presets are named scoring configurations that weight different factors.
          Simbee ships with built-in presets, and you can create custom ones.
          The same user pool produces different rankings with different presets
          &mdash; this is how you build different experiences without changing
          your data.
        </p>
        <div className="mb-4 rounded-md border border-border bg-surface-sunken px-4 py-3 text-sm text-text-secondary">
          <p className="font-medium text-text mb-1">Preset examples</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>affinity_match:</strong> Weight shared interests heavily. Good for &quot;people like you&quot; features.</li>
            <li><strong>diversity:</strong> Penalize too-similar results. Good for discovery and exploration.</li>
            <li><strong>recency:</strong> Boost recently active users. Good for real-time feeds.</li>
            <li><strong>engagement:</strong> Weight signal volume and frequency. Good for &quot;popular&quot; rankings.</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-2">Custom scoring</h3>
        <p className="text-text-secondary">
          Use{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">GET /api/v1/config/scoring/schema</code>{" "}
          to see all available scoring dimensions and their valid ranges, then{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">POST /api/v1/config/scoring</code>{" "}
          to save a custom configuration. Your custom config is used by default
          for all feed and match requests, or you can override per-request.
        </p>
      </section>

      {/* Clustering */}
      <section id="clustering" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Clustering</h2>
        <p className="mb-4 text-text-secondary">
          Clustering automatically groups users into segments based on their
          affinity profiles. Simbee uses HDBSCAN (a density-based clustering
          algorithm) to discover natural groups without requiring you to specify
          the number of clusters in advance.
        </p>

        <h3 className="text-lg font-semibold mb-2">How clusters form</h3>
        <p className="mb-4 text-text-secondary">
          The clustering pipeline runs periodically (triggered via API or on a
          schedule). It takes each user&apos;s affinity vector, reduces its
          dimensionality with SVD, and groups users whose reduced vectors are
          close together. Each cluster gets a label derived from the dominant
          affinities of its members.
        </p>

        <h3 className="text-lg font-semibold mb-2">Using clusters</h3>
        <p className="mb-3 text-text-secondary">Clusters are useful for:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4 text-text-secondary">
          <li><strong>Segmentation analytics:</strong> Understand your user base as groups, not individuals.</li>
          <li><strong>Campaign targeting:</strong> Target campaigns at specific clusters.</li>
          <li><strong>Group formation:</strong> Use cluster membership to create cohorts, teams, or communities.</li>
          <li><strong>Anomaly detection:</strong> Users who don&apos;t fit any cluster may need attention.</li>
        </ul>

        <p className="text-text-secondary">
          Each user has a{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">cluster_id</code> and{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">cluster_confidence</code>{" "}
          on their profile. List clusters via{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">GET /api/v1/clusters</code>{" "}
          and view members via{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">GET /api/v1/clusters/{"{id}"}/members</code>.
        </p>
      </section>

      {/* Consent Layers */}
      <section id="consent-layers" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Consent layers</h2>
        <p className="mb-4 text-text-secondary">
          Consent layers scope what data is visible and matchable. They let you
          build different interaction tiers where users explicitly opt into
          levels of discoverability.
        </p>

        <h3 className="text-lg font-semibold mb-2">How they work</h3>
        <p className="mb-4 text-text-secondary">
          A consent layer is a named boundary. Users grant consent to specific
          layers, and only users who share a consent layer can be matched or
          see each other&apos;s data in that context. Affinities, scoring, and
          feed results are all filtered by consent layer when one is specified.
        </p>

        <div className="mb-4 rounded-md border border-border bg-surface-sunken px-4 py-3 text-sm text-text-secondary">
          <p className="font-medium text-text mb-1">When you need consent layers</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Public profile + private matching:</strong> Users are visible publicly but only matchable if they opt into a &quot;matching&quot; layer.</li>
            <li><strong>Tiered access:</strong> A &quot;basic&quot; layer for browsing and a &quot;premium&quot; layer for direct messages.</li>
            <li><strong>Feature-gated discovery:</strong> Different parts of your app use different consent contexts.</li>
          </ul>
        </div>

        <p className="text-text-secondary">
          If your application doesn&apos;t need consent scoping, you don&apos;t
          need to configure consent layers &mdash; all data is visible by
          default. Consent layers are configured via{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">POST /api/v1/config/consent_layers</code>{" "}
          and user consent is managed via{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">POST /api/v1/clients/{"{client_id}"}/users/{"{user_id}"}/consents</code>.
        </p>
      </section>

      {/* Campaigns */}
      <section id="campaigns" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Campaigns</h2>
        <p className="mb-4 text-text-secondary">
          Campaigns deliver targeted content to users based on criteria you
          define. A campaign has a budget, targeting rules, and a set of content
          items. Simbee manages impression tracking, budget enforcement, and
          per-user frequency capping.
        </p>

        <h3 className="text-lg font-semibold mb-2">Campaign lifecycle</h3>
        <ol className="list-decimal pl-5 space-y-1 mb-4 text-text-secondary">
          <li><strong>Create</strong> &mdash; Define name, budget, targeting criteria, and optional date range.</li>
          <li><strong>Add items</strong> &mdash; Attach content items that will be shown to targeted users.</li>
          <li><strong>Activate</strong> &mdash; Campaign items begin appearing in users&apos; feeds.</li>
          <li><strong>Monitor</strong> &mdash; Track spend, impressions, and engagement via analytics.</li>
          <li><strong>Pause / complete</strong> &mdash; Manually pause or let budget exhaustion complete the campaign.</li>
        </ol>

        <h3 className="text-lg font-semibold mb-2">Beyond promotion</h3>
        <p className="text-text-secondary">
          Campaigns aren&apos;t just for advertising. Use them for onboarding
          sequences (show tutorial content to new users), A/B testing (serve
          different content to different segments), content distribution (ensure
          editorial picks reach the right audience), or seasonal events (time-bounded
          content with automatic expiry).
        </p>
      </section>

      {/* Feed */}
      <section id="feed" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Feed</h2>
        <p className="mb-4 text-text-secondary">
          The feed is a personalized, ranked stream of content and users
          tailored to each user&apos;s affinity profile. It combines scored
          results with active campaign items and applies consent layer filtering.
        </p>

        <h3 className="text-lg font-semibold mb-2">Ranked feed</h3>
        <p className="mb-4 text-text-secondary">
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">GET /api/v1/users/{"{external_id}"}/feed/ranked</code>{" "}
          returns a cursor-paginated feed ranked by the active scoring
          configuration. Each page returns a set of results with a cursor for
          the next page.
        </p>

        <h3 className="text-lg font-semibold mb-2">Feed vs. matches</h3>
        <p className="text-text-secondary">
          The feed is a general-purpose discovery endpoint &mdash; it surfaces
          content and users relevant to the viewer. Matches ({" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">GET /api/v1/users/{"{external_id}"}/matches</code>{" "}
          ) are consent-layer-scoped, bidirectional compatibility rankings. Use
          feeds for browsing and discovery. Use matches when both parties must
          opt in.
        </p>
      </section>

      {/* Analytics */}
      <section id="analytics" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Analytics</h2>
        <p className="mb-4 text-text-secondary">
          Simbee aggregates behavioral data into queryable analytics endpoints.
          Use them to build dashboards, monitor engagement, and understand how
          your users interact with your platform.
        </p>

        <h3 className="text-lg font-semibold mb-2">Available insights</h3>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-border bg-surface-sunken">
              <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Endpoint</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-secondary">What it shows</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs">/analytics/overview</code></td>
              <td className="px-4 py-2.5 text-text-secondary">Totals and last-24h activity (users, signals, matches, impressions)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs">/analytics/signals</code></td>
              <td className="px-4 py-2.5 text-text-secondary">Signal volume by type, time period, and trend</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs">/analytics/affinities</code></td>
              <td className="px-4 py-2.5 text-text-secondary">Affinity distribution and coverage across your user base</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs">/analytics/clustering</code></td>
              <td className="px-4 py-2.5 text-text-secondary">Cluster sizes, distribution, and assignment coverage</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs">/analytics/campaigns</code></td>
              <td className="px-4 py-2.5 text-text-secondary">Campaign performance: impressions, spend, engagement rates</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs">/analytics/vocabulary</code></td>
              <td className="px-4 py-2.5 text-text-secondary">Tag and topic usage across signals and affinities</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs">/analytics/growth</code></td>
              <td className="px-4 py-2.5 text-text-secondary">User and signal growth over time</td>
            </tr>
          </tbody>
        </table>
        <p className="text-text-secondary">
          All analytics endpoints are scoped to your tenant automatically via
          the JWT. Time-series data uses hourly and daily rollups for efficient
          querying.
        </p>
      </section>

      {/* Composition patterns */}
      <section id="composition" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Composition patterns</h2>
        <p className="mb-4 text-text-secondary">
          The primitives above are independent building blocks. The value of
          Simbee comes from composing them. Here are common patterns that show
          how the same primitives serve different applications.
        </p>

        <div className="space-y-6">
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold mb-1">Recommendation engine</h3>
            <p className="text-sm text-text-secondary mb-2">
              Vocabulary + Signals + Affinities + Feed
            </p>
            <p className="text-sm text-text-secondary">
              Define your content taxonomy as vocabulary. Record user interactions
              as signals. Let affinities build preference profiles. Serve the
              ranked feed as personalized recommendations. No matching or consent
              layers needed.
            </p>
          </div>

          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold mb-1">Community matching</h3>
            <p className="text-sm text-text-secondary mb-2">
              Vocabulary + Signals + Affinities + Consent Layers + Scoring + Matches
            </p>
            <p className="text-sm text-text-secondary">
              Users declare interests (signals against tags). Consent layers
              control who is discoverable for matching. Scoring determines
              compatibility. Match results connect compatible users who have
              both opted in.
            </p>
          </div>

          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold mb-1">Marketplace discovery</h3>
            <p className="text-sm text-text-secondary mb-2">
              Scoring + Campaigns + Clustering + Feed + Analytics
            </p>
            <p className="text-sm text-text-secondary">
              Score sellers by relevance to each buyer. Use campaigns for
              promoted listings with budget caps. Cluster buyers into segments
              for targeted promotions. Feed surfaces the best results. Analytics
              measures conversion.
            </p>
          </div>

          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold mb-1">User segmentation</h3>
            <p className="text-sm text-text-secondary mb-2">
              Vocabulary + Clustering + Analytics
            </p>
            <p className="text-sm text-text-secondary">
              Use Simbee purely for behavioral analytics. Ingest signals, let
              clustering discover natural user segments, and query analytics for
              segment-level insights. No feed, matching, or campaigns needed.
            </p>
          </div>

          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold mb-1">Content distribution</h3>
            <p className="text-sm text-text-secondary mb-2">
              Campaigns + Feed + Signals + Analytics
            </p>
            <p className="text-sm text-text-secondary">
              Create campaigns for editorial picks or sponsored content. Items
              appear in user feeds based on targeting criteria. Track engagement
              via signals. Measure reach and effectiveness through analytics.
            </p>
          </div>

          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold mb-1">Engagement analytics</h3>
            <p className="text-sm text-text-secondary mb-2">
              Signals + Analytics + Webhooks
            </p>
            <p className="text-sm text-text-secondary">
              Use Simbee as a behavioral event pipeline. Ingest all user actions
              as signals. Query aggregate analytics for dashboards. Subscribe to
              webhooks for real-time alerting on engagement patterns. No
              personalization needed.
            </p>
          </div>
        </div>

        <div className="text-sm mt-6 p-3 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 text-text-secondary">
          <strong>Key takeaway:</strong> Matching is one composition among many,
          not the default use case. Most applications use a subset of
          Simbee&apos;s primitives. Start with the smallest set that solves your
          problem and add more as your product evolves.
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Next steps</h2>
        <ul className="space-y-2 text-text-secondary">
          <li>
            <Link href="/docs/getting-started" className="text-primary hover:underline">
              Getting Started
            </Link>{" "}
            &mdash; Hands-on tutorial that walks through each primitive with real API calls.
          </li>
          <li>
            <Link href="/docs/authentication" className="text-primary hover:underline">
              Authentication
            </Link>{" "}
            &mdash; Set up API keys and JWT tokens.
          </li>
          <li>
            <Link href="/docs/reference" className="text-primary hover:underline">
              API Reference
            </Link>{" "}
            &mdash; Full endpoint reference with request/response schemas.
          </li>
        </ul>
      </section>
    </div>
  );
}
