# Prompt 08 — Donation + Contact Admin

You are a senior Next.js full-stack engineer.

## Objective

Implement CMS admin for Donează and Contact, plus public forms and message management.

Do not implement tests.

## Donation admin route

Create/refine:

```txt
src/app/admin/donation/page.tsx
```

## Public donation route

Create/refine:

```txt
src/app/doneaza/page.tsx
```

## Donation settings fields

```txt
title
description
bankAccount
bankName
beneficiaryName
fiscalCode
recommendedAmounts JSON
content JSON
SEO fields
```

Recommended amounts JSON shape:

```ts
type RecommendedDonationAmount = {
  amount: number;
  label: string;
  impact: string;
};
```

Default examples:

```json
[
  {
    "amount": 50,
    "label": "Materiale pentru atelier",
    "impact": "Ajută la pregătirea materialelor educaționale pentru copii."
  },
  {
    "amount": 150,
    "label": "O grupă de copii",
    "impact": "Susține participarea unei grupe la o activitate Star Sim."
  },
  {
    "amount": 500,
    "label": "O seară de observații",
    "impact": "Contribuie la organizarea unei seri de observații astronomice."
  }
]
```

## Donation public page requirements

Visual direction:

- respect Star Sim mockup: white/navy/gold, premium, emotional
- hero:
  - “Susține educația prin astronomie”
  - short text from settings
  - primary CTA: “Donează prin transfer bancar”
- recommended amount cards
- bank transfer details in copy-friendly card
- impact explanation
- final CTA to contact for sponsorship/partnership

If payment processor is not configured, do not fake online payment.

## Contact settings admin route

Create/refine:

```txt
src/app/admin/contact/page.tsx
```

Fields:

```txt
email
phone
address
city
schedule
mapUrl
introText
facebookUrl
instagramUrl
youtubeUrl
tiktokUrl
linkedinUrl
SEO fields
```

## Contact messages admin routes

Create/refine:

```txt
src/app/admin/contact/messages/page.tsx
src/app/admin/contact/messages/[id]/page.tsx
```

Messages list:

- columns:
  - name
  - email
  - type
  - status
  - createdAt
  - actions
- filters:
  - search
  - status
  - type
- actions:
  - mark read
  - mark in progress
  - mark resolved
  - mark spam
  - add internal note

## Public contact route

Create/refine:

```txt
src/app/contact/page.tsx
```

Public contact page:

- title and intro from settings
- contact details
- social links
- map link/embed if provided
- contact form

Contact form fields:

```txt
name
email
phone optional
type
subject optional
message
```

Validation:

- name required
- valid email required
- message min 10
- type enum
- phone optional
- subject optional

Security:

- server-side validation
- rate limiting if helper exists from Etapa 1
- honeypot hidden field
- do not expose admin notes publicly
- store messages in ContactMessage
- optionally send email notification if SMTP env exists; fail gracefully if email is not configured

## Public form UX

- premium but simple
- clear success state:
  “Mulțumim! Mesajul tău a fost trimis.”
- no full page reload if current architecture supports server action state
- keep accessible labels

## Deliverables

- Donation settings admin
- public donation page
- Contact settings admin
- public contact page and form
- messages admin management
- no tests
