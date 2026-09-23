import { createHmac, timingSafeEqual } from "node:crypto";

function signature(url, secret) {
  return createHmac("sha256", secret).update(`${url.pathname}?${url.searchParams.toString()}`).digest("base64url");
}

export function createSignedLink(input, secret, { expiresIn = 3600, now = Date.now() } = {}) {
  if (typeof secret !== "string" || !secret) throw new TypeError("secret must be a non-empty string");
  if (!Number.isSafeInteger(expiresIn) || expiresIn < 1) throw new RangeError("expiresIn must be a positive integer");
  const url = new URL(input);
  url.searchParams.delete("signature");
  url.searchParams.set("expires", String(Math.floor(now / 1000) + expiresIn));
  url.searchParams.set("signature", signature(url, secret));
  return url.toString();
}

export function verifySignedLink(input, secret, { now = Date.now() } = {}) {
  if (typeof secret !== "string" || !secret) return false;
  const url = new URL(input);
  const actual = url.searchParams.get("signature");
  const expires = Number(url.searchParams.get("expires"));
  if (!actual || !Number.isSafeInteger(expires) || expires < Math.floor(now / 1000)) return false;
  url.searchParams.delete("signature");
  const expected = signature(url, secret);
  return actual.length === expected.length && timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}
