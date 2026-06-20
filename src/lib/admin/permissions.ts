export const ADMIN_ROLES = ["ADMIN", "EDITOR"] as const;
export const SUPER_ADMIN_ONLY = ["ADMIN"] as const;

export function canAccessAdmin(role?: string | null) {
  return role === "ADMIN" || role === "EDITOR";
}

export function canManageUsers(role?: string | null) {
  return role === "ADMIN";
}

export function canManageSettings(role?: string | null) {
  return role === "ADMIN";
}

export function canPublishContent(role?: string | null) {
  return role === "ADMIN" || role === "EDITOR";
}

export function canEditContent(role?: string | null) {
  return role === "ADMIN" || role === "EDITOR";
}
