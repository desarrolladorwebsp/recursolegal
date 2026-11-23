import { execFileSync } from "node:child_process";
import { cp, mkdir, rename, rm } from "node:fs/promises";
import { dirname, join } from "node:path";

const key = process.env.RECURSO_LEGAL_PREVIEW_KEY;
if ((process.env.VERCEL_ENV === "production" || key) && !/^[a-f0-9]{32}$/.test(key ?? "")) {
  throw new Error("Configura RECURSO_LEGAL_PREVIEW_KEY con 32 caracteres hexadecimales en Vercel.");
}

const output = "out-vercel";
await rm(output, { recursive: true, force: true });
await cp("lanzamiento", output, { recursive: true, filter: (file) => !/\/\._/.test(file) });

if (key) {
  const siteExport = "out-preview-site";
  const basePath = `/smartpro/vista-privada/${key}`;
  const destination = join(output, basePath);

  execFileSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
    stdio: "inherit",
    env: { ...process.env, RECURSO_LEGAL_PREVIEW_PATH: basePath },
  });

  await rm(join(siteExport, ".htaccess"), { force: true });
  await mkdir(dirname(destination), { recursive: true });
  await rename(siteExport, destination);
}
