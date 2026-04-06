/**
 * Re-download California AVAs from UCDavisLibrary/ava (TTB-derived) and simplify for web.
 * Requires: curl, npx mapshaper (installed on demand).
 *
 *   npm run geojson:ca
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "data");
const outFile = path.join(outDir, "ca-avas.geojson");
const url =
  "https://raw.githubusercontent.com/UCDavisLibrary/ava/master/avas_by_state/CA_avas.geojson";

fs.mkdirSync(outDir, { recursive: true });
const tmp = path.join(outDir, ".ca-avas-raw.geojson");

execSync(`curl -fsSL -o "${tmp}" "${url}"`, { stdio: "inherit" });
execSync(`npx --yes mapshaper "${tmp}" -simplify 1.5% keep-shapes -o format=geojson "${outFile}"`, {
  stdio: "inherit",
  cwd: root,
});
fs.unlinkSync(tmp);
console.log("Wrote", outFile);
