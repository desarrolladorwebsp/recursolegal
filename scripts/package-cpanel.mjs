import { execFileSync } from "node:child_process";
import { mkdtempSync, renameSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const temporary = mkdtempSync(resolve(".cpanel-"));
try {
  const archive = join(temporary, "recurso-legal-cpanel.zip");
  execFileSync("zip", ["-qr", archive, ".", "-x", "._*", "*/._*", ".DS_Store", "*/.DS_Store"], { cwd: "out" });
  renameSync(archive, "recurso-legal-cpanel.zip");
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
