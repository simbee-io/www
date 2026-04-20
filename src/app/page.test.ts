import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pageSource = readFileSync(join(here, "page.tsx"), "utf8");

// Page containers must match the shared SiteHeader/SiteFooter default
// (max-w-6xl) so the chrome and body line up. max-w-7xl would make the
// body wider than the header/footer.
test("page containers use max-w-6xl, not max-w-7xl", () => {
  assert.doesNotMatch(pageSource, /\bmax-w-7xl\b/);
});
