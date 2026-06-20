import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/server/auth/password";

const prisma = new PrismaClient();

const doc = (text: string) => ({
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text }] }]
});

async function main() {
  const isProduction = process.env.NODE_ENV === "production" || process.argv.includes("--production");
  const email = (process.env.SEED_ADMIN_EMAIL || "").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD || "";
  const name = process.env.SEED_ADMIN_NAME || "";

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

  const programs = [
    ["Ateliere pentru copii", "ateliere-pentru-copii", "Invatam prin joc, experimente si povesti despre stele.", "graduation"],
    ["Caravana Stelelor", "caravana-stelelor", "Aducem astronomia in scoli si comunitati din toata tara.", "bus"],
    ["Observatii astronomice", "observatii-astronomice", "Seri magice sub cerul liber, deschise tuturor.", "telescope"],
    ["Educatie STEM", "educatie-stem", "Proiecte care dezvolta gandirea stiintifica si creativitatea.", "atom"]
  ];

  for (const [title, slug, excerpt, icon] of programs) {
    await prisma.program.upsert({
      where: { slug },
      update: { title, excerpt, icon, status: "PUBLISHED", featuredOnHome: true, publishedAt: new Date() },
      create: { title, slug, excerpt, icon, content: doc(excerpt), status: "PUBLISHED", featuredOnHome: true, publishedAt: new Date() }
    });
  }

  const events = [
    ["Noapte de observatii la Padurea Baneasa", "noapte-observatii-padurea-baneasa", 24, "Padurea Baneasa, Bucuresti"],
    ["Atelier: Sistemul Solar pentru copii", "atelier-sistemul-solar-copii", 7, "Biblioteca Metropolitana"],
    ["Caravana Stelelor - Iasi", "caravana-stelelor-iasi", 21, "Colegiul National Iasi"],
    ["Noapte de observatii la munte", "noapte-observatii-la-munte", 28, "Cabana Piatra Arsa"]
  ];

  const year = new Date().getFullYear() + 1;
  for (const [title, slug, day, locationName] of events) {
    await prisma.event.upsert({
      where: { slug: String(slug) },
      update: { title: String(title), locationName: String(locationName), status: "PUBLISHED", featuredOnHome: true },
      create: {
        title: String(title),
        slug: String(slug),
        excerpt: "O intalnire pentru copii si familii sub cerul instelat.",
        content: doc("Ne bucuram de cer, intrebari curajoase si descoperiri ghidate de echipa Star Sim."),
        startsAt: new Date(`${year}-06-${String(day).padStart(2, "0")}T18:00:00+03:00`),
        locationName: String(locationName),
        city: "Bucuresti",
        status: "PUBLISHED",
        featuredOnHome: true,
        registrationEnabled: true,
        publishedAt: new Date()
      }
    });
  }

  await prisma.donationSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      title: "Sustine educatia prin astronomie",
      description: "Donatiile ajuta la finantarea atelierelor, materialelor si evenimentelor pentru copii.",
      bankAccount: "RO00 BANK 0000 0000 0000 0000",
      bankName: "Banca Exemplu",
      beneficiaryName: "Asociatia Star Sim",
      fiscalCode: "00000000",
      recommendedAmounts: [
        { amount: 50, label: "Materiale pentru atelier", impact: "Ajuta la pregatirea materialelor educationale." },
        { amount: 150, label: "O grupa de copii", impact: "Sustine participarea unei grupe la o activitate Star Sim." },
        { amount: 500, label: "O seara de observatii", impact: "Contribuie la organizarea unei seri astronomice." }
      ]
    }
  });

  await prisma.contactSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      email: "contact@starsim.ro",
      phone: "+40 723 123 456",
      address: "Bucuresti, Romania",
      city: "Bucuresti",
      schedule: "Luni - Vineri, 10:00 - 18:00",
      introText: "Scrie-ne pentru programe, evenimente, voluntariat sau parteneriate."
    }
  });

  await prisma.auditLog.create({
    data: { actorId: admin.id, action: "SEED", entity: "System", metadata: { message: "Seed initial Star Sim" } }
  });
}

main().finally(async () => prisma.$disconnect());
