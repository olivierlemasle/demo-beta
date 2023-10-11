/**
 * This script is used to rename the binary with the platform specific postfix.
 * When `tauri build` is ran, it looks for the binary name appended with the platform specific postfix.
 */

import { execa } from "execa";
import fs from "fs";

let extension = "";
if (process.platform === "win32") {
  extension = ".exe";
}

const sidecar = "demo-sidecar";

async function main() {
  // Build sidecar
  await execa("cargo", ["build", "--release"], { cwd: sidecar });

  // Move binary
  const rustInfo = (await execa("rustc", ["-vV"])).stdout;
  const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
  if (!targetTriple) {
    console.error("Failed to determine platform target triple");
  }
  if (!fs.existsSync("bin")) {
    fs.mkdirSync("bin");
  }
  fs.renameSync(
    `${sidecar}/target/release/${sidecar}${extension}`,
    `bin/${sidecar}-${targetTriple}${extension}`
  );
}

main().catch((e) => {
  throw e;
});
