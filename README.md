# @sandsoftwaresolutions/signed-links

Create expiring, tamper-proof download and action links using Node's built-in HMAC support.

```js
import { createSignedLink, verifySignedLink } from "@sandsoftwaresolutions/signed-links";

const link = createSignedLink("https://app.example.com/download/invoice.pdf", process.env.LINK_SECRET, { expiresIn: 900 });
verifySignedLink(link, process.env.LINK_SECRET); // true
```

Always use a long, private secret and perform authorization before creating a link.
