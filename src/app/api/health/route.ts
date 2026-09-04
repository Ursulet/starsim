import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const started = Date.now();

  try {
    // Quick DB connectivity check
    await prisma.$queryRaw`SELECT 1`;
    const dbLatencyMs = Date.now() - started;

    return Response.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        db: { status: "connected", latencyMs: dbLatencyMs }
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" }
      }
    );
  } catch {
    return Response.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        db: { status: "disconnected" }
      },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" }
      }
    );
  }
}
