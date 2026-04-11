import type { Metadata } from "next";
import Link from "next/link";
import { CodeTabs } from "@/components/code-tabs";

export const metadata: Metadata = {
  title: "Getting Started",
};

export default function GettingStartedPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Getting Started</h1>
      <p className="text-lg text-text-secondary mb-8">
        This tutorial walks through Simbee&apos;s core primitives with real API
        calls. By the end you&apos;ll have created users, recorded signals,
        observed computed affinities, and queried a personalized feed. The
        examples use a music creator platform, but every step applies to any
        domain &mdash; see the{" "}
        <Link href="/docs/concepts" className="text-primary hover:underline">
          Concepts guide
        </Link>{" "}
        for how each primitive maps to different applications.
      </p>

      <nav className="rounded-lg border border-border bg-surface-raised p-4 mb-10">
        <p className="font-semibold text-sm mb-2">On this page</p>
        <ol className="list-decimal list-inside text-sm space-y-1 text-text-secondary">
          <li><a href="#setup" className="hover:text-text transition-colors">Setup</a></li>
          <li><a href="#signal-types" className="hover:text-text transition-colors">Define signal types</a></li>
          <li><a href="#users" className="hover:text-text transition-colors">Create users</a></li>
          <li><a href="#signals" className="hover:text-text transition-colors">Record signals</a></li>
          <li><a href="#affinities" className="hover:text-text transition-colors">Observe affinities</a></li>
          <li><a href="#feed" className="hover:text-text transition-colors">Query the ranked feed</a></li>
          <li><a href="#clusters" className="hover:text-text transition-colors">View clusters</a></li>
          <li><a href="#campaigns" className="hover:text-text transition-colors">Create a campaign</a></li>
          <li><a href="#webhooks" className="hover:text-text transition-colors">Subscribe to webhooks</a></li>
          <li><a href="#analytics" className="hover:text-text transition-colors">Check analytics</a></li>
        </ol>
      </nav>

      <div className="text-sm mb-10 p-3 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 text-text-secondary">
        <strong>Prerequisites:</strong> You need a Simbee account and a JWT
        token. If you don&apos;t have one yet, follow the{" "}
        <Link href="/docs/authentication" className="text-primary hover:underline">
          Authentication guide
        </Link>{" "}
        first. All examples below assume you have a valid token stored in a{" "}
        <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">token</code> variable.
      </div>

      {/* 1. Setup */}
      <section id="setup" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">1. Setup</h2>
        <p className="mb-4 text-text-secondary">
          Install the SDK for your language and configure it with your API
          credentials.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `# No installation needed. Set your token:
export SIMBEE_TOKEN="eyJhbGciOiJFZERTQSIs..."
export SIMBEE_URL="https://api.simbee.io"`,
            },
            {
              label: "TypeScript",
              code: `npm install @simbee-io/client`,
            },
            {
              label: "Ruby",
              code: `gem install simbee-client`,
            },
            {
              label: "Python",
              code: `pip install simbee-client`,
            },
          ]}
        />

        <p className="mt-4 mb-4 text-text-secondary">
          Configure the client with your base URL and token:
        </p>

        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `import { Configuration } from "@simbee-io/client";

const config = new Configuration({
  basePath: "https://api.simbee.io",
  accessToken: token,
});`,
            },
            {
              label: "Ruby",
              code: `require "simbee-client"

SimbeeClient.configure do |c|
  c.base_url = "https://api.simbee.io"
  c.access_token = token
end`,
            },
            {
              label: "Python",
              code: `from simbee_client import ApiClient, Configuration

config = Configuration(
    host="https://api.simbee.io",
    access_token=token,
)
client = ApiClient(config)`,
            },
          ]}
        />
      </section>

      {/* 2. Signal types */}
      <section id="signal-types" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">2. Define signal types</h2>
        <p className="mb-4 text-text-secondary">
          Signal types tell Simbee what behaviors mean in your domain. Each type
          has a key, a default strength, and a decay strategy. Define these
          before recording signals.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `# Create a "listen" signal type (moderate strength)
curl -X POST $SIMBEE_URL/api/v1/config/signal_types \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "key": "listen", "label": "Listen", "strength_override": 0.3 }'

# Create a "follow" signal type (strong signal)
curl -X POST $SIMBEE_URL/api/v1/config/signal_types \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "key": "follow", "label": "Follow", "strength_override": 0.7 }'

# Create a "purchase" signal type (strongest signal)
curl -X POST $SIMBEE_URL/api/v1/config/signal_types \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "key": "purchase", "label": "Purchase", "strength_override": 1.0 }'`,
            },
            {
              label: "TypeScript",
              code: `import { ConfigurationApi } from "@simbee-io/client";

const configApi = new ConfigurationApi(config);

// Create signal types with different strengths
await configApi.createApiV1ConfigSignalType({
  key: "listen",
  label: "Listen",
  strength_override: 0.3,
});

await configApi.createApiV1ConfigSignalType({
  key: "follow",
  label: "Follow",
  strength_override: 0.7,
});

await configApi.createApiV1ConfigSignalType({
  key: "purchase",
  label: "Purchase",
  strength_override: 1.0,
});`,
            },
            {
              label: "Ruby",
              code: `config_api = SimbeeClient::ConfigurationApi.new

# Create signal types with different strengths
config_api.create_api_v1_config_signal_type(
  SimbeeClient::CreateConfigResource.new(
    key: "listen", label: "Listen", strength_override: 0.3
  )
)

config_api.create_api_v1_config_signal_type(
  SimbeeClient::CreateConfigResource.new(
    key: "follow", label: "Follow", strength_override: 0.7
  )
)

config_api.create_api_v1_config_signal_type(
  SimbeeClient::CreateConfigResource.new(
    key: "purchase", label: "Purchase", strength_override: 1.0
  )
)`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import ConfigurationApi
from simbee_client.models import CreateConfigResource

config_api = ConfigurationApi(client)

# Create signal types with different strengths
config_api.create_api_v1_config_signal_type(
    CreateConfigResource(key="listen", label="Listen", strength_override=0.3)
)

config_api.create_api_v1_config_signal_type(
    CreateConfigResource(key="follow", label="Follow", strength_override=0.7)
)

config_api.create_api_v1_config_signal_type(
    CreateConfigResource(key="purchase", label="Purchase", strength_override=1.0)
)`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-900 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 201 Created
{
  "data": {
    "id": "st_abc123",
    "client_id": "cl_abc123",
    "key": "listen",
    "strategy": "default",
    "created_at": "2026-04-11T12:00:00Z",
    "updated_at": "2026-04-11T12:00:00Z"
  }
}`}</code>
        </pre>
        <p className="text-sm mt-2 text-text-secondary">
          The <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">key</code> is
          what you&apos;ll use when recording signals. The <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">id</code> is
          the internal reference.
        </p>
      </section>

      {/* 3. Create users */}
      <section id="users" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">3. Create users</h2>
        <p className="mb-4 text-text-secondary">
          Create users with an <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">external_id</code> that
          maps to your system&apos;s user identifier. You can attach arbitrary{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">traits</code> as a JSON object.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `# Create a few users
curl -X POST $SIMBEE_URL/api/v1/users \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "external_id": "alice",
    "traits": { "name": "Alice", "role": "listener" }
  }'

curl -X POST $SIMBEE_URL/api/v1/users \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "external_id": "bob",
    "traits": { "name": "Bob", "role": "creator", "genre": "jazz" }
  }'

curl -X POST $SIMBEE_URL/api/v1/users \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "external_id": "carol",
    "traits": { "name": "Carol", "role": "creator", "genre": "electronic" }
  }'`,
            },
            {
              label: "TypeScript",
              code: `import { UsersApi } from "@simbee-io/client";

const users = new UsersApi(config);

await users.createApiV1User({
  external_id: "alice",
  traits: { name: "Alice", role: "listener" },
});

await users.createApiV1User({
  external_id: "bob",
  traits: { name: "Bob", role: "creator", genre: "jazz" },
});

await users.createApiV1User({
  external_id: "carol",
  traits: { name: "Carol", role: "creator", genre: "electronic" },
});`,
            },
            {
              label: "Ruby",
              code: `users_api = SimbeeClient::UsersApi.new

users_api.create_api_v1_user(
  SimbeeClient::CreateUser.new(
    external_id: "alice",
    traits: { name: "Alice", role: "listener" }
  )
)

users_api.create_api_v1_user(
  SimbeeClient::CreateUser.new(
    external_id: "bob",
    traits: { name: "Bob", role: "creator", genre: "jazz" }
  )
)

users_api.create_api_v1_user(
  SimbeeClient::CreateUser.new(
    external_id: "carol",
    traits: { name: "Carol", role: "creator", genre: "electronic" }
  )
)`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import UsersApi
from simbee_client.models import CreateUser

users_api = UsersApi(client)

users_api.create_api_v1_user(
    CreateUser(
        external_id="alice",
        traits={"name": "Alice", "role": "listener"},
    )
)

users_api.create_api_v1_user(
    CreateUser(
        external_id="bob",
        traits={"name": "Bob", "role": "creator", "genre": "jazz"},
    )
)

users_api.create_api_v1_user(
    CreateUser(
        external_id="carol",
        traits={"name": "Carol", "role": "creator", "genre": "electronic"},
    )
)`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-900 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 201 Created
{
  "data": {
    "id": "usr_abc123",
    "client_id": "cl_abc123",
    "external_id": "alice",
    "cluster_id": null,
    "cluster_confidence": null,
    "traits": { "name": "Alice", "role": "listener" },
    "created_at": "2026-04-11T12:00:00Z",
    "updated_at": "2026-04-11T12:00:00Z"
  }
}`}</code>
        </pre>
        <p className="text-sm mt-2 text-text-secondary">
          Use <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">external_id</code> in
          all subsequent calls. For bulk creation, use{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">POST /api/v1/users/batch</code> with
          up to 100 users per call.
        </p>
      </section>

      {/* 4. Record signals */}
      <section id="signals" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">4. Record signals</h2>
        <p className="mb-4 text-text-secondary">
          Signals capture user behavior. Each signal connects a user to a target
          (another user, content, or a tag) with a signal type. Record signals
          as actions happen in your application.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `# Alice listens to Bob's track (target_type: "user")
curl -X POST $SIMBEE_URL/api/v1/users/alice/signals \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "signal_type_id": "listen",
    "target_id": "bob",
    "target_type": "user"
  }'

# Alice follows Bob (stronger signal)
curl -X POST $SIMBEE_URL/api/v1/users/alice/signals \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "signal_type_id": "follow",
    "target_id": "bob",
    "target_type": "user"
  }'

# Alice listens to Carol's track
curl -X POST $SIMBEE_URL/api/v1/users/alice/signals \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "signal_type_id": "listen",
    "target_id": "carol",
    "target_type": "user"
  }'`,
            },
            {
              label: "TypeScript",
              code: `import { SignalsApi } from "@simbee-io/client";

const signals = new SignalsApi(config);

// Alice listens to Bob's track
await signals.createApiV1UserSignal("alice", {
  signal_type_id: "listen",
  target_id: "bob",
  target_type: "user",
});

// Alice follows Bob (stronger signal)
await signals.createApiV1UserSignal("alice", {
  signal_type_id: "follow",
  target_id: "bob",
  target_type: "user",
});

// Alice listens to Carol's track
await signals.createApiV1UserSignal("alice", {
  signal_type_id: "listen",
  target_id: "carol",
  target_type: "user",
});`,
            },
            {
              label: "Ruby",
              code: `signals_api = SimbeeClient::SignalsApi.new

# Alice listens to Bob's track
signals_api.create_api_v1_user_signal(
  "alice",
  SimbeeClient::CreateSignal.new(
    signal_type_id: "listen",
    target_id: "bob",
    target_type: "user"
  )
)

# Alice follows Bob (stronger signal)
signals_api.create_api_v1_user_signal(
  "alice",
  SimbeeClient::CreateSignal.new(
    signal_type_id: "follow",
    target_id: "bob",
    target_type: "user"
  )
)

# Alice listens to Carol's track
signals_api.create_api_v1_user_signal(
  "alice",
  SimbeeClient::CreateSignal.new(
    signal_type_id: "listen",
    target_id: "carol",
    target_type: "user"
  )
)`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import SignalsApi
from simbee_client.models import CreateSignal

signals_api = SignalsApi(client)

# Alice listens to Bob's track
signals_api.create_api_v1_user_signal(
    "alice",
    CreateSignal(
        signal_type_id="listen",
        target_id="bob",
        target_type="user",
    ),
)

# Alice follows Bob (stronger signal)
signals_api.create_api_v1_user_signal(
    "alice",
    CreateSignal(
        signal_type_id="follow",
        target_id="bob",
        target_type="user",
    ),
)

# Alice listens to Carol's track
signals_api.create_api_v1_user_signal(
    "alice",
    CreateSignal(
        signal_type_id="listen",
        target_id="carol",
        target_type="user",
    ),
)`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-900 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 201 Created
{
  "data": {
    "id": "sig_abc123",
    "client_id": "cl_abc123",
    "user_id": "usr_abc123",
    "signal_type_id": "listen",
    "target_id": "bob",
    "target_type": "user",
    "strength": 0.3,
    "signaled_at": "2026-04-11T12:01:00Z",
    "created_at": "2026-04-11T12:01:00Z"
  }
}`}</code>
        </pre>
        <p className="text-sm mt-2 text-text-secondary">
          Notice the <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">strength</code> is
          automatically set from the signal type&apos;s configured default.
          Alice now has a listen signal (0.3) and a follow signal (0.7) toward
          Bob, and a listen signal (0.3) toward Carol. These will be aggregated
          into affinities.
        </p>
      </section>

      {/* 5. Observe affinities */}
      <section id="affinities" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">5. Observe affinities</h2>
        <p className="mb-4 text-text-secondary">
          After recording signals, Simbee computes affinities &mdash; aggregated
          relationship strengths. Query Alice&apos;s affinity summary to see how
          her signals have been processed.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl $SIMBEE_URL/api/v1/users/alice/affinity/summary \\
  -H "Authorization: Bearer $SIMBEE_TOKEN"`,
            },
            {
              label: "TypeScript",
              code: `import { AffinitiesApi } from "@simbee-io/client";

const affinities = new AffinitiesApi(config);

const { data } = await affinities.getApiV1UserAffinitySummary("alice");
console.log(data.data);`,
            },
            {
              label: "Ruby",
              code: `affinities_api = SimbeeClient::AffinitiesApi.new

summary = affinities_api.get_api_v1_user_affinity_summary("alice")
puts summary.data`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import AffinitiesApi

affinities_api = AffinitiesApi(client)

summary = affinities_api.get_api_v1_user_affinity_summary("alice")
print(summary.data)`,
            },
          ]}
        />

        <p className="text-sm mt-4 text-text-secondary">
          The summary shows Alice&apos;s computed affinity scores. Bob will rank
          higher because Alice both listened to and followed him (combined
          strength), while Carol only has a listen signal. These affinities
          drive everything downstream &mdash; feed ranking, match scoring, and
          cluster assignment.
        </p>
      </section>

      {/* 6. Query feed */}
      <section id="feed" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">6. Query the ranked feed</h2>
        <p className="mb-4 text-text-secondary">
          The ranked feed returns personalized results for a user, ordered by
          the active scoring configuration. This is the primary endpoint for
          building discovery experiences.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl "$SIMBEE_URL/api/v1/users/alice/feed/ranked?limit=10" \\
  -H "Authorization: Bearer $SIMBEE_TOKEN"`,
            },
            {
              label: "TypeScript",
              code: `import { FeedApi } from "@simbee-io/client";

const feed = new FeedApi(config);

const { data } = await feed.getApiV1UserFeedRanked("alice", {
  limit: 10,
});

for (const item of data.data) {
  console.log(item);
}`,
            },
            {
              label: "Ruby",
              code: `feed_api = SimbeeClient::FeedApi.new

results = feed_api.get_api_v1_user_feed_ranked("alice", limit: 10)
results.data.each do |item|
  puts item
end`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import FeedApi

feed_api = FeedApi(client)

results = feed_api.get_api_v1_user_feed_ranked("alice", limit=10)
for item in results.data:
    print(item)`,
            },
          ]}
        />

        <p className="text-sm mt-4 text-text-secondary">
          Results are ordered by relevance to Alice based on her affinity
          profile. The feed supports cursor-based pagination &mdash; use the{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">cursor</code> parameter
          from the response to fetch the next page. See{" "}
          <Link href="/docs/concepts#scoring" className="text-primary hover:underline">
            Scoring
          </Link>{" "}
          for how to change ranking behavior with presets.
        </p>
      </section>

      {/* 7. Clusters */}
      <section id="clusters" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">7. View clusters</h2>
        <p className="mb-4 text-text-secondary">
          Once you have enough users and signals, Simbee&apos;s clustering
          pipeline groups users into natural segments. Clusters are computed
          asynchronously &mdash; trigger a run and then query the results.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `# List clusters
curl $SIMBEE_URL/api/v1/clusters \\
  -H "Authorization: Bearer $SIMBEE_TOKEN"

# View members of a specific cluster
curl $SIMBEE_URL/api/v1/clusters/cls_abc123/members \\
  -H "Authorization: Bearer $SIMBEE_TOKEN"`,
            },
            {
              label: "TypeScript",
              code: `import { ClusteringApi } from "@simbee-io/client";

const clustering = new ClusteringApi(config);

// List clusters
const { data: clusters } = await clustering.listApiV1Clusters();
for (const cluster of clusters.data) {
  console.log(cluster.label, cluster.cluster_size);
}

// View members
const { data: members } = await clustering.listApiV1ClusterMembers(
  clusters.data[0].id
);`,
            },
            {
              label: "Ruby",
              code: `clustering_api = SimbeeClient::ClusteringApi.new

# List clusters
clusters = clustering_api.list_api_v1_clusters
clusters.data.each do |cluster|
  puts "#{cluster.label}: #{cluster.cluster_size} members"
end

# View members
members = clustering_api.list_api_v1_cluster_members(clusters.data.first.id)`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import ClusteringApi

clustering_api = ClusteringApi(client)

# List clusters
clusters = clustering_api.list_api_v1_clusters()
for cluster in clusters.data:
    print(f"{cluster.label}: {cluster.cluster_size} members")

# View members
members = clustering_api.list_api_v1_cluster_members(clusters.data[0].id)`,
            },
          ]}
        />

        <p className="text-sm mt-4 text-text-secondary">
          Each user&apos;s profile includes{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">cluster_id</code> and{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">cluster_confidence</code>{" "}
          after a clustering run completes. See{" "}
          <Link href="/docs/concepts#clustering" className="text-primary hover:underline">
            Clustering
          </Link>{" "}
          for how clusters form and how to use them.
        </p>
      </section>

      {/* 8. Campaigns */}
      <section id="campaigns" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">8. Create a campaign</h2>
        <p className="mb-4 text-text-secondary">
          Campaigns let you push targeted content into users&apos; feeds.
          Create a campaign, add content items, and activate it.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `# Create a campaign
curl -X POST $SIMBEE_URL/api/v1/campaigns \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "New Artist Spotlight",
    "budget": 1000.0,
    "target_criteria": { "cluster_ids": ["cls_abc123"] },
    "max_impressions_per_user": 3
  }'

# Add a content item to the campaign
curl -X POST $SIMBEE_URL/api/v1/campaigns/cmp_abc123/items \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "external_content_id": "featured-track-42" }'

# Activate the campaign
curl -X POST $SIMBEE_URL/api/v1/campaigns/cmp_abc123/activate \\
  -H "Authorization: Bearer $SIMBEE_TOKEN"`,
            },
            {
              label: "TypeScript",
              code: `import { CampaignsApi } from "@simbee-io/client";

const campaigns = new CampaignsApi(config);

// Create
const { data: campaign } = await campaigns.createApiV1Campaign({
  name: "New Artist Spotlight",
  budget: 1000.0,
  target_criteria: { cluster_ids: ["cls_abc123"] },
  max_impressions_per_user: 3,
});

// Add item
await campaigns.createApiV1CampaignItem(campaign.data.id, {
  external_content_id: "featured-track-42",
});

// Activate
await campaigns.activateApiV1Campaign(campaign.data.id);`,
            },
            {
              label: "Ruby",
              code: `campaigns_api = SimbeeClient::CampaignsApi.new

# Create
campaign = campaigns_api.create_api_v1_campaign(
  SimbeeClient::CreateCampaign.new(
    name: "New Artist Spotlight",
    budget: 1000.0,
    target_criteria: { cluster_ids: ["cls_abc123"] },
    max_impressions_per_user: 3
  )
)

# Add item
campaigns_api.create_api_v1_campaign_item(
  campaign.data.id,
  SimbeeClient::CreateCampaignItem.new(
    external_content_id: "featured-track-42"
  )
)

# Activate
campaigns_api.activate_api_v1_campaign(campaign.data.id)`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import CampaignsApi
from simbee_client.models import CreateCampaign, CreateCampaignItem

campaigns_api = CampaignsApi(client)

# Create
campaign = campaigns_api.create_api_v1_campaign(
    CreateCampaign(
        name="New Artist Spotlight",
        budget=1000.0,
        target_criteria={"cluster_ids": ["cls_abc123"]},
        max_impressions_per_user=3,
    )
)

# Add item
campaigns_api.create_api_v1_campaign_item(
    campaign.data.id,
    CreateCampaignItem(external_content_id="featured-track-42"),
)

# Activate
campaigns_api.activate_api_v1_campaign(campaign.data.id)`,
            },
          ]}
        />

        <p className="text-sm mt-4 text-text-secondary">
          Once activated, campaign items appear in targeted users&apos; feeds
          alongside organic results. Simbee tracks impressions and enforces
          budget limits automatically. See{" "}
          <Link href="/docs/concepts#campaigns" className="text-primary hover:underline">
            Campaigns
          </Link>{" "}
          for the full lifecycle.
        </p>
      </section>

      {/* 9. Webhooks */}
      <section id="webhooks" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">9. Subscribe to webhooks</h2>
        <p className="mb-4 text-text-secondary">
          Webhooks let you react to platform events in real time. Subscribe to
          event types and Simbee will POST payloads to your URL as events occur.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl -X POST $SIMBEE_URL/api/v1/clients/cl_abc123/webhooks \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks/simbee",
    "event_types": [
      "match.computed",
      "clustering.completed",
      "campaign.budget_exhausted"
    ],
    "secret": "whsec_your_signing_secret"
  }'`,
            },
            {
              label: "TypeScript",
              code: `import { WebhooksApi } from "@simbee-io/client";

const webhooks = new WebhooksApi(config);

const { data } = await webhooks.createApiV1ClientWebhook(
  "cl_abc123",
  {
    url: "https://your-app.com/webhooks/simbee",
    event_types: [
      "match.computed",
      "clustering.completed",
      "campaign.budget_exhausted",
    ],
    secret: "whsec_your_signing_secret",
  }
);

console.log(data.data.id); // Subscription ID`,
            },
            {
              label: "Ruby",
              code: `webhooks_api = SimbeeClient::WebhooksApi.new

result = webhooks_api.create_api_v1_client_webhook(
  "cl_abc123",
  SimbeeClient::CreateWebhook.new(
    url: "https://your-app.com/webhooks/simbee",
    event_types: [
      "match.computed",
      "clustering.completed",
      "campaign.budget_exhausted"
    ],
    secret: "whsec_your_signing_secret"
  )
)

puts result.data.id  # Subscription ID`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import WebhooksApi
from simbee_client.models import CreateWebhook

webhooks_api = WebhooksApi(client)

result = webhooks_api.create_api_v1_client_webhook(
    "cl_abc123",
    CreateWebhook(
        url="https://your-app.com/webhooks/simbee",
        event_types=[
            "match.computed",
            "clustering.completed",
            "campaign.budget_exhausted",
        ],
        secret="whsec_your_signing_secret",
    ),
)

print(result.data.id)  # Subscription ID`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-900 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 201 Created
{
  "data": {
    "id": "wh_abc123",
    "client_id": "cl_abc123",
    "url": "https://your-app.com/webhooks/simbee",
    "status": "active",
    "event_types": [
      "match.computed",
      "clustering.completed",
      "campaign.budget_exhausted"
    ],
    "created_at": "2026-04-11T12:05:00Z"
  }
}`}</code>
        </pre>
        <p className="text-sm mt-2 text-text-secondary">
          Webhook deliveries include an HMAC signature in the{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">X-Simbee-Signature</code>{" "}
          header for verification. Deliveries retry with exponential backoff on
          failure.
        </p>
      </section>

      {/* 10. Analytics */}
      <section id="analytics" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">10. Check analytics</h2>
        <p className="mb-4 text-text-secondary">
          The analytics overview gives you a snapshot of your tenant&apos;s
          activity &mdash; total counts and last-24-hour trends.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl $SIMBEE_URL/api/v1/analytics/overview \\
  -H "Authorization: Bearer $SIMBEE_TOKEN"`,
            },
            {
              label: "TypeScript",
              code: `import { AnalyticsApi } from "@simbee-io/client";

const analytics = new AnalyticsApi(config);

const { data } = await analytics.getApiV1AnalyticsOverview();
console.log("Total users:", data.data.totals.users);
console.log("Signals (24h):", data.data.last_24h.signals_created);`,
            },
            {
              label: "Ruby",
              code: `analytics_api = SimbeeClient::AnalyticsApi.new

overview = analytics_api.get_api_v1_analytics_overview
puts "Total users: #{overview.data.totals.users}"
puts "Signals (24h): #{overview.data.last_24h.signals_created}"`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import AnalyticsApi

analytics_api = AnalyticsApi(client)

overview = analytics_api.get_api_v1_analytics_overview()
print(f"Total users: {overview.data.totals.users}")
print(f"Signals (24h): {overview.data.last_24h.signals_created}")`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-900 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 200 OK
{
  "data": {
    "totals": {
      "users": 3,
      "signals": 3,
      "content_items": 0,
      "follows": 1,
      "matches": 0,
      "impressions": 0
    },
    "last_24h": {
      "users_created": 3,
      "signals_created": 3,
      "engagements": 0,
      "matches_computed": 0
    },
    "computed_at": "2026-04-11T12:10:00Z"
  }
}`}</code>
        </pre>
        <p className="text-sm mt-2 text-text-secondary">
          For deeper insights, explore the topic-specific analytics endpoints:{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">/analytics/signals</code>,{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">/analytics/affinities</code>,{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">/analytics/clustering</code>,
          and more. See the{" "}
          <Link href="/docs/reference" className="text-primary hover:underline">
            API Reference
          </Link>{" "}
          for the full list.
        </p>
      </section>

      {/* Next steps */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Next steps</h2>
        <p className="mb-4 text-text-secondary">
          You&apos;ve used Simbee&apos;s core primitives: signal types, users,
          signals, affinities, feed, clusters, campaigns, webhooks, and
          analytics. Here&apos;s where to go from here:
        </p>
        <ul className="space-y-2 text-text-secondary">
          <li>
            <Link href="/docs/concepts" className="text-primary hover:underline">
              Concepts
            </Link>{" "}
            &mdash; Deeper explanation of each primitive and how they compose.
          </li>
          <li>
            <Link href="/docs/concepts#consent-layers" className="text-primary hover:underline">
              Consent layers
            </Link>{" "}
            &mdash; Add opt-in tiers for matching and privacy-scoped discovery.
          </li>
          <li>
            <Link href="/docs/concepts#scoring" className="text-primary hover:underline">
              Custom scoring
            </Link>{" "}
            &mdash; Tune ranking behavior with scoring presets and custom configurations.
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
