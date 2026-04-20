import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const layoutSource = readFileSync(join(here, "layout.tsx"), "utf8");

// Page containers are max-w-6xl and inherit the shared chrome's default
// max-w-6xl — no override that would widen the chrome past the body.
test("layout does not widen SiteHeader/SiteFooter with max-w-7xl", () => {
  assert.doesNotMatch(
    layoutSource,
    /<Site(Header|Footer)[\s\S]*?maxWidth="max-w-7xl"/,
  );
});

test("layout renders SiteHeader and SiteFooter", () => {
  assert.match(layoutSource, /<SiteHeader\b/);
  assert.match(layoutSource, /<SiteFooter\b/);
});
