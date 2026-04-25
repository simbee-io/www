import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pageSource = readFileSync(join(here, "page.tsx"), "utf8");

// graph-svc UsersController#index is reachable at /api/v1/users (Envoy regex
// catch-all routes here). Page should hit it directly, not a fake nested path.
test("users page calls /api/v1/users", () => {
  assert.match(pageSource, /useApi<[^>]+>\("\/api\/v1\/users"\)/);
});

// UserDto has no `status` field (only id/client_id/external_id/cluster_id/
// nsfw_opt_in/cluster_confidence/traits/created_at/updated_at). Reading
// `user.status` is always undefined → Status badge always renders empty.
test("users page does not reference non-existent user.status", () => {
  assert.doesNotMatch(pageSource, /user\.status\b/);
  assert.doesNotMatch(pageSource, /\bstatus:\s*string\b/);
});
