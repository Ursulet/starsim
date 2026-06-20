-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR', 'VOLUNTEER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "ContactMessageStatus" AS ENUM ('NEW', 'READ', 'IN_PROGRESS', 'RESOLVED', 'SPAM');

-- CreateEnum
CREATE TYPE "ContactMessageType" AS ENUM ('GENERAL', 'EVENT', 'VOLUNTEERING', 'PARTNERSHIP', 'DONATION', 'SCHOOL');

-- CreateEnum
CREATE TYPE "NewsletterStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED', 'BOUNCED');

-- CreateEnum
CREATE TYPE "RedirectStatusCode" AS ENUM ('MOVED_PERMANENTLY', 'FOUND');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EDITOR',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "image" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "type" "MediaType" NOT NULL DEFAULT 'IMAGE',
    "url" TEXT NOT NULL,
    "storageKey" TEXT,
    "filename" TEXT NOT NULL,
    "originalName" TEXT,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT,
    "caption" TEXT,
    "credit" TEXT,
    "folder" TEXT,
    "uploadedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" JSONB,
    "icon" TEXT,
    "category" TEXT,
    "ctaLabel" TEXT,
    "ctaHref" TEXT,
    "heroImageId" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "featuredOnHome" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "canonicalUrl" TEXT,
    "robotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "robotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" JSONB,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Bucharest',
    "locationName" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "county" TEXT,
    "country" TEXT DEFAULT 'Romania',
    "mapUrl" TEXT,
    "maxParticipants" INTEGER,
    "registrationUrl" TEXT,
    "registrationEnabled" BOOLEAN NOT NULL DEFAULT false,
    "heroImageId" TEXT,
    "programId" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "featuredOnHome" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "canonicalUrl" TEXT,
    "robotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "robotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRegistration" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "participantsCount" INTEGER NOT NULL DEFAULT 1,
    "childAge" TEXT,
    "notes" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryAlbum" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "content" JSONB,
    "coverImageId" TEXT,
    "programId" TEXT,
    "eventId" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "featuredOnHome" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "canonicalUrl" TEXT,
    "robotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "robotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "alt" TEXT,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "authorName" TEXT,
    "category" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "heroImageId" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "featuredOnHome" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "focusKeyword" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "canonicalUrl" TEXT,
    "robotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "robotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" JSONB,
    "template" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "canonicalUrl" TEXT,
    "robotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "robotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "title" TEXT NOT NULL DEFAULT 'Sustine Star Sim',
    "description" TEXT,
    "bankAccount" TEXT,
    "bankName" TEXT,
    "beneficiaryName" TEXT,
    "fiscalCode" TEXT,
    "recommendedAmounts" JSONB,
    "content" JSONB,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "canonicalUrl" TEXT,
    "robotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "robotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonationSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "schedule" TEXT,
    "mapUrl" TEXT,
    "introText" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "youtubeUrl" TEXT,
    "tiktokUrl" TEXT,
    "linkedinUrl" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "canonicalUrl" TEXT,
    "robotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "robotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "type" "ContactMessageType" NOT NULL DEFAULT 'GENERAL',
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" "ContactMessageStatus" NOT NULL DEFAULT 'NEW',
    "internalNote" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "status" "NewsletterStatus" NOT NULL DEFAULT 'ACTIVE',
    "source" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "type" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "featuredOnHome" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "logoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT,
    "organization" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "featuredOnHome" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "imageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redirect" (
    "id" TEXT NOT NULL,
    "sourcePath" TEXT NOT NULL,
    "targetPath" TEXT NOT NULL,
    "statusCode" "RedirectStatusCode" NOT NULL DEFAULT 'MOVED_PERMANENTLY',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Redirect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "MediaAsset_type_idx" ON "MediaAsset"("type");

-- CreateIndex
CREATE INDEX "MediaAsset_mimeType_idx" ON "MediaAsset"("mimeType");

-- CreateIndex
CREATE INDEX "MediaAsset_createdAt_idx" ON "MediaAsset"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");

-- CreateIndex
CREATE INDEX "Program_status_featuredOnHome_sortOrder_idx" ON "Program"("status", "featuredOnHome", "sortOrder");

-- CreateIndex
CREATE INDEX "Program_publishedAt_idx" ON "Program"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_status_startsAt_idx" ON "Event"("status", "startsAt");

-- CreateIndex
CREATE INDEX "Event_status_featuredOnHome_startsAt_idx" ON "Event"("status", "featuredOnHome", "startsAt");

-- CreateIndex
CREATE INDEX "Event_programId_idx" ON "Event"("programId");

-- CreateIndex
CREATE INDEX "EventRegistration_eventId_idx" ON "EventRegistration"("eventId");

-- CreateIndex
CREATE INDEX "EventRegistration_email_idx" ON "EventRegistration"("email");

-- CreateIndex
CREATE INDEX "EventRegistration_createdAt_idx" ON "EventRegistration"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "GalleryAlbum_slug_key" ON "GalleryAlbum"("slug");

-- CreateIndex
CREATE INDEX "GalleryAlbum_status_featuredOnHome_sortOrder_idx" ON "GalleryAlbum"("status", "featuredOnHome", "sortOrder");

-- CreateIndex
CREATE INDEX "GalleryImage_albumId_sortOrder_idx" ON "GalleryImage"("albumId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "GalleryImage_albumId_mediaId_key" ON "GalleryImage"("albumId", "mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_status_publishedAt_idx" ON "Article"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "Article_category_idx" ON "Article"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Page_key_key" ON "Page"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_status_idx" ON "Page"("status");

-- CreateIndex
CREATE INDEX "ContactMessage_status_createdAt_idx" ON "ContactMessage"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ContactMessage_type_idx" ON "ContactMessage"("type");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_status_idx" ON "NewsletterSubscriber"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_slug_key" ON "Partner"("slug");

-- CreateIndex
CREATE INDEX "Partner_status_idx" ON "Partner"("status");

-- CreateIndex
CREATE INDEX "Partner_featuredOnHome_sortOrder_idx" ON "Partner"("featuredOnHome", "sortOrder");

-- CreateIndex
CREATE INDEX "Testimonial_status_idx" ON "Testimonial"("status");

-- CreateIndex
CREATE INDEX "Testimonial_featuredOnHome_sortOrder_idx" ON "Testimonial"("featuredOnHome", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Redirect_sourcePath_key" ON "Redirect"("sourcePath");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSettings_key_key" ON "SiteSettings"("key");

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_heroImageId_fkey" FOREIGN KEY ("heroImageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_heroImageId_fkey" FOREIGN KEY ("heroImageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryAlbum" ADD CONSTRAINT "GalleryAlbum_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryAlbum" ADD CONSTRAINT "GalleryAlbum_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryAlbum" ADD CONSTRAINT "GalleryAlbum_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "GalleryAlbum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "MediaAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_heroImageId_fkey" FOREIGN KEY ("heroImageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

