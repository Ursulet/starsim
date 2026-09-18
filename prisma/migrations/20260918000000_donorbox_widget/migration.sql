-- Migration: donorbox_widget
-- Adaugă câmpuri pentru integrarea Donorbox widget și conținut editorial campanie

ALTER TABLE "DonationSettings"
  ADD COLUMN IF NOT EXISTS "donorboxEnabled"      BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "donorboxTitle"         TEXT,
  ADD COLUMN IF NOT EXISTS "donorboxEmbedCode"     TEXT,
  ADD COLUMN IF NOT EXISTS "donorboxMeterEnabled"  BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "donorboxMeterCode"     TEXT,
  ADD COLUMN IF NOT EXISTS "campaignTitle"         TEXT,
  ADD COLUMN IF NOT EXISTS "campaignBody"          TEXT,
  ADD COLUMN IF NOT EXISTS "campaignGoal"          TEXT;
