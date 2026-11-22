import { execFileSync } from "node:child_process";
import { mkdtempSync, renameSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const [source = "out", filename = "recurso-legal-cpanel.zip"] = process.argv.slice(2);
const temporary = mkdtempSync(resolve(".cpanel-"));
try {
  const archive = join(temporary, "sitio.zip");
  execFileSync("zip", ["-qr", archive, ".", "-x", "._*", "*/._*", ".DS_Store", "*/.DS_Store"], { cwd: source });
  renameSync(archive, filename);
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
