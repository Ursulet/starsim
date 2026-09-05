import { Prisma, PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/server/auth/password";
import { legalDefinitionToTiptap, legalPageDefaults } from "../src/lib/legal-pages";
import { defaultHomepageSettings } from "../src/lib/homepage-settings";
import { applyRomanianDiacritics, applyRomanianDiacriticsDeep } from "../src/lib/romanian-diacritics";

const prisma = new PrismaClient();

const doc = (text: string) => ({
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text }] }]
});

function normalizeNullableJson(value: Prisma.JsonValue) {
  if (value === null) return Prisma.JsonNull;

  return applyRomanianDiacriticsDeep(value) as Prisma.InputJsonValue;
}

async function normalizeExistingRomanianCopy() {
  const programs = await prisma.program.findMany({ select: { id: true, title: true, excerpt: true, content: true } });
  for (const item of programs) {
    await prisma.program.update({
      where: { id: item.id },
      data: {
        title: applyRomanianDiacritics(item.title),
        excerpt: applyRomanianDiacritics(item.excerpt),
        content: normalizeNullableJson(item.content)
      }
    });
  }

  const events = await prisma.event.findMany({ select: { id: true, title: true, excerpt: true, content: true, locationName: true, address: true, city: true } });
  for (const item of events) {
    await prisma.event.update({
      where: { id: item.id },
      data: {
        title: applyRomanianDiacritics(item.title),
        excerpt: applyRomanianDiacritics(item.excerpt),
        content: normalizeNullableJson(item.content),
        locationName: applyRomanianDiacritics(item.locationName),
        address: item.address ? applyRomanianDiacritics(item.address) : null,
        city: item.city ? applyRomanianDiacritics(item.city) : null
      }
    });
  }

  const pages = await prisma.page.findMany({ select: { id: true, title: true, excerpt: true, content: true, metaTitle: true, metaDescription: true } });
  for (const item of pages) {
    await prisma.page.update({
      where: { id: item.id },
      data: {
        title: applyRomanianDiacritics(item.title),
        excerpt: item.excerpt ? applyRomanianDiacritics(item.excerpt) : null,
        content: normalizeNullableJson(item.content),
        metaTitle: item.metaTitle ? applyRomanianDiacritics(item.metaTitle) : null,
        metaDescription: item.metaDescription ? applyRomanianDiacritics(item.metaDescription) : null
      }
    });
  }

  const donation = await prisma.donationSettings.findUnique({ where: { id: "default" } });
  if (donation) {
    await prisma.donationSettings.update({
      where: { id: "default" },
      data: {
        title: applyRomanianDiacritics(donation.title),
        description: donation.description ? applyRomanianDiacritics(donation.description) : null,
        recommendedAmounts: normalizeNullableJson(donation.recommendedAmounts)
      }
    });
  }

  const contact = await prisma.contactSettings.findUnique({ where: { id: "default" } });
  if (contact) {
    await prisma.contactSettings.update({
      where: { id: "default" },
      data: {
        address: contact.address ? applyRomanianDiacritics(contact.address) : null,
        city: contact.city ? applyRomanianDiacritics(contact.city) : null,
        introText: contact.introText ? applyRomanianDiacritics(contact.introText) : null,
        footerDescription: contact.footerDescription ? applyRomanianDiacritics(contact.footerDescription) : null,
        footerCopyright: contact.footerCopyright ? applyRomanianDiacritics(contact.footerCopyright) : null
      }
    });
  }

  const homepage = await prisma.siteSettings.findUnique({ where: { key: "homepage" } });
  if (homepage) {
    await prisma.siteSettings.update({
      where: { key: "homepage" },
      data: { value: normalizeNullableJson(homepage.value) }
    });
  }
}

function cleanEnvValue(value: string) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

async function main() {
  const isProduction = process.env.NODE_ENV === "production" || process.argv.includes("--production");
  const email = cleanEnvValue(process.env.SEED_ADMIN_EMAIL || "").toLowerCase();
  const password = cleanEnvValue(process.env.SEED_ADMIN_PASSWORD || "");
  const name = cleanEnvValue(process.env.SEED_ADMIN_NAME || "");

  if (isProduction && (!email || !password || !name)) {
    throw new Error("Missing SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD or SEED_ADMIN_NAME in production.");
  }

  if (isProduction && password.length < 12) {
    throw new Error("SEED_ADMIN_PASSWORD must be at least 12 characters in production.");
  }

  const adminEmail = email || "admin@starsim.ro";
  const adminPassword = password || "change-this-password";
  const adminName = name || "Star Sim Admin";
  const adminPasswordHash = await hashPassword(adminPassword);
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  const forcePasswordUpdate = process.env.SEED_ADMIN_FORCE_PASSWORD_UPDATE === "true";

  const admin = existingAdmin
    ? await prisma.user.update({
        where: { email: adminEmail },
        data: {
          name: adminName,
          role: "ADMIN",
          status: "ACTIVE",
          ...(forcePasswordUpdate ? { passwordHash: adminPasswordHash } : {})
        }
      })
    : await prisma.user.create({
        data: {
          email: adminEmail,
          name: adminName,
          passwordHash: adminPasswordHash,
          role: "ADMIN",
          status: "ACTIVE"
        }
      });

  const alreadySeeded = (await prisma.auditLog.findFirst({ where: { action: "SEED" } })) || (await prisma.program.count() > 0);

  if (!alreadySeeded) {
    const programs = [
      ["Ateliere pentru copii", "ateliere-pentru-copii", "Învățăm prin joc, experimente și povești despre stele.", "graduation"],
      ["Caravana Stelelor", "caravana-stelelor", "Aducem astronomia în școli și comunități din toată țara.", "bus"],
      ["Observații astronomice", "observatii-astronomice", "Seri magice sub cerul liber, deschise tuturor.", "telescope"],
      ["Educație STEM", "educatie-stem", "Proiecte care dezvoltă gândirea științifică și creativitatea.", "atom"]
    ];

    for (const [title, slug, excerpt, icon] of programs) {
      await prisma.program.upsert({
        where: { slug },
        update: { title, excerpt, icon, status: "PUBLISHED", featuredOnHome: true, publishedAt: new Date() },
        create: { title, slug, excerpt, icon, content: doc(excerpt), status: "PUBLISHED", featuredOnHome: true, publishedAt: new Date() }
      });
    }

    const events = [
      ["Noapte de observații la Pădurea Băneasa", "noapte-observatii-padurea-baneasa", 24, "Pădurea Băneasa, București"],
      ["Atelier: Sistemul Solar pentru copii", "atelier-sistemul-solar-copii", 7, "Biblioteca Metropolitană"],
      ["Caravana Stelelor - Iași", "caravana-stelelor-iasi", 21, "Colegiul Național Iași"],
      ["Noapte de observații la munte", "noapte-observatii-la-munte", 28, "Cabana Piatra Arsă"]
    ];

    const year = new Date().getFullYear() + 1;
    for (const [title, slug, day, locationName] of events) {
      await prisma.event.upsert({
        where: { slug: String(slug) },
        update: { title: String(title), locationName: String(locationName), status: "PUBLISHED", featuredOnHome: true },
        create: {
          title: String(title),
          slug: String(slug),
          excerpt: "O întâlnire pentru copii și familii sub cerul înstelat.",
          content: doc("Ne bucurăm de cer, întrebări curajoase și descoperiri ghidate de echipa Star Sim."),
          startsAt: new Date(`${year}-06-${String(day).padStart(2, "0")}T18:00:00+03:00`),
          locationName: String(locationName),
          city: "București",
          status: "PUBLISHED",
          featuredOnHome: true,
          registrationEnabled: true,
          publishedAt: new Date()
        }
      });
    }

    await prisma.donationSettings.upsert({
      where: { id: "default" },
      update: {
        bankAccount: "RO05 RNCB 0296 1871 7895 0001",
        bankName: "Banca Comercială Română (BCR)",
        beneficiaryName: "Asociația Star Sim",
        fiscalCode: "55521510"
      },
      create: {
        id: "default",
        title: "Susține educația prin astronomie",
        description: "Donațiile ajută la finanțarea atelierelor, materialelor și evenimentelor pentru copii.",
        bankAccount: "RO05 RNCB 0296 1871 7895 0001",
        bankName: "Banca Comercială Română (BCR)",
        beneficiaryName: "Asociația Star Sim",
        fiscalCode: "55521510",
        recommendedAmounts: [
          { amount: 50, label: "Materiale pentru atelier", impact: "Ajută la pregătirea materialelor educaționale." },
          { amount: 150, label: "O grupă de copii", impact: "Susține participarea unei grupe la o activitate Star Sim." },
          { amount: 500, label: "O seară de observații", impact: "Contribuie la organizarea unei seri astronomice." }
        ]
      }
    });

    await prisma.contactSettings.upsert({
      where: { id: "default" },
      update: {},
      create: {
        id: "default",
        email: "contact@starsim.ro",
        phone: "+40 730 991 523",
        address: "Str. Viceamiral Ioan Murgescu 56, Constanța, România",
        city: "Constanța",
        schedule: "Luni - Vineri, 10:00 - 18:00",
        introText: "Scrie-ne pentru programe, evenimente, voluntariat sau parteneriate.",
        footerDescription: "Asociație dedicată promovării astronomiei, educației științifice și inspirării copiilor să viseze mai departe.",
        footerCopyright: "De la o stea, la un vis. Toate drepturile rezervate."
      }
    });

    for (const page of legalPageDefaults) {
      await prisma.page.upsert({
        where: { key: page.key },
        update: {
          title: page.title,
          slug: page.slug,
          excerpt: page.excerpt,
          content: legalDefinitionToTiptap(page),
          metaTitle: `${page.title} | Asociația Star Sim`,
          metaDescription: page.excerpt
        },
        create: {
          key: page.key,
          title: page.title,
          slug: page.slug,
          excerpt: page.excerpt,
          content: legalDefinitionToTiptap(page),
          template: "legal",
          status: "PUBLISHED",
          publishedAt: new Date(),
          metaTitle: `${page.title} | Asociația Star Sim`,
          metaDescription: page.excerpt
        }
      });
    }

    await prisma.siteSettings.upsert({
      where: { key: "homepage" },
      update: {},
      create: {
        key: "homepage",
        value: defaultHomepageSettings
      }
    });

    await prisma.auditLog.create({
      data: { actorId: admin.id, action: "SEED", entity: "System", metadata: { message: "Seed initial Star Sim" } }
    });
  }

  await normalizeExistingRomanianCopy();
}

main().finally(async () => prisma.$disconnect());
