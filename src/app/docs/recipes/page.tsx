import type { Metadata } from "next";
import Link from "next/link";
import { CodeTabs } from "@/components/code-tabs";

export const metadata: Metadata = {
  title: "Use Case Recipes",
};

export default function RecipesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Use Case Recipes</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8">
        Each recipe shows how to configure and use Simbee for a specific
        application type. Recipes are short &mdash; they cover vocabulary
        design, signal types, scoring, and the key API flows, then link to the{" "}
        <Link href="/docs/concepts" className="text-amber-600 dark:text-amber-400 hover:underline">
          Concepts guide
        </Link>{" "}
        for deeper explanation.
      </p>

      <nav className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 mb-10">
        <p className="font-semibold text-sm mb-2">Recipes</p>
        <ol className="list-decimal list-inside text-sm space-y-1 text-neutral-500 dark:text-neutral-400">
          <li><a href="#content-recommendation" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Content recommendation</a></li>
          <li><a href="#community-matching" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Community matching</a></li>
          <li><a href="#marketplace-discovery" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Marketplace discovery</a></li>
          <li><a href="#group-formation" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Event and group formation</a></li>
          <li><a href="#engagement-analytics" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Engagement analytics</a></li>
        </ol>
      </nav>

      {/* Recipe 1: Content recommendation */}
      <section id="content-recommendation" className="mb-14">
        <h2 className="text-2xl font-semibold mb-2">Content recommendation</h2>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-4">
          Vocabulary + Signals + Affinities + Feed
        </p>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          A platform where users consume content &mdash; articles, videos,
          courses, or music. Users interact with content, Simbee builds
          preference profiles, and the ranked feed surfaces personalized
          recommendations.
        </p>

        <h3 className="text-lg font-semibold mb-2">Vocabulary design</h3>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          Tags represent content categories. Topics group related categories.
          Content is tagged when created; user signals against content inherit
          the content&apos;s tags.
        </p>
        <div className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">Example: Video platform</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Topics:</strong> Technology, Science, Arts, Lifestyle, Business</li>
            <li><strong>Tags:</strong> machine-learning, web-dev, physics, painting, cooking, startups</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-2">Signal types</h3>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          Model the content consumption funnel with increasing strength:
        </p>
        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `# Low intent
curl -X POST $SIMBEE_URL/api/v1/config/signal_types \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "key": "view", "label": "View", "strength_override": 0.1 }'

# Medium intent
curl -X POST $SIMBEE_URL/api/v1/config/signal_types \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "key": "watch_50pct", "label": "Watch 50%", "strength_override": 0.4 }'

# High intent
curl -X POST $SIMBEE_URL/api/v1/config/signal_types \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "key": "complete", "label": "Complete", "strength_override": 0.7 }'

# Strongest intent
curl -X POST $SIMBEE_URL/api/v1/config/signal_types \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "key": "save", "label": "Save", "strength_override": 0.9 }'`,
            },
            {
              label: "TypeScript",
              code: `const configApi = new ConfigurationApi(config);

const signalTypes = [
  { key: "view",       label: "View",      strength_override: 0.1 },
  { key: "watch_50pct", label: "Watch 50%", strength_override: 0.4 },
  { key: "complete",   label: "Complete",   strength_override: 0.7 },
  { key: "save",       label: "Save",       strength_override: 0.9 },
];

for (const st of signalTypes) {
  await configApi.createApiV1ConfigSignalType(st);
}`,
            },
            {
              label: "Ruby",
              code: `config_api = SimbeeClient::ConfigurationApi.new

[
  { key: "view",       label: "View",      strength_override: 0.1 },
  { key: "watch_50pct", label: "Watch 50%", strength_override: 0.4 },
  { key: "complete",   label: "Complete",   strength_override: 0.7 },
  { key: "save",       label: "Save",       strength_override: 0.9 },
].each do |st|
  config_api.create_api_v1_config_signal_type(
    SimbeeClient::CreateConfigResource.new(**st)
  )
end`,
            },
            {
              label: "Python",
              code: `config_api = ConfigurationApi(client)

signal_types = [
    ("view",       "View",      0.1),
    ("watch_50pct", "Watch 50%", 0.4),
    ("complete",   "Complete",   0.7),
    ("save",       "Save",       0.9),
]

for key, label, strength in signal_types:
    config_api.create_api_v1_config_signal_type(
        CreateConfigResource(
            key=key, label=label, strength_override=strength,
        )
    )`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Key API flow</h3>
        <ol className="list-decimal pl-5 space-y-1 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          <li>Register content via <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">POST /api/v1/content</code> with tags as metadata.</li>
          <li>Record user signals as they interact: view, watch_50pct, complete, save.</li>
          <li>Query <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">GET /api/v1/users/{"{id}"}/feed/ranked</code> to serve personalized recommendations.</li>
          <li>Monitor content performance via <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">GET /api/v1/analytics/signals</code>.</li>
        </ol>

        <h3 className="text-lg font-semibold mb-2">Scoring preset</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Use <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">affinity_match</code> for
          &quot;more of what you like&quot; or{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">diversity</code> for
          &quot;explore new topics.&quot; Switch presets per-request to build
          different feed tabs (e.g. &quot;For You&quot; vs &quot;Discover&quot;).
        </p>
      </section>

      {/* Recipe 2: Community matching */}
      <section id="community-matching" className="mb-14">
        <h2 className="text-2xl font-semibold mb-2">Community matching</h2>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-4">
          Vocabulary + Signals + Affinities + Consent Layers + Scoring + Matches
        </p>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          An app that connects people with shared interests &mdash; hobby groups,
          study partners, professional networking. Users opt into matching and
          Simbee finds compatible connections.
        </p>

        <h3 className="text-lg font-semibold mb-2">Vocabulary design</h3>
        <div className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">Example: Hobby community</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Topics:</strong> Outdoors, Creative, Tech, Music, Sports</li>
            <li><strong>Tags:</strong> hiking, climbing, pottery, watercolor, guitar, chess, running</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-2">Signal types</h3>
        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `const signalTypes = [
  { key: "tag_interest",   label: "Tag Interest",   strength_override: 0.5 },
  { key: "group_join",     label: "Group Join",      strength_override: 0.7 },
  { key: "event_rsvp",     label: "Event RSVP",      strength_override: 0.8 },
  { key: "message_sent",   label: "Message Sent",    strength_override: 0.9 },
];

for (const st of signalTypes) {
  await configApi.createApiV1ConfigSignalType(st);
}`,
            },
            {
              label: "Ruby",
              code: `[
  { key: "tag_interest",   label: "Tag Interest",   strength_override: 0.5 },
  { key: "group_join",     label: "Group Join",      strength_override: 0.7 },
  { key: "event_rsvp",     label: "Event RSVP",      strength_override: 0.8 },
  { key: "message_sent",   label: "Message Sent",    strength_override: 0.9 },
].each do |st|
  config_api.create_api_v1_config_signal_type(
    SimbeeClient::CreateConfigResource.new(**st)
  )
end`,
            },
            {
              label: "Python",
              code: `signal_types = [
    ("tag_interest",   "Tag Interest",   0.5),
    ("group_join",     "Group Join",      0.7),
    ("event_rsvp",     "Event RSVP",      0.8),
    ("message_sent",   "Message Sent",    0.9),
]

for key, label, strength in signal_types:
    config_api.create_api_v1_config_signal_type(
        CreateConfigResource(
            key=key, label=label, strength_override=strength,
        )
    )`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Consent layer setup</h3>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          Create a consent layer so only users who opt in are matchable. Users
          who browse the community without opting in can still accumulate
          affinities but won&apos;t appear in match results.
        </p>
        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `# Create the consent layer
curl -X POST $SIMBEE_URL/api/v1/config/consent_layers \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "key": "matching", "label": "Matching" }'

# User opts in
curl -X POST $SIMBEE_URL/api/v1/clients/cl_abc123/users/cu_xyz/consents \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "consent_layer_id": "matching", "granted": true }'`,
            },
            {
              label: "TypeScript",
              code: `// Create the consent layer
await configApi.createApiV1ConfigConsentLayer({
  key: "matching",
  label: "Matching",
});

// User opts in
await consentsApi.createApiV1ClientUserConsent(
  "cl_abc123", "cu_xyz",
  { consent_layer_id: "matching", granted: true },
);`,
            },
            {
              label: "Ruby",
              code: `# Create the consent layer
config_api.create_api_v1_config_consent_layer(
  SimbeeClient::CreateConfigResource.new(
    key: "matching", label: "Matching"
  )
)

# User opts in
consents_api.create_api_v1_client_user_consent(
  "cl_abc123", "cu_xyz",
  SimbeeClient::CreateConsent.new(
    consent_layer_id: "matching", granted: true
  )
)`,
            },
            {
              label: "Python",
              code: `# Create the consent layer
config_api.create_api_v1_config_consent_layer(
    CreateConfigResource(key="matching", label="Matching")
)

# User opts in
consents_api.create_api_v1_client_user_consent(
    "cl_abc123", "cu_xyz",
    CreateConsent(consent_layer_id="matching", granted=True),
)`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Key API flow</h3>
        <ol className="list-decimal pl-5 space-y-1 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          <li>Users select interests (recorded as <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">tag_interest</code> signals).</li>
          <li>Users opt into the &quot;matching&quot; consent layer.</li>
          <li>Query <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">GET /api/v1/users/{"{id}"}/matches</code> for compatible connections.</li>
          <li>Subscribe to <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">match.computed</code> webhooks to notify users of new matches.</li>
        </ol>
      </section>

      {/* Recipe 3: Marketplace discovery */}
      <section id="marketplace-discovery" className="mb-14">
        <h2 className="text-2xl font-semibold mb-2">Marketplace discovery</h2>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-4">
          Scoring + Campaigns + Clustering + Feed + Analytics
        </p>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          A two-sided marketplace where buyers discover sellers. Simbee ranks
          sellers by relevance, promotes featured listings with campaigns, and
          segments buyers for targeted promotions.
        </p>

        <h3 className="text-lg font-semibold mb-2">Vocabulary design</h3>
        <div className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">Example: Services marketplace</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Topics:</strong> Home Services, Professional, Creative, Technology</li>
            <li><strong>Tags:</strong> plumbing, electrician, photography, logo-design, web-dev, tutoring</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-2">Signal types</h3>
        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `const signalTypes = [
  { key: "search",       label: "Search",        strength_override: 0.1 },
  { key: "view_profile", label: "View Profile",  strength_override: 0.3 },
  { key: "contact",      label: "Contact",       strength_override: 0.6 },
  { key: "purchase",     label: "Purchase",       strength_override: 1.0 },
  { key: "review",       label: "Review",         strength_override: 0.8 },
];

for (const st of signalTypes) {
  await configApi.createApiV1ConfigSignalType(st);
}`,
            },
            {
              label: "Ruby",
              code: `[
  { key: "search",       label: "Search",        strength_override: 0.1 },
  { key: "view_profile", label: "View Profile",  strength_override: 0.3 },
  { key: "contact",      label: "Contact",       strength_override: 0.6 },
  { key: "purchase",     label: "Purchase",       strength_override: 1.0 },
  { key: "review",       label: "Review",         strength_override: 0.8 },
].each do |st|
  config_api.create_api_v1_config_signal_type(
    SimbeeClient::CreateConfigResource.new(**st)
  )
end`,
            },
            {
              label: "Python",
              code: `signal_types = [
    ("search",       "Search",        0.1),
    ("view_profile", "View Profile",  0.3),
    ("contact",      "Contact",       0.6),
    ("purchase",     "Purchase",       1.0),
    ("review",       "Review",         0.8),
]

for key, label, strength in signal_types:
    config_api.create_api_v1_config_signal_type(
        CreateConfigResource(
            key=key, label=label, strength_override=strength,
        )
    )`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Promoted listings with campaigns</h3>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          Sellers pay to promote their profiles. Create a campaign targeting
          buyers in relevant clusters. Simbee handles impression tracking,
          budget enforcement, and frequency capping.
        </p>
        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `// Create a promoted listing campaign
const { data: campaign } = await campaignsApi.createApiV1Campaign({
  name: "Featured Photographer - Spring 2026",
  budget: 500.0,
  target_criteria: {
    cluster_ids: ["cls_creative_seekers"],
  },
  max_impressions_per_user: 2,
  start_date: "2026-04-01",
  end_date: "2026-04-30",
});

// Add the seller's profile as a campaign item
await campaignsApi.createApiV1CampaignItem(campaign.data.id, {
  external_content_id: "seller_photography_pro",
});

// Activate
await campaignsApi.activateApiV1Campaign(campaign.data.id);

// Subscribe to budget alerts
await webhooksApi.createApiV1ClientWebhook("cl_abc123", {
  url: "https://marketplace.com/webhooks/simbee",
  event_types: ["campaign.budget_exhausted"],
  secret: "whsec_...",
});`,
            },
            {
              label: "Ruby",
              code: `# Create a promoted listing campaign
campaign = campaigns_api.create_api_v1_campaign(
  SimbeeClient::CreateCampaign.new(
    name: "Featured Photographer - Spring 2026",
    budget: 500.0,
    target_criteria: { cluster_ids: ["cls_creative_seekers"] },
    max_impressions_per_user: 2,
    start_date: "2026-04-01",
    end_date: "2026-04-30"
  )
)

# Add the seller's profile as a campaign item
campaigns_api.create_api_v1_campaign_item(
  campaign.data.id,
  SimbeeClient::CreateCampaignItem.new(
    external_content_id: "seller_photography_pro"
  )
)

# Activate
campaigns_api.activate_api_v1_campaign(campaign.data.id)`,
            },
            {
              label: "Python",
              code: `# Create a promoted listing campaign
campaign = campaigns_api.create_api_v1_campaign(
    CreateCampaign(
        name="Featured Photographer - Spring 2026",
        budget=500.0,
        target_criteria={"cluster_ids": ["cls_creative_seekers"]},
        max_impressions_per_user=2,
        start_date="2026-04-01",
        end_date="2026-04-30",
    )
)

# Add the seller's profile as a campaign item
campaigns_api.create_api_v1_campaign_item(
    campaign.data.id,
    CreateCampaignItem(external_content_id="seller_photography_pro"),
)

# Activate
campaigns_api.activate_api_v1_campaign(campaign.data.id)`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Key API flow</h3>
        <ol className="list-decimal pl-5 space-y-1 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          <li>Create users for both buyers and sellers.</li>
          <li>Record buyer behavior as signals (search, view_profile, contact, purchase).</li>
          <li>Use <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">GET /api/v1/users/{"{buyer_id}"}/feed/ranked</code> for personalized seller discovery.</li>
          <li>Create campaigns for seller promotions with cluster-based targeting.</li>
          <li>Monitor performance via <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">GET /api/v1/analytics/campaigns</code>.</li>
        </ol>

        <h3 className="text-lg font-semibold mb-2">Scoring preset</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Use <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">engagement</code> to
          surface sellers with the most buyer activity. Use{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">affinity_match</code> to
          surface sellers whose category matches the buyer&apos;s history.
        </p>
      </section>

      {/* Recipe 4: Group formation */}
      <section id="group-formation" className="mb-14">
        <h2 className="text-2xl font-semibold mb-2">Event and group formation</h2>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-4">
          Vocabulary + Signals + Clustering + Affinities
        </p>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          An app that automatically forms groups or cohorts &mdash; study groups,
          workshop teams, conference tracks, or fitness classes. Simbee clusters
          users by shared interests and affinity compatibility.
        </p>

        <h3 className="text-lg font-semibold mb-2">Vocabulary design</h3>
        <div className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">Example: Learning platform</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Topics:</strong> Programming, Data Science, Design, Business</li>
            <li><strong>Tags:</strong> python, javascript, sql, figma, marketing, finance, react</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-2">Signal types</h3>
        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `const signalTypes = [
  { key: "skill_declare",    label: "Skill Declared",     strength_override: 0.6 },
  { key: "course_enroll",    label: "Course Enrollment",  strength_override: 0.5 },
  { key: "lesson_complete",  label: "Lesson Complete",    strength_override: 0.7 },
  { key: "peer_collaborate", label: "Peer Collaboration", strength_override: 0.9 },
];

for (const st of signalTypes) {
  await configApi.createApiV1ConfigSignalType(st);
}`,
            },
            {
              label: "Ruby",
              code: `[
  { key: "skill_declare",    label: "Skill Declared",     strength_override: 0.6 },
  { key: "course_enroll",    label: "Course Enrollment",  strength_override: 0.5 },
  { key: "lesson_complete",  label: "Lesson Complete",    strength_override: 0.7 },
  { key: "peer_collaborate", label: "Peer Collaboration", strength_override: 0.9 },
].each do |st|
  config_api.create_api_v1_config_signal_type(
    SimbeeClient::CreateConfigResource.new(**st)
  )
end`,
            },
            {
              label: "Python",
              code: `signal_types = [
    ("skill_declare",    "Skill Declared",     0.6),
    ("course_enroll",    "Course Enrollment",  0.5),
    ("lesson_complete",  "Lesson Complete",    0.7),
    ("peer_collaborate", "Peer Collaboration", 0.9),
]

for key, label, strength in signal_types:
    config_api.create_api_v1_config_signal_type(
        CreateConfigResource(
            key=key, label=label, strength_override=strength,
        )
    )`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Using clusters as groups</h3>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          After a clustering run, each cluster represents a natural grouping of
          users with similar learning paths. Use cluster membership to form
          study groups, assign workshop tracks, or pair mentors with learners.
        </p>
        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `// After clustering.completed webhook fires:
const { data: clusters } = await clusteringApi.listApiV1Clusters();

for (const cluster of clusters.data) {
  // Get members of this cluster
  const { data: members } = await clusteringApi.listApiV1ClusterMembers(
    cluster.id
  );

  // Form a study group from this cluster
  await createStudyGroup({
    name: \`\${cluster.label} Study Group\`,
    members: members.data.map((m) => m.external_id),
    topic: cluster.label,
  });
}`,
            },
            {
              label: "Ruby",
              code: `# After clustering.completed webhook fires:
clusters = clustering_api.list_api_v1_clusters

clusters.data.each do |cluster|
  members = clustering_api.list_api_v1_cluster_members(cluster.id)

  create_study_group(
    name: "#{cluster.label} Study Group",
    members: members.data.map(&:external_id),
    topic: cluster.label
  )
end`,
            },
            {
              label: "Python",
              code: `# After clustering.completed webhook fires:
clusters = clustering_api.list_api_v1_clusters()

for cluster in clusters.data:
    members = clustering_api.list_api_v1_cluster_members(cluster.id)

    create_study_group(
        name=f"{cluster.label} Study Group",
        members=[m.external_id for m in members.data],
        topic=cluster.label,
    )`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Key API flow</h3>
        <ol className="list-decimal pl-5 space-y-1 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          <li>Users declare skills and enroll in courses (signals against tags).</li>
          <li>Wait for clustering to run (poll <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">GET /api/v1/clustering_runs</code> or listen for <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">clustering.completed</code> webhook).</li>
          <li>Read cluster membership via <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">GET /api/v1/clusters/{"{id}"}/members</code>.</li>
          <li>Use cluster labels and sizes to form appropriately-sized groups.</li>
          <li>Monitor for <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">cluster.drift_detected</code> to rebalance groups when interests shift.</li>
        </ol>
      </section>

      {/* Recipe 5: Engagement analytics */}
      <section id="engagement-analytics" className="mb-14">
        <h2 className="text-2xl font-semibold mb-2">Engagement analytics</h2>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-4">
          Signals + Analytics + Webhooks
        </p>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          Use Simbee purely as a behavioral analytics pipeline &mdash; no
          personalization, no matching. Ingest user actions as signals, query
          aggregate analytics for dashboards, and subscribe to webhooks for
          real-time alerting.
        </p>

        <h3 className="text-lg font-semibold mb-2">Signal types as event taxonomy</h3>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          Model your analytics event taxonomy as signal types. Strength values
          don&apos;t affect analytics aggregation, but they&apos;re useful if you
          later add personalization.
        </p>
        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `const signalTypes = [
  { key: "page_view",     label: "Page View",      strength_override: 0.1 },
  { key: "button_click",  label: "Button Click",   strength_override: 0.2 },
  { key: "form_submit",   label: "Form Submit",    strength_override: 0.5 },
  { key: "checkout_start", label: "Checkout Start", strength_override: 0.7 },
  { key: "purchase",      label: "Purchase",        strength_override: 1.0 },
];

for (const st of signalTypes) {
  await configApi.createApiV1ConfigSignalType(st);
}`,
            },
            {
              label: "Ruby",
              code: `[
  { key: "page_view",     label: "Page View",      strength_override: 0.1 },
  { key: "button_click",  label: "Button Click",   strength_override: 0.2 },
  { key: "form_submit",   label: "Form Submit",    strength_override: 0.5 },
  { key: "checkout_start", label: "Checkout Start", strength_override: 0.7 },
  { key: "purchase",      label: "Purchase",        strength_override: 1.0 },
].each do |st|
  config_api.create_api_v1_config_signal_type(
    SimbeeClient::CreateConfigResource.new(**st)
  )
end`,
            },
            {
              label: "Python",
              code: `signal_types = [
    ("page_view",     "Page View",      0.1),
    ("button_click",  "Button Click",   0.2),
    ("form_submit",   "Form Submit",    0.5),
    ("checkout_start", "Checkout Start", 0.7),
    ("purchase",      "Purchase",        1.0),
]

for key, label, strength in signal_types:
    config_api.create_api_v1_config_signal_type(
        CreateConfigResource(
            key=key, label=label, strength_override=strength,
        )
    )`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Batch signal ingestion</h3>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          For high-volume event ingestion, batch signals in groups of up to
          1,000. This is more efficient than individual signal calls for
          analytics-heavy workloads.
        </p>
        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl -X POST $SIMBEE_URL/api/v1/signal_batches \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "signals": [
      {
        "external_id": "user_1",
        "signal_type_id": "page_view",
        "target_id": "/pricing",
        "target_type": "page"
      },
      {
        "external_id": "user_1",
        "signal_type_id": "button_click",
        "target_id": "cta-signup",
        "target_type": "element"
      },
      {
        "external_id": "user_2",
        "signal_type_id": "purchase",
        "target_id": "plan-pro",
        "target_type": "product"
      }
    ]
  }'`,
            },
            {
              label: "TypeScript",
              code: `const { data: batch } = await signalsApi.createApiV1SignalBatch({
  signals: [
    {
      external_id: "user_1",
      signal_type_id: "page_view",
      target_id: "/pricing",
      target_type: "page",
    },
    {
      external_id: "user_1",
      signal_type_id: "button_click",
      target_id: "cta-signup",
      target_type: "element",
    },
    {
      external_id: "user_2",
      signal_type_id: "purchase",
      target_id: "plan-pro",
      target_type: "product",
    },
  ],
});

console.log(batch.data.id); // Poll for completion`,
            },
            {
              label: "Ruby",
              code: `batch = signals_api.create_api_v1_signal_batch(
  SimbeeClient::CreateSignalBatch.new(
    signals: [
      { external_id: "user_1", signal_type_id: "page_view",
        target_id: "/pricing", target_type: "page" },
      { external_id: "user_1", signal_type_id: "button_click",
        target_id: "cta-signup", target_type: "element" },
      { external_id: "user_2", signal_type_id: "purchase",
        target_id: "plan-pro", target_type: "product" },
    ]
  )
)

puts batch.data.id  # Poll for completion`,
            },
            {
              label: "Python",
              code: `batch = signals_api.create_api_v1_signal_batch(
    CreateSignalBatch(
        signals=[
            {"external_id": "user_1", "signal_type_id": "page_view",
             "target_id": "/pricing", "target_type": "page"},
            {"external_id": "user_1", "signal_type_id": "button_click",
             "target_id": "cta-signup", "target_type": "element"},
            {"external_id": "user_2", "signal_type_id": "purchase",
             "target_id": "plan-pro", "target_type": "product"},
        ]
    )
)

print(batch.data.id)  # Poll for completion`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Dashboard queries</h3>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          Build dashboards from the analytics endpoints. Each endpoint returns
          aggregated data scoped to your tenant.
        </p>
        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `const analytics = new AnalyticsApi(config);

// Overall activity
const { data: overview } = await analytics.getApiV1AnalyticsOverview();
console.log("Total users:", overview.data.totals.users);
console.log("Signals today:", overview.data.last_24h.signals_created);

// Signal breakdown by type
const { data: signals } = await analytics.getApiV1AnalyticsSignals();
console.log("Signal breakdown:", signals.data);

// Growth trends
const { data: growth } = await analytics.getApiV1AnalyticsGrowth();
console.log("Growth:", growth.data);`,
            },
            {
              label: "Ruby",
              code: `analytics_api = SimbeeClient::AnalyticsApi.new

# Overall activity
overview = analytics_api.get_api_v1_analytics_overview
puts "Total users: #{overview.data.totals.users}"
puts "Signals today: #{overview.data.last_24h.signals_created}"

# Signal breakdown by type
signals = analytics_api.get_api_v1_analytics_signals
puts "Signal breakdown: #{signals.data}"

# Growth trends
growth = analytics_api.get_api_v1_analytics_growth
puts "Growth: #{growth.data}"`,
            },
            {
              label: "Python",
              code: `analytics_api = AnalyticsApi(client)

# Overall activity
overview = analytics_api.get_api_v1_analytics_overview()
print(f"Total users: {overview.data.totals.users}")
print(f"Signals today: {overview.data.last_24h.signals_created}")

# Signal breakdown by type
signals = analytics_api.get_api_v1_analytics_signals()
print(f"Signal breakdown: {signals.data}")

# Growth trends
growth = analytics_api.get_api_v1_analytics_growth()
print(f"Growth: {growth.data}")`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Key API flow</h3>
        <ol className="list-decimal pl-5 space-y-1 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          <li>Define your event taxonomy as signal types.</li>
          <li>Ingest events via individual signals or batches.</li>
          <li>Query <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">GET /api/v1/analytics/*</code> endpoints for dashboard data.</li>
          <li>Subscribe to <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">clustering.completed</code> to get automatic user segmentation as a bonus.</li>
          <li>Use <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">GET /api/v1/analytics/vocabulary</code> to see which tags/topics drive the most engagement.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Next steps</h2>
        <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
          <li>
            <Link href="/docs/concepts" className="text-amber-600 dark:text-amber-400 hover:underline">
              Concepts
            </Link>{" "}
            &mdash; Deep explanation of each primitive and how they compose.
          </li>
          <li>
            <Link href="/docs/getting-started" className="text-amber-600 dark:text-amber-400 hover:underline">
              Getting Started
            </Link>{" "}
            &mdash; Hands-on tutorial with all the API calls.
          </li>
          <li>
            <Link href="/docs/webhooks" className="text-amber-600 dark:text-amber-400 hover:underline">
              Webhooks
            </Link>{" "}
            &mdash; Event catalog, payload schemas, and signature verification.
          </li>
          <li>
            <Link href="/docs/reference" className="text-amber-600 dark:text-amber-400 hover:underline">
              API Reference
            </Link>{" "}
            &mdash; Full endpoint reference with request/response schemas.
          </li>
        </ul>
      </section>
    </div>
  );
}
