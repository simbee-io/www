import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pageSource = readFileSync(join(here, "page.tsx"), "utf8");

// Real discovery-svc route is /api/v1/config/scoring/presets
// (config/routes.rb:29). /api/v1/scoring_presets does not exist anywhere.
test("scoring page calls /api/v1/config/scoring/presets", () => {
  assert.doesNotMatch(pageSource, /\/api\/v1\/scoring_presets/);
  assert.match(pageSource, /\/api\/v1\/config\/scoring\/presets/);
});

// Endpoint returns { data: { layer: { preset_name: config } } } — a hash of
// hashes, not an array of preset objects. Page must iterate layers, then
// presets within each layer.
test("scoring page treats response as hash of layers, not array", () => {
  // The old broken code used `data?.data?.map((preset) => ...)` — array map.
  // The fixed code must iterate Object.entries(data.data) for layers.
  assert.doesNotMatch(pageSource, /data\?\.data\?\.map\(\(preset\)/);
  assert.match(pageSource, /Object\.entries\(/);
});
