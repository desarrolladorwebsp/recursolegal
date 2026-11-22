import { execFileSync } from "node:child_process";
import { randomInt } from "node:crypto";
import { copyFileSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const code = process.argv[2] ?? String(randomInt(100_000, 1_000_000));
if (!/^\d{6}$/.test(code)) {
  throw new Error("El código de la vista previa debe tener seis dígitos.");
}

const directory = `mockup-${code}`;
const basePath = `/${directory}`;
const siteExport = "out-preview-site";
const previewExport = "out-preview";
const archive = "recurso-legal-vista-previa.zip";
const stage = mkdtempSync(".preview-");

try {
  execFileSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
    stdio: "inherit",
    env: { ...process.env, RECURSO_LEGAL_PREVIEW_PATH: basePath },
  });
  execFileSync(process.execPath, ["scripts/prepare-export.mjs", siteExport, basePath], { stdio: "inherit" });

  for (const file of ["index.html", "portada.css", "robots.txt"]) {
    copyFileSync(join("preview", file), join(stage, file));
  }
  const apache = readFileSync(join("preview", "apache.conf"), "utf8").replace("__PREVIEW_DIRECTORY__", directory);
  writeFileSync(join(stage, ".htaccess"), apache);
  renameSync(siteExport, join(stage, directory));

  execFileSync(process.execPath, ["scripts/package-cpanel.mjs", stage, archive], { stdio: "inherit" });
  rmSync(previewExport, { recursive: true, force: true });
  renameSync(stage, previewExport);

  console.log(`Vista previa exportada en ${basePath}/`);
} finally {
  rmSync(stage, { recursive: true, force: true });
}
