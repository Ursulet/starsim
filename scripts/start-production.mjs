import { spawn } from "node:child_process";
import path from "node:path";

const maxAttempts = Number(process.env.STARTUP_DB_ATTEMPTS || 10);
const retryDelayMs = Number(process.env.STARTUP_DB_RETRY_MS || 3000);

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      ...options
    });

    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });

    child.on("error", reject);
  });
}

function localBin(name) {
  const executable = process.platform === "win32" ? `${name}.cmd` : name;
  return path.join(process.cwd(), "node_modules", ".bin", executable);
}

async function runWithRetry(label, command, args) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      console.log(`[startup] ${label} attempt ${attempt}/${maxAttempts}`);
      await run(command, args);
      return;
    } catch (error) {
      lastError = error;
      console.error(`[startup] ${label} failed: ${error.message}`);
      if (attempt < maxAttempts) await wait(retryDelayMs);
    }
  }

  throw lastError;
}

await runWithRetry("Prisma migrations", localBin("prisma"), ["migrate", "deploy"]);

if (process.env.RUN_SEED === "true" || process.env.SEED_DATABASE === "true") {
  try {
    await runWithRetry("Database seed", localBin("tsx"), ["prisma/seed.ts", "--production"]);
  } catch (err) {
    console.warn(`[startup] Database seed skipped: ${err.message}`);
  }
} else {
  console.log("[startup] Baza de date este deja configurată. Se omite rularea seed-ului.");
}

await run(localBin("next"), ["start", "-H", "0.0.0.0", "-p", process.env.PORT || "3000"], {
  env: process.env
});
