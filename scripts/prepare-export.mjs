import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const output = "out";
const exportedPages = (await readdir(output, { recursive: true })).filter((path) => path.endsWith(".html"));
const hashes = new Set();

// App Router emits inline hydration data. Authorize only the exact scripts in this build.
for (const page of exportedPages) {
  const html = await readFile(join(output, page), "utf8");
  for (const [, attributes, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc\s*=/.test(attributes) || !body) continue;
    const hash = createHash("sha256").update(body).digest("base64");
    hashes.add(`'sha256-${hash}'`);
  }
}

const template = await readFile("public/.htaccess", "utf8");
const scriptPolicy = ["script-src 'self'", ...hashes].join(" ");
await writeFile(join(output, ".htaccess"), template.replace("script-src 'self'", scriptPolicy));
