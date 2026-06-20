# Prompt 06 — Public Conversion Forms: Contact, Newsletter, Event Registration, Donation Lead

You are implementing public conversion flows for Star Sim.

Required files:
- src/app/(public)/contact/page.tsx
- src/app/(public)/doneaza/page.tsx
- src/app/(public)/implica-te/page.tsx if route exists
- src/app/(public)/parteneriate/page.tsx if route exists
- src/components/forms/ContactForm.tsx
- src/components/forms/NewsletterForm.tsx
- src/components/forms/EventRegistrationForm.tsx
- src/components/forms/DonationLeadForm.tsx
- src/components/forms/PartnerInquiryForm.tsx
- src/lib/actions/contact.ts
- src/lib/actions/newsletter.ts
- src/lib/actions/event-registration.ts
- src/lib/actions/donation-lead.ts
- src/lib/actions/partner-inquiry.ts
- src/lib/validation/public-forms.ts
- src/lib/rate-limit.ts if not existing

General rules:
- Use server actions if project already uses them; otherwise API routes.
- Validate all input server-side with Zod if installed or add Zod.
- Add honeypot field to public forms.
- Add simple rate limiting per IP/action if infrastructure supports it.
- Never trust client validation only.
- Do not add captcha unless explicitly requested.
- No testing instructions.

Contact page:
- Title: "Scrie-ne"
- Intro with warm but professional tone.
- Show contact details from SiteSettings:
  email
  phone
  address
  schedule
  social links
- ContactForm fields:
  name
  email
  phone optional
  subject
  requestType: general / eveniment / program / voluntariat / parteneriat / donație
  message
  consent checkbox
  honeypot hidden
- On submit:
  create ContactMessage in database
  send email notification if email utility exists; otherwise leave integration-ready comment
  show success message:
  "Mulțumim. Mesajul tău a ajuns la noi."
- Add contextual default requestType from query params.

NewsletterForm:
- Fields:
  email
  firstName optional
  consent checkbox
  honeypot
- On submit:
  create NewsletterSubscriber or update existing subscription status.
  Avoid duplicate errors shown to user; use friendly message.
- Footer uses this form compactly.

EventRegistrationForm:
- Used on event detail page when registrationActive.
- Fields:
  name
  email
  phone optional
  participantsCount
  childAge optional
  notes optional
  consent checkbox
  honeypot
- On submit:
  validate event exists, published, registrationActive.
  if maxParticipants exists, check approximate capacity.
  create EventRegistration or ContactMessage depending existing schema.
- If schema lacks EventRegistration, add a minimal Prisma model carefully:
  id, eventId, name, email, phone, participantsCount, childAge, notes, status, createdAt.
  Do not break migrations.
- Friendly success state.

Donation page:
- Must not require payment integration yet unless existing.
- Render DonationSettings from CMS:
  title
  intro
  IBAN
  organization name
  CUI
  bank
  recommended amounts
  impact messages
  FAQ
- Add DonationLeadForm optional:
  name
  email
  donationType: individual / company
  amountIntent optional
  message optional
  consent
- CTA:
  "Donează prin transfer bancar"
  "Vreau să discut despre sponsorizare"
- For companies:
  link to /parteneriate or section anchor.

Partner inquiry:
- Company-focused form:
  companyName
  contactName
  email
  phone optional
  partnershipType
  message
  consent
- Save as ContactMessage with type parteneriat or dedicated model if it exists.

UX requirements:
- Form controls must be premium:
  rounded-xl
  border #E7E0D2
  focus navy/gold ring
  clear error states
- Submit button must indicate loading state.
- Success state should be elegant and calm.
- No ugly browser default UI.
- Mobile forms must be easy to complete.

Security:
- Sanitize all text.
- Enforce field length limits.
- Do not log sensitive form data.
- Store consent timestamp if schema supports it.

Do not include tests.
