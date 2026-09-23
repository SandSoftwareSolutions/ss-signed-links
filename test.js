import assert from "node:assert/strict";
import test from "node:test";
import { createSignedLink, verifySignedLink } from "./src/index.js";
test("creates a verifiable expiring link", () => {
  const link = createSignedLink("https://app.example.com/download/report.pdf?customer=42", "secret", { expiresIn: 60, now: 1_000_000 });
  assert.equal(verifySignedLink(link, "secret", { now: 1_030_000 }), true);
});
test("rejects tampered and expired links", () => {
  const link = createSignedLink("https://app.example.com/download/report.pdf", "secret", { expiresIn: 1, now: 1_000_000 });
  assert.equal(verifySignedLink(link.replace("report", "other"), "secret", { now: 1_000_500 }), false);
  assert.equal(verifySignedLink(link, "secret", { now: 1_002_000 }), false);
});
