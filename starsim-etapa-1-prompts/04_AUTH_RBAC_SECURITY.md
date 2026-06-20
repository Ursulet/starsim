# Prompt 04 — Admin Auth, RBAC & Security Foundation

Implement admin authentication and role-based access control for Star Sim.

## Auth approach

Use `next-auth` with Credentials provider.

Requirements:

- admin login at `/admin/login`
- no public registration
- no user signup
- credentials checked against `User.email` and `User.passwordHash`
- only `ACTIVE` users can log in
- JWT session strategy
- include `id`, `email`, `name`, `role`, `status` in the session
- protect all `/admin` routes except `/admin/login`
- redirect unauthenticated users to `/admin/login`
- redirect authenticated users away from `/admin/login` to `/admin`

## Files to implement

```txt
src/lib/auth.ts
src/server/auth/session.ts
src/app/api/auth/[...nextauth]/route.ts
middleware.ts
```

## `src/lib/auth.ts`

Create the central auth configuration.

Use:

- Credentials provider
- Zod validation for login input
- Prisma lookup by lowercase email
- bcrypt password verification through `verifyPassword`
- clear failure handling without leaking whether email exists

Callbacks:

- `jwt`: attach user id, role and status
- `session`: expose safe user fields
- `authorized` or middleware integration as needed

Do not expose password hash anywhere.

## Type augmentation

Create:

```txt
src/types/next-auth.d.ts
```

Augment NextAuth types so `session.user` includes:

```ts
id: string;
role: "ADMIN" | "EDITOR" | "VOLUNTEER";
status: "ACTIVE" | "DISABLED";
```

Ensure TypeScript recognizes these fields.

## Middleware

Create `middleware.ts`.

Rules:

- `/admin/login` is public
- `/api/auth/*` is public
- all other `/admin/*` routes require authenticated user
- disabled users cannot access admin
- unauthenticated users are redirected to `/admin/login`

Matcher should protect `/admin/:path*`.

## RBAC utilities

Create `src/lib/admin/permissions.ts`.

Define:

```ts
export const ADMIN_ROLES = ["ADMIN", "EDITOR"] as const;
export const SUPER_ADMIN_ONLY = ["ADMIN"] as const;
```

Create helpers:

```ts
canAccessAdmin(role)
canManageUsers(role)
canManageSettings(role)
canPublishContent(role)
canEditContent(role)
```

Rules:

- `ADMIN` can do everything.
- `EDITOR` can manage content but not users, core settings or audit log deletion.
- `VOLUNTEER` has no admin access in phase 1 unless explicitly activated later.

## Server session helper

Create `src/server/auth/session.ts`.

Export:

```ts
getCurrentUser()
requireAdminUser()
requireRole(roles)
```

Behavior:

- `getCurrentUser` returns session user or null.
- `requireAdminUser` redirects to `/admin/login` or throws if user is not allowed.
- `requireRole` enforces role access.

## Login page

Implement `/admin/login`.

Visual requirements:

- centered card
- Star Sim brand text
- navy/gold color palette
- email + password fields
- submit button
- error message area
- no public registration link
- link back to public homepage

Use server action or client-side `signIn("credentials")`.

If using client-side signIn, keep the page as simple as possible and validate inputs before submitting.

## Logout

Add a logout button in the future admin header/sidebar.

Use NextAuth signOut and redirect to `/admin/login`.

## Audit logging foundation

Create `src/lib/audit.ts`.

Export:

```ts
createAuditLog({
  actorId,
  action,
  entity,
  entityId,
  metadata,
  ipAddress,
  userAgent,
})
```

Use Prisma `AuditLog`.

In this phase, log:

- successful login if straightforward
- failed login attempt without storing passwords
- user seed action if possible

Do not block login if audit logging fails; catch and log server-side.

## Security requirements

- Never store plain passwords.
- Never return password hash from queries.
- Normalize emails to lowercase.
- Use generic login error: `Email sau parolă incorectă.`
- Do not leak disabled status in UI.
- Keep secrets in env.
- Do not add public registration.
- Do not implement password reset yet.
- Do not add testing tooling.

## Completion criteria

A seeded admin can log in at `/admin/login`, access `/admin`, and all protected admin routes require authentication.
