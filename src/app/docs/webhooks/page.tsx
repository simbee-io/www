import type { Metadata } from "next";
import Link from "next/link";
import { CodeTabs } from "@/components/code-tabs";

export const metadata: Metadata = {
  title: "Webhooks",
};

export default function WebhooksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Webhooks</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8">
        Simbee delivers webhook notifications when platform events occur. Subscribe
        to event types, verify signatures, and build reactive integrations that
        respond to matches, clustering, and campaign changes in real time.
      </p>

      <nav className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 mb-10">
        <p className="font-semibold text-sm mb-2">On this page</p>
        <ol className="list-decimal list-inside text-sm space-y-1 text-neutral-500 dark:text-neutral-400">
          <li><a href="#subscribing" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Subscribing</a></li>
          <li><a href="#event-catalog" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Event catalog</a></li>
          <li><a href="#payload-format" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Payload format</a></li>
          <li><a href="#signature-verification" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Signature verification</a></li>
          <li><a href="#delivery-guarantees" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Delivery guarantees</a></li>
          <li><a href="#managing-subscriptions" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Managing subscriptions</a></li>
          <li><a href="#integration-examples" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Integration examples</a></li>
        </ol>
      </nav>

      {/* Subscribing */}
      <section id="subscribing" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Subscribing</h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          Create a webhook subscription by providing a URL, the event types you
          want to receive, and an optional signing secret for payload
          verification.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl -X POST https://api.simbee.io/api/v1/clients/cl_abc123/webhooks \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks/simbee",
    "event_types": ["match.computed", "clustering.completed"],
    "secret": "whsec_your_signing_secret"
  }'`,
            },
            {
              label: "TypeScript",
              code: `import { WebhooksApi, Configuration } from "@simbee-io/client";

const config = new Configuration({
  basePath: "https://api.simbee.io",
  accessToken: token,
});
const webhooks = new WebhooksApi(config);

const { data } = await webhooks.createApiV1ClientWebhook("cl_abc123", {
  url: "https://your-app.com/webhooks/simbee",
  event_types: ["match.computed", "clustering.completed"],
  secret: "whsec_your_signing_secret",
});

console.log(data.data.id); // wh_abc123`,
            },
            {
              label: "Ruby",
              code: `webhooks_api = SimbeeClient::WebhooksApi.new

result = webhooks_api.create_api_v1_client_webhook(
  "cl_abc123",
  SimbeeClient::CreateWebhook.new(
    url: "https://your-app.com/webhooks/simbee",
    event_types: ["match.computed", "clustering.completed"],
    secret: "whsec_your_signing_secret"
  )
)

puts result.data.id  # wh_abc123`,
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
        event_types=["match.computed", "clustering.completed"],
        secret="whsec_your_signing_secret",
    ),
)

print(result.data.id)  # wh_abc123`,
            },
          ]}
        />
      </section>

      {/* Event catalog */}
      <section id="event-catalog" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Event catalog</h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          Five event types are available for webhook delivery. Internal
          service-to-service events (signal processing, embedding regeneration,
          etc.) are not exposed via webhooks.
        </p>

        {/* match.computed */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 mb-4 overflow-hidden">
          <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
            <code className="text-sm font-semibold">match.computed</code>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
              Fired when a match is computed between two users. Use this to
              notify users of new matches, trigger downstream workflows, or
              update your application&apos;s match state.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Field</th>
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Type</th>
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">client_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">Tenant identifier</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">user_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">The user who was matched</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">matched_user_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">The other user in the match</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">score</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">float</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">Match compatibility score (0.0&ndash;1.0)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* clustering.completed */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 mb-4 overflow-hidden">
          <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
            <code className="text-sm font-semibold">clustering.completed</code>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
              Fired when a clustering pipeline run completes successfully. Use
              this to trigger segmentation updates, refresh dashboards, or sync
              cluster assignments to your application.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Field</th>
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Type</th>
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">client_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">Tenant identifier</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">consent_layer_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">Consent layer the clustering was scoped to</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">clustering_run_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">The pipeline run that produced these clusters</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">clusters</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">array</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">Summary of discovered clusters (IDs, sizes, labels)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* clustering.failed */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 mb-4 overflow-hidden">
          <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
            <code className="text-sm font-semibold">clustering.failed</code>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
              Fired when a clustering pipeline run fails. Use this to alert your
              operations team or trigger fallback logic.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Field</th>
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Type</th>
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">client_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">Tenant identifier</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">consent_layer_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">Consent layer the clustering was scoped to</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">error_details</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">Human-readable error description</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* campaign.budget_exhausted */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 mb-4 overflow-hidden">
          <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
            <code className="text-sm font-semibold">campaign.budget_exhausted</code>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
              Fired when a campaign&apos;s total spend reaches its budget. The
              campaign is automatically completed. Use this to notify campaign
              managers or trigger follow-up campaigns.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Field</th>
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Type</th>
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">client_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">Tenant identifier</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">campaign_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">The campaign that exhausted its budget</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* cluster.drift_detected */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 mb-4 overflow-hidden">
          <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
            <code className="text-sm font-semibold">cluster.drift_detected</code>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
              Fired when a cluster&apos;s composition has shifted significantly
              between runs. Use this to detect changing user segments, trigger
              re-targeting, or alert on behavioral shifts.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Field</th>
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Type</th>
                  <th className="text-left px-2 py-1.5 font-medium text-neutral-500 dark:text-neutral-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">client_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">Tenant identifier</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><code className="text-xs">cluster_id</code></td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">string</td>
                  <td className="px-2 py-1.5 text-neutral-500 dark:text-neutral-400">The cluster that drifted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Payload format */}
      <section id="payload-format" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Payload format</h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          Every webhook delivery is an HTTP POST with a JSON body containing the
          event type, payload data, and a timestamp.
        </p>

        <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-sm overflow-x-auto mb-4">
          <code>{`POST https://your-app.com/webhooks/simbee
Content-Type: application/json
X-Simbee-Event: match.computed
X-Simbee-Signature: a1b2c3d4e5f6...

{
  "event_type": "match.computed",
  "data": {
    "client_id": "cl_abc123",
    "user_id": "usr_abc123",
    "matched_user_id": "usr_def456",
    "score": 0.87
  },
  "timestamp": "2026-04-11T14:30:00Z"
}`}</code>
        </pre>

        <h3 className="text-lg font-semibold mb-2">Headers</h3>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
              <th className="text-left px-4 py-2.5 font-medium text-neutral-500 dark:text-neutral-400">Header</th>
              <th className="text-left px-4 py-2.5 font-medium text-neutral-500 dark:text-neutral-400">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs">Content-Type</code></td>
              <td className="px-4 py-2.5 text-neutral-500 dark:text-neutral-400">Always <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">application/json</code></td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs">X-Simbee-Event</code></td>
              <td className="px-4 py-2.5 text-neutral-500 dark:text-neutral-400">The event type (e.g. <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">match.computed</code>)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code className="text-xs">X-Simbee-Signature</code></td>
              <td className="px-4 py-2.5 text-neutral-500 dark:text-neutral-400">HMAC-SHA256 hex digest of the request body (present only if a secret was provided)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Signature verification */}
      <section id="signature-verification" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Signature verification</h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          If you provided a <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">secret</code> when
          creating the subscription, every delivery includes an{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">X-Simbee-Signature</code> header.
          The signature is the HMAC-SHA256 hex digest of the raw request body
          using your secret as the key. Always verify signatures before
          processing webhook payloads.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `import crypto from "crypto";

function verifyWebhook(
  body: string,
  signature: string,
  secret: string,
): boolean {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected),
  );
}

// In your webhook handler:
app.post("/webhooks/simbee", (req, res) => {
  const signature = req.headers["x-simbee-signature"];
  const rawBody = req.body; // raw string, not parsed JSON

  if (!verifyWebhook(rawBody, signature, "whsec_your_signing_secret")) {
    return res.status(401).send("Invalid signature");
  }

  const event = JSON.parse(rawBody);
  console.log(event.event_type, event.data);
  res.status(200).send("OK");
});`,
            },
            {
              label: "Ruby",
              code: `require "openssl"

def verify_webhook(body, signature, secret)
  expected = OpenSSL::HMAC.hexdigest("SHA256", secret, body)
  Rack::Utils.secure_compare(signature, expected)
end

# In your webhook handler (Rails example):
class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def simbee
    signature = request.headers["X-Simbee-Signature"]
    raw_body = request.raw_post

    unless verify_webhook(raw_body, signature, "whsec_your_signing_secret")
      return head :unauthorized
    end

    event = JSON.parse(raw_body)
    Rails.logger.info "#{event["event_type"]}: #{event["data"]}"
    head :ok
  end
end`,
            },
            {
              label: "Python",
              code: `import hmac
import hashlib

def verify_webhook(body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(signature, expected)

# In your webhook handler (Flask example):
from flask import Flask, request

app = Flask(__name__)

@app.post("/webhooks/simbee")
def handle_webhook():
    signature = request.headers.get("X-Simbee-Signature", "")
    raw_body = request.get_data()

    if not verify_webhook(raw_body, signature, "whsec_your_signing_secret"):
        return "Invalid signature", 401

    event = request.get_json()
    print(f"{event['event_type']}: {event['data']}")
    return "OK", 200`,
            },
          ]}
        />

        <div className="text-sm mt-4 p-3 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 text-neutral-500 dark:text-neutral-400">
          <strong>Always use constant-time comparison</strong> (
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">timingSafeEqual</code>,{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">secure_compare</code>,{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">compare_digest</code>)
          when verifying signatures. Standard string equality is vulnerable to
          timing attacks.
        </div>
      </section>

      {/* Delivery guarantees */}
      <section id="delivery-guarantees" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Delivery guarantees</h2>

        <h3 className="text-lg font-semibold mb-2">At-least-once delivery</h3>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          Simbee guarantees at-least-once delivery. If your endpoint returns a
          non-2xx status code or times out, the delivery is retried. This means
          your handler may receive the same event more than once &mdash; design
          your handlers to be idempotent.
        </p>

        <h3 className="text-lg font-semibold mb-2">Retry schedule</h3>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          Failed deliveries are retried up to 5 times with exponential backoff:
        </p>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
              <th className="text-left px-4 py-2.5 font-medium text-neutral-500 dark:text-neutral-400">Attempt</th>
              <th className="text-left px-4 py-2.5 font-medium text-neutral-500 dark:text-neutral-400">Delay</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-2.5">1st retry</td>
              <td className="px-4 py-2.5 text-neutral-500 dark:text-neutral-400">~30 seconds</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5">2nd retry</td>
              <td className="px-4 py-2.5 text-neutral-500 dark:text-neutral-400">~1 minute</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5">3rd retry</td>
              <td className="px-4 py-2.5 text-neutral-500 dark:text-neutral-400">~2 minutes</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5">4th retry</td>
              <td className="px-4 py-2.5 text-neutral-500 dark:text-neutral-400">~4 minutes</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5">5th retry</td>
              <td className="px-4 py-2.5 text-neutral-500 dark:text-neutral-400">~8 minutes</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          After 5 failed attempts the event is dropped. Paused subscriptions
          skip delivery entirely &mdash; events that occur while a subscription
          is paused are not queued for later delivery.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Idempotency</h3>
        <p className="text-neutral-500 dark:text-neutral-400">
          Your webhook handler should be idempotent. Use the combination of{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">event_type</code> +{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">timestamp</code> +
          payload fields (e.g. <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">user_id</code>)
          as a deduplication key if your handler has side effects.
        </p>
      </section>

      {/* Managing subscriptions */}
      <section id="managing-subscriptions" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Managing subscriptions</h2>

        <h3 className="text-lg font-semibold mb-2">List subscriptions</h3>
        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl https://api.simbee.io/api/v1/clients/cl_abc123/webhooks \\
  -H "Authorization: Bearer $SIMBEE_TOKEN"`,
            },
            {
              label: "TypeScript",
              code: `const { data } = await webhooks.listApiV1ClientWebhooks("cl_abc123");
for (const sub of data.data) {
  console.log(sub.id, sub.url, sub.status, sub.event_types);
}`,
            },
            {
              label: "Ruby",
              code: `subs = webhooks_api.list_api_v1_client_webhooks("cl_abc123")
subs.data.each do |sub|
  puts "#{sub.id} #{sub.url} #{sub.status} #{sub.event_types}"
end`,
            },
            {
              label: "Python",
              code: `subs = webhooks_api.list_api_v1_client_webhooks("cl_abc123")
for sub in subs.data:
    print(sub.id, sub.url, sub.status, sub.event_types)`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-6 mb-2">Update a subscription</h3>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          Change the URL, event types, or status of an existing subscription.
          Set status to{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">paused</code> to
          temporarily stop deliveries without deleting the subscription.
        </p>
        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `# Update event types
curl -X PATCH https://api.simbee.io/api/v1/clients/cl_abc123/webhooks/wh_abc123 \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "event_types": ["match.computed", "campaign.budget_exhausted"] }'

# Pause a subscription
curl -X PATCH https://api.simbee.io/api/v1/clients/cl_abc123/webhooks/wh_abc123 \\
  -H "Authorization: Bearer $SIMBEE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "status": "paused" }'`,
            },
            {
              label: "TypeScript",
              code: `// Update event types
await webhooks.updateApiV1ClientWebhook("cl_abc123", "wh_abc123", {
  event_types: ["match.computed", "campaign.budget_exhausted"],
});

// Pause
await webhooks.updateApiV1ClientWebhook("cl_abc123", "wh_abc123", {
  status: "paused",
});`,
            },
            {
              label: "Ruby",
              code: `# Update event types
webhooks_api.update_api_v1_client_webhook(
  "cl_abc123", "wh_abc123",
  SimbeeClient::UpdateWebhook.new(
    event_types: ["match.computed", "campaign.budget_exhausted"]
  )
)

# Pause
webhooks_api.update_api_v1_client_webhook(
  "cl_abc123", "wh_abc123",
  SimbeeClient::UpdateWebhook.new(status: "paused")
)`,
            },
            {
              label: "Python",
              code: `from simbee_client.models import UpdateWebhook

# Update event types
webhooks_api.update_api_v1_client_webhook(
    "cl_abc123", "wh_abc123",
    UpdateWebhook(
        event_types=["match.computed", "campaign.budget_exhausted"],
    ),
)

# Pause
webhooks_api.update_api_v1_client_webhook(
    "cl_abc123", "wh_abc123",
    UpdateWebhook(status="paused"),
)`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-6 mb-2">Delete a subscription</h3>
        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl -X DELETE https://api.simbee.io/api/v1/clients/cl_abc123/webhooks/wh_abc123 \\
  -H "Authorization: Bearer $SIMBEE_TOKEN"`,
            },
            {
              label: "TypeScript",
              code: `await webhooks.deleteApiV1ClientWebhook("cl_abc123", "wh_abc123");`,
            },
            {
              label: "Ruby",
              code: `webhooks_api.delete_api_v1_client_webhook("cl_abc123", "wh_abc123")`,
            },
            {
              label: "Python",
              code: `webhooks_api.delete_api_v1_client_webhook("cl_abc123", "wh_abc123")`,
            },
          ]}
        />
      </section>

      {/* Integration examples */}
      <section id="integration-examples" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Integration examples</h2>
        <p className="mb-6 text-neutral-500 dark:text-neutral-400">
          These examples show how to use webhooks for different application
          patterns. Each subscribes to different event types and handles the
          payload differently.
        </p>

        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
            <h3 className="font-semibold mb-1">Match notifications</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
              Subscribe to <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">match.computed</code>.
              When a match is found, notify both users via your application&apos;s
              notification system.
            </p>
            <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-xs overflow-x-auto">
              <code>{`// Handle match.computed
if (event.event_type === "match.computed") {
  const { user_id, matched_user_id, score } = event.data;
  await notifyUser(user_id, {
    message: "You have a new match!",
    match_id: matched_user_id,
    compatibility: score,
  });
}`}</code>
            </pre>
          </div>

          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
            <h3 className="font-semibold mb-1">Segmentation pipeline</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
              Subscribe to <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">clustering.completed</code>.
              When clustering finishes, pull cluster assignments and update your
              application&apos;s user segments.
            </p>
            <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-xs overflow-x-auto">
              <code>{`// Handle clustering.completed
if (event.event_type === "clustering.completed") {
  const { clustering_run_id, clusters } = event.data;
  for (const cluster of clusters) {
    const members = await simbee.clusters.listMembers(cluster.id);
    await syncSegment(cluster.label, members);
  }
}`}</code>
            </pre>
          </div>

          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
            <h3 className="font-semibold mb-1">Campaign budget alerting</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
              Subscribe to <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">campaign.budget_exhausted</code>.
              When a campaign runs out of budget, alert the marketing team and
              optionally create a follow-up campaign.
            </p>
            <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-xs overflow-x-auto">
              <code>{`// Handle campaign.budget_exhausted
if (event.event_type === "campaign.budget_exhausted") {
  const { campaign_id } = event.data;
  await slack.send("#marketing", \`Campaign \${campaign_id} budget exhausted\`);
  // Optionally create a follow-up campaign
  const analytics = await simbee.campaigns.getAnalytics(campaign_id);
  if (analytics.engagement_rate > 0.05) {
    await simbee.campaigns.create({ ...renewedConfig });
  }
}`}</code>
            </pre>
          </div>

          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
            <h3 className="font-semibold mb-1">Drift monitoring</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
              Subscribe to <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">cluster.drift_detected</code>.
              When user segments shift, log the change for analysis and alert if
              a high-value segment is affected.
            </p>
            <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-xs overflow-x-auto">
              <code>{`// Handle cluster.drift_detected
if (event.event_type === "cluster.drift_detected") {
  const { cluster_id } = event.data;
  const cluster = await simbee.clusters.get(cluster_id);
  logger.info(\`Cluster "\${cluster.label}" drifted (size: \${cluster.cluster_size})\`);
  if (watchedSegments.includes(cluster.label)) {
    await alertOps(\`High-value segment "\${cluster.label}" has drifted\`);
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Next steps</h2>
        <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
          <li>
            <Link href="/docs/getting-started#webhooks" className="text-amber-600 dark:text-amber-400 hover:underline">
              Getting Started: Webhooks
            </Link>{" "}
            &mdash; Create your first webhook subscription.
          </li>
          <li>
            <Link href="/docs/reference" className="text-amber-600 dark:text-amber-400 hover:underline">
              API Reference
            </Link>{" "}
            &mdash; Full webhook endpoint schemas.
          </li>
          <li>
            <Link href="/docs/recipes" className="text-amber-600 dark:text-amber-400 hover:underline">
              Use Case Recipes
            </Link>{" "}
            &mdash; See webhooks in context with complete integration patterns.
          </li>
        </ul>
      </section>
    </div>
  );
}
