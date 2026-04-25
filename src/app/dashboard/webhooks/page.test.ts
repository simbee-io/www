import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pageSource = readFileSync(join(here, "page.tsx"), "utf8");

// Real account-svc route is /api/v1/clients/:id/webhooks (config/routes.rb).
// `webhook_subscriptions` is not a route — every call against it 404s.
test("webhooks page calls /webhooks, never /webhook_subscriptions", () => {
  assert.doesNotMatch(pageSource, /webhook_subscriptions/);
  assert.match(pageSource, /\/api\/v1\/clients\/\$\{clientId\}\/webhooks/);
});

// WebhookSubscriptionDto exposes `status: string`, not `active: boolean`.
// Reading `.active` always yields undefined → badge is always "inactive".
test("webhooks page reads `status` not `active`", () => {
  assert.doesNotMatch(pageSource, /webhook\.active\b/);
  assert.match(pageSource, /webhook\.status\b/);
});
