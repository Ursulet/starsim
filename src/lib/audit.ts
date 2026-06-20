import { prisma } from "./prisma";

export async function createAuditLog(input: {
  actorId?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  metadata?: unknown;
  ipAddress?: string | null;
  userAgent?: string | null;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: input.actorId,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        metadata: input.metadata as object,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent
      }
    });
  } catch (error) {
    console.error("Audit log failed", error);
  }
}
