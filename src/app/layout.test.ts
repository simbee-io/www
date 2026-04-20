import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const layoutSource = readFileSync(join(here, "layout.tsx"), "utf8");

test("SiteHeader is passed maxWidth='max-w-7xl' to align with max-w-7xl page containers", () => {
  assert.match(layoutSource, /<SiteHeader[\s\S]*?maxWidth="max-w-7xl"[\s\S]*?\/>/);
});

test("SiteFooter is passed maxWidth='max-w-7xl' to align with max-w-7xl page containers", () => {
  assert.match(layoutSource, /<SiteFooter[\s\S]*?maxWidth="max-w-7xl"[\s\S]*?\/>/);
});
