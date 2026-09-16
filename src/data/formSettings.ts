/**
 * What happens after a visitor submits a form.
 *
 * Three things follow every submission: a row an operator can read in the
 * admin console, a page the visitor lands on, and two emails — one telling the
 * team, one thanking the person who wrote in. All three used to be either
 * hardcoded, missing, or faked in the browser; this record is the single place
 * an operator changes any of them.
 *
 * The copy lives here. The design does not: an email template is markup, and
 * markup typed into an admin textarea is markup nobody reviews. The templates
 * in src/lib/emailTemplates.ts take these strings and place them.
 */

/** The forms a visitor can submit. */
export const FORM_KINDS = ["contact", "newsletter"] as const;
export type FormKind = (typeof FORM_KINDS)[number];

export const FORM_KIND_LABELS: Record<FormKind, string> = {
  contact: "Contact enquiry",
  newsletter: "Newsletter signup",
};

/** Where a visitor lands once the submission is stored. */
export interface ThankYouContent {
  /** Small label above the headline. */
  eyebrow: string;
  headline: string;
  /** Rendered in the accent colour, immediately after the headline. */
  headlineHighlight: string;
  subhead: string;
  /**
   * What happens next, as a short numbered list. Three is the readable
   * maximum; the page renders however many are here.
   */
  steps: ThankYouStep[];
  /** Reassurance under the steps, e.g. an SLA. Optional. */
  responseNote: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  /** Shows the stored record's id so a visitor can quote it. */
  showReference: boolean;
  referenceLabel: string;
}

export interface ThankYouStep {
  id: string;
  title: string;
  description: string;
  /** Name from the icon registry. A DB string cannot be a component. */
  iconName: string;
}

/** The acknowledgement sent to whoever filled the form in. */
export interface VisitorEmailContent {
  enabled: boolean;
  /** `{{name}}` and `{{siteName}}` are substituted. */
  subject: string;
  heading: string;
  /** First paragraph. Supports `{{name}}`. */
  intro: string;
  /** Bullets under the intro — what they can expect. */
  highlights: string[];
  /** Closing paragraph above the signature. */
  outro: string;
  ctaLabel: string;
  ctaHref: string;
  signOff: string;
  signature: string;
}

/** The alert sent to the team. */
export interface TeamEmailContent {
  enabled: boolean;
  /** `{{name}}`, `{{email}}` and `{{kind}}` are substituted. */
  subject: string;
  heading: string;
  intro: string;
  /**
   * Extra addresses for this form specifically, on top of the shared
   * recipients below. Useful when sales wants the quotes and nobody else does.
   */
  extraRecipients: string[];
}

export interface FormFlow {
  /** Off means the form still stores the submission but sends no email. */
  notifyTeam: boolean;
  notifyVisitor: boolean;
  thankYou: ThankYouContent;
  visitorEmail: VisitorEmailContent;
  teamEmail: TeamEmailContent;
}

export interface FormSettings {
  /**
   * Where team alerts go. One address per line in the console. An empty list
   * falls back to the contact address in site settings, so a fresh install
   * still reaches somebody.
   */
  teamRecipients: string[];
  /** The name in the From header. The address itself stays in env. */
  senderName: string;
  /** Where replies go when a team member hits reply on a visitor's copy. */
  replyToEmail: string;
  /** Shown in every email footer. */
  brandName: string;
  brandTagline: string;
  /** Absolute or site-relative; the template resolves it against siteUrl. */
  logoUrl: string;
  /** Accent colour for buttons and rules. Hex, because email has no Tailwind. */
  accentColor: string;
  footerNote: string;
  /** Appended under the footer note on the visitor's copy only. */
  unsubscribeNote: string;

  forms: Record<FormKind, FormFlow>;
}

const CONTACT_FLOW: FormFlow = {
  notifyTeam: true,
  notifyVisitor: true,
  thankYou: {
    eyebrow: "Enquiry received",
    headline: "Thank you —",
    headlineHighlight: "we have your brief.",
    subhead:
      "A solutions architect is reading it now. You will hear from a real engineer, not an autoresponder, and the reply will address what you actually asked.",
    steps: [
      {
        id: "step-review",
        title: "We read it properly",
        description:
          "An architect reviews your requirements and checks them against the work we have already shipped in your domain.",
        iconName: "Search",
      },
      {
        id: "step-reply",
        title: "You get a considered reply",
        description:
          "Within four working hours, with a first view of approach, timeline and the questions we still need answered.",
        iconName: "MessageSquare",
      },
      {
        id: "step-call",
        title: "We scope it together",
        description:
          "If it looks like a fit, we book a 30-minute technical call — no sales deck, just architecture.",
        iconName: "Phone",
      },
    ],
    responseNote: "Typical first response: under 4 working hours.",
    primaryCtaLabel: "Explore our work",
    primaryCtaHref: "/portfolio",
    secondaryCtaLabel: "Back to home",
    secondaryCtaHref: "/",
    showReference: true,
    referenceLabel: "Your enquiry reference",
  },
  visitorEmail: {
    enabled: true,
    subject: "We have your enquiry, {{name}}",
    heading: "Thanks for getting in touch",
    intro:
      "Hi {{name}}, thank you for writing to us. Your enquiry has reached our engineering team and somebody is already reading it.",
    highlights: [
      "A solutions architect reviews your brief personally — no autoresponder loop.",
      "You will have a considered reply within four working hours.",
      "If it looks like a fit, we will suggest a 30-minute technical call.",
    ],
    outro:
      "In the meantime, feel free to reply to this email with anything you forgot to mention. It reaches the same people.",
    ctaLabel: "See how we work",
    ctaHref: "/process",
    signOff: "Speak soon,",
    signature: "The Divanex engineering team",
  },
  teamEmail: {
    enabled: true,
    subject: "New enquiry — {{name}} ({{email}})",
    heading: "New contact enquiry",
    intro: "A visitor submitted the contact form. The full record is in the admin console.",
    extraRecipients: [],
  },
};

const NEWSLETTER_FLOW: FormFlow = {
  notifyTeam: false,
  notifyVisitor: true,
  thankYou: {
    eyebrow: "Subscription confirmed",
    headline: "You're on the list —",
    headlineHighlight: "welcome aboard.",
    subhead:
      "You will get our engineering dispatch: architecture write-ups, post-mortems and the occasional hard-won lesson. No sales sequences, and one click unsubscribes you for good.",
    steps: [
      {
        id: "step-confirm",
        title: "You are subscribed",
        description: "Your address is on the list. Nothing else is required from you.",
        iconName: "CheckCircle2",
      },
      {
        id: "step-dispatch",
        title: "The next dispatch",
        description:
          "Roughly monthly. Real engineering writing from the team that shipped the work.",
        iconName: "Mail",
      },
      {
        id: "step-control",
        title: "You stay in control",
        description:
          "One-click unsubscribe in every email, and we never pass your address to anyone.",
        iconName: "ShieldCheck",
      },
    ],
    responseNote: "Roughly monthly. One click unsubscribes.",
    primaryCtaLabel: "Read the blog",
    primaryCtaHref: "/blog",
    secondaryCtaLabel: "Back to home",
    secondaryCtaHref: "/",
    showReference: false,
    referenceLabel: "Your subscription reference",
  },
  visitorEmail: {
    enabled: true,
    subject: "You're subscribed to the Divanex engineering dispatch",
    heading: "Welcome to the dispatch",
    intro:
      "Thank you for subscribing. You will now receive our engineering dispatch — written by the team that ships the work, not by a marketing department.",
    highlights: [
      "Architecture write-ups and post-mortems from real projects.",
      "Roughly monthly. We would rather send nothing than send filler.",
      "One-click unsubscribe in every email, and your address stays with us.",
    ],
    outro: "If you ever want to suggest a topic, just reply — it reaches the engineers directly.",
    ctaLabel: "Browse past articles",
    ctaHref: "/blog",
    signOff: "Welcome aboard,",
    signature: "The Divanex engineering team",
  },
  teamEmail: {
    enabled: false,
    subject: "New newsletter subscriber — {{email}}",
    heading: "New newsletter subscriber",
    intro: "Somebody subscribed to the engineering dispatch.",
    extraRecipients: [],
  },
};

export const DEFAULT_FORM_SETTINGS: FormSettings = {
  teamRecipients: [],
  senderName: "Divanex",
  replyToEmail: "",
  brandName: "Divanex",
  brandTagline: "Enterprise software engineering, SaaS & AI systems",
  logoUrl: "/brand-logo-icon.png",
  accentColor: "#0f7670",
  footerNote:
    "You are receiving this because you contacted Divanex through our website.",
  unsubscribeNote: "",
  forms: {
    contact: CONTACT_FLOW,
    newsletter: NEWSLETTER_FLOW,
  },
};

export function isFormKind(value: string): value is FormKind {
  return (FORM_KINDS as readonly string[]).includes(value);
}

/**
 * Reads one form's flow, falling back key by key.
 *
 * A stored row written before a form was added has no entry for it, and the
 * thank-you page for that form would then render from `undefined`. The
 * collection merge in contentStore only reaches one level, and `forms` is two.
 */
export function formFlow(settings: FormSettings, kind: FormKind): FormFlow {
  const stored = settings.forms?.[kind];
  const seed = DEFAULT_FORM_SETTINGS.forms[kind];
  if (!stored) return seed;

  return {
    ...seed,
    ...stored,
    thankYou: { ...seed.thankYou, ...(stored.thankYou || {}) },
    visitorEmail: { ...seed.visitorEmail, ...(stored.visitorEmail || {}) },
    teamEmail: { ...seed.teamEmail, ...(stored.teamEmail || {}) },
  };
}
