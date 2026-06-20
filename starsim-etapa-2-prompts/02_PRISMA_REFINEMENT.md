# Prompt 02 — Prisma Refinement for Etapa 2 CMS

You are a senior database architect and Prisma engineer.

## Objective

Refine the Prisma schema for Star Sim CMS modules required in Etapa 2.

Do not implement tests.

## Requirements

Update `prisma/schema.prisma` to support:

- Programs
- Events
- Gallery albums
- Media assets
- Articles
- Donation settings
- Contact settings
- Contact messages
- Newsletter subscribers, if not already present
- SEO fields on public entities
- Audit log integration, if present from Etapa 1

Do not over-engineer polymorphic SEO in this phase. Add direct SEO fields to each public entity.

## Enums

Add or reuse:

```prisma
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
  VOLUNTEERING
  PARTNERSHIP
  DONATION
  SCHOOL
}

enum MediaType {
  IMAGE
  VIDEO
  DOCUMENT
}
```

## MediaAsset model

```prisma
model MediaAsset {
  id          String    @id @default(cuid())
  type        MediaType @default(IMAGE)
  url         String
  storageKey  String?
  filename    String
  mimeType    String
  size        Int
  width       Int?
  height      Int?
  alt         String?
  caption     String?
  credit      String?

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  programsHero Program[] @relation("ProgramHeroImage")
  eventsHero   Event[]   @relation("EventHeroImage")
  articlesHero Article[] @relation("ArticleHeroImage")
  albumsCover  GalleryAlbum[] @relation("GalleryAlbumCover")
  albumItems   GalleryImage[]
}
```

Adapt relations if existing schema differs.

## Program model

```prisma
model Program {
  id               String        @id @default(cuid())
  title            String
  slug             String        @unique
  excerpt          String
  content          Json?
  icon             String?
  category         String?
  ctaLabel         String?
  ctaHref          String?

  heroImageId      String?
  heroImage        MediaAsset?   @relation("ProgramHeroImage", fields: [heroImageId], references: [id], onDelete: SetNull)

  status           PublishStatus @default(DRAFT)
  featuredOnHome   Boolean       @default(false)
  sortOrder        Int           @default(0)
  publishedAt      DateTime?

  metaTitle        String?
  metaDescription  String?
  ogTitle          String?
  ogDescription    String?
  ogImageId        String?
  canonicalUrl     String?
  robotsIndex      Boolean       @default(true)
  robotsFollow     Boolean       @default(true)

  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  events           Event[]
  galleryAlbums    GalleryAlbum[]

  @@index([status, featuredOnHome, sortOrder])
}
```

## Event model

```prisma
model Event {
  id               String      @id @default(cuid())
  title            String
  slug             String      @unique
  excerpt          String
  content          Json?

  startsAt         DateTime
  endsAt           DateTime?
  locationName     String
  address          String?
  city             String?
  mapUrl           String?
  maxParticipants  Int?
  registrationUrl  String?
  registrationEnabled Boolean  @default(false)

  heroImageId      String?
  heroImage        MediaAsset? @relation("EventHeroImage", fields: [heroImageId], references: [id], onDelete: SetNull)

  programId        String?
  program          Program?    @relation(fields: [programId], references: [id], onDelete: SetNull)

  status           EventStatus @default(DRAFT)
  featuredOnHome   Boolean     @default(false)
  sortOrder        Int         @default(0)
  publishedAt      DateTime?

  metaTitle        String?
  metaDescription  String?
  ogTitle          String?
  ogDescription    String?
  ogImageId        String?
  canonicalUrl     String?
  robotsIndex      Boolean     @default(true)
  robotsFollow     Boolean     @default(true)

  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt

  galleryAlbums    GalleryAlbum[]

  @@index([status, startsAt])
  @@index([status, featuredOnHome, startsAt])
}
```

## GalleryAlbum and GalleryImage

```prisma
model GalleryAlbum {
  id               String        @id @default(cuid())
  title            String
  slug             String        @unique
  description      String?
  content          Json?

  coverImageId     String?
  coverImage       MediaAsset?   @relation("GalleryAlbumCover", fields: [coverImageId], references: [id], onDelete: SetNull)

  programId        String?
  program          Program?      @relation(fields: [programId], references: [id], onDelete: SetNull)

  eventId          String?
  event            Event?        @relation(fields: [eventId], references: [id], onDelete: SetNull)

  status           PublishStatus @default(DRAFT)
  featuredOnHome   Boolean       @default(false)
  sortOrder        Int           @default(0)
  publishedAt      DateTime?

  metaTitle        String?
  metaDescription  String?
  ogTitle          String?
  ogDescription    String?
  ogImageId        String?
  canonicalUrl     String?
  robotsIndex      Boolean       @default(true)
  robotsFollow     Boolean       @default(true)

  images           GalleryImage[]

  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  @@index([status, featuredOnHome, sortOrder])
}

model GalleryImage {
  id          String      @id @default(cuid())
  albumId     String
  album       GalleryAlbum @relation(fields: [albumId], references: [id], onDelete: Cascade)

  mediaId     String
  media       MediaAsset   @relation(fields: [mediaId], references: [id], onDelete: Cascade)

  alt         String?
  caption     String?
  sortOrder   Int          @default(0)

  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  @@unique([albumId, mediaId])
  @@index([albumId, sortOrder])
}
```

## Article model

```prisma
model Article {
  id               String        @id @default(cuid())
  title            String
  slug             String        @unique
  excerpt          String
  content          Json

  authorName       String?
  category         String?
  tags             String[]      @default([])

  heroImageId      String?
  heroImage        MediaAsset?   @relation("ArticleHeroImage", fields: [heroImageId], references: [id], onDelete: SetNull)

  status           PublishStatus @default(DRAFT)
  featuredOnHome   Boolean       @default(false)
  publishedAt      DateTime?

  focusKeyword     String?
  metaTitle        String?
  metaDescription  String?
  ogTitle          String?
  ogDescription    String?
  ogImageId        String?
  canonicalUrl     String?
  robotsIndex      Boolean       @default(true)
  robotsFollow     Boolean       @default(true)

  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  @@index([status, publishedAt])
  @@index([category])
}
```

If PostgreSQL array support is available, `String[]` is fine. Otherwise model tags separately. Use PostgreSQL.

## Singleton settings

```prisma
model DonationSettings {
  id                String   @id @default("default")
  title             String   @default("Susține Star Sim")
  description       String?
  bankAccount       String?
  bankName          String?
  beneficiaryName   String?
  fiscalCode        String?
  recommendedAmounts Json?
  content           Json?

  metaTitle         String?
  metaDescription   String?
  ogTitle           String?
  ogDescription     String?
  ogImageId         String?
  canonicalUrl      String?
  robotsIndex       Boolean  @default(true)
  robotsFollow      Boolean  @default(true)

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model ContactSettings {
  id                String   @id @default("default")
  email             String?
  phone             String?
  address           String?
  city              String?
  schedule          String?
  mapUrl            String?
  introText         String?
  facebookUrl       String?
  instagramUrl      String?
  youtubeUrl        String?
  tiktokUrl         String?
  linkedinUrl       String?

  metaTitle         String?
  metaDescription   String?
  ogTitle           String?
  ogDescription     String?
  ogImageId         String?
  canonicalUrl      String?
  robotsIndex       Boolean  @default(true)
  robotsFollow      Boolean  @default(true)

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model ContactMessage {
  id          String               @id @default(cuid())
  name        String
  email       String
  phone       String?
  type        ContactMessageType   @default(GENERAL)
  subject     String?
  message     String
  status      ContactMessageStatus @default(NEW)
  internalNote String?

  createdAt   DateTime             @default(now())
  updatedAt   DateTime             @updatedAt

  @@index([status, createdAt])
  @@index([type])
}
```

## After schema update

Run:

```bash
npx prisma format
npx prisma migrate dev --name etapa_2_cms_modules
npx prisma generate
```

Do not add test commands.

## Seed update

Update seed to include:

- 4 programs matching the mockup
- 4 events matching the mockup
- default DonationSettings
- default ContactSettings

Use placeholder image references only if actual media assets exist. Otherwise leave image relations null and let UI show fallback image assets from `/public`.
