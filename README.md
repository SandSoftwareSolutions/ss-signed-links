# @sandsoftwaresolutions/signed-links

[![CI](https://github.com/SandSoftwareSolutions/ss-signed-links/actions/workflows/ci.yml/badge.svg)](https://github.com/SandSoftwareSolutions/ss-signed-links/actions/workflows/ci.yml)

Create and verify short-lived, tamper-proof URLs using Node.js HMAC-SHA256.

## Install

```bash
npm install @sandsoftwaresolutions/signed-links
```

## Create and verify a link

```js
import { createSignedLink, verifySignedLink } from "@sandsoftwaresolutions/signed-links";

const link = createSignedLink(
  "https://app.example.com/download/invoice.pdf?invoice=inv_42",
  process.env.LINK_SECRET,
  { expiresIn: 15 * 60 }
);

if (!verifySignedLink(request.url, process.env.LINK_SECRET)) {
  return new Response("Link expired or invalid", { status: 403 });
}
```

## API and security

`createSignedLink(url, secret, { expiresIn = 3600 })` appends `expires` and `signature`. `verifySignedLink(url, secret)` returns `true` only when both the HMAC and expiry are valid.

Authorize the user before issuing a link, use a high-entropy server-only secret, and keep the expiry short. A valid signed link is bearer access, so do not expose it in logs or analytics.
