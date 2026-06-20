# Prompt 03 — Prisma Schema & First Admin Seed

Implement the initial Prisma schema for the Star Sim CMS/admin foundation.

## Goal

Create the database foundation for:

- admin users
- roles
- audit logs
- media library
- programs
- events
- event registrations
- gallery albums
- articles
- categories/tags
- editable pages
- donation settings
- contact settings/messages
- newsletter
- partners
- testimonials
- redirects
- site settings

This is a CMS foundation, not the final CRUD UI.

## Replace `prisma/schema.prisma`

Use this schema as the baseline. Keep names clear and migration-friendly.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  EDITOR
  VOLUNTEER
}

enum UserStatus {
  ACTIVE
  DISABLED
}

enum PublishStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum EventStatus {
  DRAFT
  PUBLISHED
  CANCELLED
  COMPLETED
}

enum ContactMessageStatus {
  NEW
  READ
  IN_PROGRESS
  RESOLVED
  SPAM
}

enum ContactMessageType {
  GENERAL
  EVENT
  VOLUNTEER
  PARTNERSHIP
  DONATION
  PRESS
}

enum NewsletterStatus {
  ACTIVE
  UNSUBSCRIBED
  BOUNCED
}

enum RedirectStatusCode {
  MOVED_PERMANENTLY
  FOUND
}

model User {
  id           String     @id @default(cuid())
  email        String     @unique
  name         String
  passwordHash String
  role         Role       @default(EDITOR)
  status       UserStatus @default(ACTIVE)
  image        String?
  lastLoginAt  DateTime?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  createdPrograms Program[] @relation("ProgramCreatedBy")
  updatedPrograms Program[] @relation("ProgramUpdatedBy")

  createdEvents Event[] @relation("EventCreatedBy")
  updatedEvents Event[] @relation("EventUpdatedBy")

  articles Article[] @relation("ArticleAuthor")

  uploadedMedia MediaAsset[] @relation("MediaUploadedBy")

  auditLogs AuditLog[] @relation("AuditActor")

  @@index([role])
  @@index([status])
}

model AuditLog {
  id        String   @id @default(cuid())
  actorId   String?
  actor     User?    @relation("AuditActor", fields: [actorId], references: [id], onDelete: SetNull)
  action    String
  entity    String
  entityId  String?
  metadata  Json?
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())

  @@index([actorId])
  @@index([entity, entityId])
  @@index([createdAt])
}

model MediaAsset {
  id           String   @id @default(cuid())
  url          String
  storageKey   String?
  filename     String
  originalName String?
  mimeType     String
  sizeBytes    Int
  width        Int?
  height       Int?
  altText      String?
  caption      String?
  folder       String?
  uploadedById String?
  uploadedBy   User?    @relation("MediaUploadedBy", fields: [uploadedById], references: [id], onDelete: SetNull)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  programHeroImages Program[] @relation("ProgramHeroImage")
  programOgImages   Program[] @relation("ProgramOgImage")

  eventImages   Event[] @relation("EventImage")
  eventOgImages Event[] @relation("EventOgImage")

  albumCovers   GalleryAlbum[] @relation("GalleryAlbumCover")
  galleryImages GalleryImage[]

  articleCovers Article[] @relation("ArticleCoverImage")
  articleOg     Article[] @relation("ArticleOgImage")

  pageOgImages Page[] @relation("PageOgImage")

  partnerLogos Partner[] @relation("PartnerLogo")

  testimonialImages Testimonial[] @relation("TestimonialImage")

  donationHeroImages DonationSettings[] @relation("DonationHeroImage")
  donationOgImages   DonationSettings[] @relation("DonationOgImage")

  contactOgImages ContactSettings[] @relation("ContactOgImage")

  @@index([mimeType])
  @@index([folder])
  @@index([createdAt])
}

model Program {
  id             String        @id @default(cuid())
  title          String
  slug           String        @unique
  excerpt        String
  content        Json?
  iconKey        String?
  category       String?
  status         PublishStatus @default(DRAFT)
  featuredOnHome Boolean       @default(false)
  homeOrder      Int           @default(0)

  ctaLabel String?
  ctaHref  String?

  heroImageId String?
  heroImage   MediaAsset? @relation("ProgramHeroImage", fields: [heroImageId], references: [id], onDelete: SetNull)

  seoTitle       String?
  seoDescription String?
  seoKeywords    String?
  ogTitle        String?
  ogDescription  String?
  ogImageId      String?
  ogImage        MediaAsset? @relation("ProgramOgImage", fields: [ogImageId], references: [id], onDelete: SetNull)
  canonicalUrl   String?
  robotsIndex    Boolean @default(true)
  robotsFollow   Boolean @default(true)

  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  createdById String?
  createdBy   User? @relation("ProgramCreatedBy", fields: [createdById], references: [id], onDelete: SetNull)

  updatedById String?
  updatedBy   User? @relation("ProgramUpdatedBy", fields: [updatedById], references: [id], onDelete: SetNull)

  events Event[]

  @@index([status])
  @@index([featuredOnHome, homeOrder])
  @@index([publishedAt])
}

model Event {
  id                  String      @id @default(cuid())
  title               String
  slug                String      @unique
  excerpt             String
  content             Json?
  status              EventStatus @default(DRAFT)
  featuredOnHome      Boolean     @default(false)
  homeOrder           Int         @default(0)

  startsAt DateTime
  endsAt   DateTime?
  timezone String   @default("Europe/Bucharest")

  locationName String
  address      String?
  city         String?
  county       String?
  country      String? @default("România")
  mapUrl       String?

  maxParticipants     Int?
  registrationEnabled Boolean @default(false)
  registrationUrl     String?

  programId String?
  program   Program? @relation(fields: [programId], references: [id], onDelete: SetNull)

  imageId String?
  image   MediaAsset? @relation("EventImage", fields: [imageId], references: [id], onDelete: SetNull)

  seoTitle       String?
  seoDescription String?
  seoKeywords    String?
  ogTitle        String?
  ogDescription  String?
  ogImageId      String?
  ogImage        MediaAsset? @relation("EventOgImage", fields: [ogImageId], references: [id], onDelete: SetNull)
  canonicalUrl   String?
  robotsIndex    Boolean @default(true)
  robotsFollow   Boolean @default(true)

  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  createdById String?
  createdBy   User? @relation("EventCreatedBy", fields: [createdById], references: [id], onDelete: SetNull)

  updatedById String?
  updatedBy   User? @relation("EventUpdatedBy", fields: [updatedById], references: [id], onDelete: SetNull)

  registrations EventRegistration[]

  @@index([status])
  @@index([startsAt])
  @@index([featuredOnHome, homeOrder])
  @@index([programId])
}

model EventRegistration {
  id                String   @id @default(cuid())
  eventId           String
  event             Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
  name              String
  email             String
  phone             String?
  participantsCount Int      @default(1)
  message           String?
  consent           Boolean  @default(false)
  status            String   @default("NEW")
  internalNotes     String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([eventId])
  @@index([email])
  @@index([createdAt])
}

model GalleryAlbum {
  id             String        @id @default(cuid())
  title          String
  slug           String        @unique
  excerpt        String?
  description    Json?
  status         PublishStatus @default(DRAFT)
  featuredOnHome Boolean       @default(false)
  homeOrder      Int           @default(0)

  coverImageId String?
  coverImage   MediaAsset? @relation("GalleryAlbumCover", fields: [coverImageId], references: [id], onDelete: SetNull)

  seoTitle       String?
  seoDescription String?
  seoKeywords    String?
  canonicalUrl   String?
  robotsIndex    Boolean @default(true)
  robotsFollow   Boolean @default(true)

  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  images GalleryImage[]

  @@index([status])
  @@index([featuredOnHome, homeOrder])
  @@index([publishedAt])
}

model GalleryImage {
  id        String       @id @default(cuid())
  albumId   String
  album     GalleryAlbum @relation(fields: [albumId], references: [id], onDelete: Cascade)
  mediaId   String
  media     MediaAsset   @relation(fields: [mediaId], references: [id], onDelete: Cascade)
  altText   String?
  caption   String?
  sortOrder Int          @default(0)
  createdAt DateTime     @default(now())

  @@index([albumId, sortOrder])
  @@index([mediaId])
}

model ArticleCategory {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  articles Article[]
}

model Tag {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())

  articles ArticleTag[]
}

model Article {
  id             String        @id @default(cuid())
  title          String
  slug           String        @unique
  excerpt        String
  content        Json?
  status         PublishStatus @default(DRAFT)
  featuredOnHome Boolean       @default(false)
  homeOrder      Int           @default(0)

  coverImageId String?
  coverImage   MediaAsset? @relation("ArticleCoverImage", fields: [coverImageId], references: [id], onDelete: SetNull)

  authorId String?
  author   User? @relation("ArticleAuthor", fields: [authorId], references: [id], onDelete: SetNull)

  categoryId String?
  category   ArticleCategory? @relation(fields: [categoryId], references: [id], onDelete: SetNull)

  readingMinutes Int?

  seoTitle       String?
  seoDescription String?
  seoKeywords    String?
  focusKeyword   String?
  ogTitle        String?
  ogDescription  String?
  ogImageId      String?
  ogImage        MediaAsset? @relation("ArticleOgImage", fields: [ogImageId], references: [id], onDelete: SetNull)
  canonicalUrl   String?
  robotsIndex    Boolean @default(true)
  robotsFollow   Boolean @default(true)

  faqBlocks Json?
  relatedIds Json?

  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  tags ArticleTag[]

  @@index([status])
  @@index([featuredOnHome, homeOrder])
  @@index([publishedAt])
  @@index([categoryId])
}

model ArticleTag {
  articleId String
  article   Article @relation(fields: [articleId], references: [id], onDelete: Cascade)

  tagId String
  tag   Tag @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([articleId, tagId])
  @@index([tagId])
}

model Page {
  id       String        @id @default(cuid())
  key      String        @unique
  title    String
  slug     String        @unique
  excerpt  String?
  content  Json?
  template String?
  status   PublishStatus @default(DRAFT)

  seoTitle       String?
  seoDescription String?
  seoKeywords    String?
  ogTitle        String?
  ogDescription  String?
  ogImageId      String?
  ogImage        MediaAsset? @relation("PageOgImage", fields: [ogImageId], references: [id], onDelete: SetNull)
  canonicalUrl   String?
  robotsIndex    Boolean @default(true)
  robotsFollow   Boolean @default(true)

  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([status])
}

model DonationSettings {
  id             String   @id @default(cuid())
  title          String   @default("Donează pentru educație prin astronomie")
  slug           String   @unique @default("doneaza")
  excerpt        String?
  content        Json?
  bankName       String?
  iban           String?
  accountHolder  String?
  cui            String?
  recommendedAmounts Json?
  faqBlocks      Json?

  heroImageId String?
  heroImage   MediaAsset? @relation("DonationHeroImage", fields: [heroImageId], references: [id], onDelete: SetNull)

  seoTitle       String?
  seoDescription String?
  seoKeywords    String?
  ogTitle        String?
  ogDescription  String?
  ogImageId      String?
  ogImage        MediaAsset? @relation("DonationOgImage", fields: [ogImageId], references: [id], onDelete: SetNull)
  canonicalUrl   String?
  robotsIndex    Boolean @default(true)
  robotsFollow   Boolean @default(true)

  updatedAt DateTime @updatedAt
  createdAt DateTime @default(now())
}

model ContactSettings {
  id          String @id @default(cuid())
  title       String @default("Contact Star Sim")
  slug        String @unique @default("contact")
  introText   String?
  email       String?
  phone       String?
  address     String?
  city        String?
  country     String? @default("România")
  schedule    String?
  mapUrl      String?
  socialLinks Json?

  seoTitle       String?
  seoDescription String?
  seoKeywords    String?
  ogTitle        String?
  ogDescription  String?
  ogImageId      String?
  ogImage        MediaAsset? @relation("ContactOgImage", fields: [ogImageId], references: [id], onDelete: SetNull)
  canonicalUrl   String?
  robotsIndex    Boolean @default(true)
  robotsFollow   Boolean @default(true)

  updatedAt DateTime @updatedAt
  createdAt DateTime @default(now())
}

model ContactMessage {
  id            String               @id @default(cuid())
  name          String
  email         String
  phone         String?
  subject       String?
  type          ContactMessageType   @default(GENERAL)
  message       String
  status        ContactMessageStatus @default(NEW)
  internalNotes String?
  ipAddress     String?
  userAgent     String?
  createdAt     DateTime             @default(now())
  updatedAt     DateTime             @updatedAt

  @@index([status])
  @@index([type])
  @@index([createdAt])
  @@index([email])
}

model NewsletterSubscriber {
  id             String           @id @default(cuid())
  email          String           @unique
  name           String?
  status         NewsletterStatus @default(ACTIVE)
  source         String?
  consent        Boolean          @default(false)
  subscribedAt   DateTime         @default(now())
  unsubscribedAt DateTime?
  updatedAt      DateTime         @updatedAt

  @@index([status])
  @@index([subscribedAt])
}

model Partner {
  id             String        @id @default(cuid())
  name           String
  slug           String        @unique
  description    String?
  website        String?
  type           String?
  status         PublishStatus @default(DRAFT)
  featuredOnHome Boolean       @default(false)
  sortOrder      Int           @default(0)

  logoId String?
  logo   MediaAsset? @relation("PartnerLogo", fields: [logoId], references: [id], onDelete: SetNull)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status])
  @@index([featuredOnHome, sortOrder])
}

model Testimonial {
  id             String        @id @default(cuid())
  quote          String
  authorName     String
  authorRole     String?
  organization   String?
  status         PublishStatus @default(DRAFT)
  featuredOnHome Boolean       @default(false)
  sortOrder      Int           @default(0)

  imageId String?
  image   MediaAsset? @relation("TestimonialImage", fields: [imageId], references: [id], onDelete: SetNull)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status])
  @@index([featuredOnHome, sortOrder])
}

model Redirect {
  id         String             @id @default(cuid())
  sourcePath String             @unique
  targetPath String
  statusCode RedirectStatusCode @default(MOVED_PERMANENTLY)
  active     Boolean            @default(true)
  createdAt  DateTime           @default(now())
  updatedAt  DateTime           @updatedAt

  @@index([active])
}

model SiteSettings {
  id        String   @id @default(cuid())
  key       String   @unique
  value     Json
  updatedAt DateTime @updatedAt
  createdAt DateTime @default(now())
}
```

## Important Prisma notes

If Prisma rejects any relation name or relation field due to provider/version specifics, fix the schema while preserving these models and business intent.

Keep:

- `Json` fields for future Tiptap content
- direct SEO fields on public entities
- `MediaAsset` as central media library
- clear publish statuses
- audit log
- singleton-style settings for donation/contact

## Migration

After schema is valid, run:

```bash
pnpm prisma:generate
pnpm prisma:migrate --name init_cms_foundation
```

If the package script does not support naming, use direct Prisma CLI:

```bash
pnpm prisma migrate dev --name init_cms_foundation
```

## Seed first admin

Create `prisma/seed.ts`.

Requirements:

- Load env variables through `src/lib/env.ts` if possible.
- Hash `SEED_ADMIN_PASSWORD` with bcrypt.
- Upsert admin by `SEED_ADMIN_EMAIL`.
- Role must be `ADMIN`.
- Status must be `ACTIVE`.
- Do not create public sample content except minimal settings records.
- Create default `DonationSettings` singleton if missing.
- Create default `ContactSettings` singleton if missing.
- Create default `SiteSettings` keys:
  - `site.identity`
  - `site.social`
  - `site.navigation`

Seed behavior must be idempotent.

Pseudo-flow:

```ts
const email = env.SEED_ADMIN_EMAIL.toLowerCase();

const passwordHash = await hashPassword(env.SEED_ADMIN_PASSWORD);

await prisma.user.upsert({
  where: { email },
  update: {
    name: env.SEED_ADMIN_NAME,
    passwordHash,
    role: "ADMIN",
    status: "ACTIVE",
  },
  create: {
    email,
    name: env.SEED_ADMIN_NAME,
    passwordHash,
    role: "ADMIN",
    status: "ACTIVE",
  },
});
```

## Password helper

Create `src/server/auth/password.ts`:

- `hashPassword(password: string): Promise<string>`
- `verifyPassword(password: string, hash: string): Promise<boolean>`

Use bcryptjs.

## Completion criteria

The database schema must be migration-ready, Prisma client generated, and `pnpm db:seed` must create the first admin plus default settings.
