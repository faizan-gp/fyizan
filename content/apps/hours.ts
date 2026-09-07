import type { App } from "@/lib/content/types";

// Sourced from the product's own requirements.md / architecture.md / README
// at /Users/faizan/Desktop/fyizan/regret — not invented copy. Update this
// file, not this site's page templates, when the app's scope changes.
//
// Display name is "Life Hours: Expense Tracker" (App Store / Play Store
// style title); referred to as "Life Hours" in prose. The URL slug stays
// "hours" so existing links don't break.

const LEGAL_UPDATED = "2026-09-07";
const CONTACT_EMAIL = "hyrax9562@outlook.com";

export const hours: App = {
  slug: "hours",
  categorySlug: "money",
  name: "Life Hours: Expense Tracker",
  tagline:
    "A pre-purchase regret calculator. Scan a price, see what it really costs you, decide with a clear head.",
  status: "in-development",
  platforms: ["ios", "android"],
  summary:
    "Life Hours turns any price into hours of your own working life before you buy — then asks, 30 days later, whether it was worth it.",
  loop: [
    {
      title: "Price it",
      description:
        "Photograph the product or paste a link, then say what it is and what it costs.",
    },
    {
      title: "See the real cost",
      description:
        "The price becomes hours of your own life. “11 hours. That's all of Tuesday.”",
    },
    {
      title: "Decide",
      description:
        "Skip, Wait 24–48 hours, or Buy — with no guilt language either way.",
    },
    {
      title: "Get followed up",
      description:
        "Every Buy earns a 30-day “Worth it?” check-in, which sharpens the app's read on you.",
    },
  ],
  features: [
    {
      title: "Kept total",
      description:
        "Every Skip banks its amount into a running total — a visible scoreboard for money that stayed yours.",
    },
    {
      title: "Kept-if-grown",
      description:
        "See what your Kept total would be worth today had it gone into gold, a world index, bitcoin, or a plain deposit a year ago — strictly backward-looking, never a forecast.",
    },
    {
      title: "Regulars",
      description:
        "Anything priced twice becomes a Regular, one tap away next time — the weekly coffee, the daily pack of cigarettes.",
    },
    {
      title: "Wait timers",
      description:
        "A cooling-off period of your choosing, with a reminder the moment it ends.",
    },
    {
      title: "Insights",
      description:
        "A personal regret score and category breakdowns, built around one question: does sleeping on it actually work — for you specifically?",
    },
    {
      title: "Share cards",
      description:
        "Post what something costs in hours of a nurse's wage, a teacher's, or your own — never your income, by construction.",
    },
  ],
  privacyHighlights: [
    "Your income never leaves your phone — it lives in the device keychain, not the app's database.",
    "No ads. No selling of individual data. Not now, not later.",
    "The core loop works fully offline, with no account required to start.",
    "A share card can never show your price and your personal hourly rate together — enforced in code, not policy.",
  ],
  pricing: [
    {
      tier: "Free",
      features: [
        "Unlimited items, photos, links and logged expenses",
        "Kept total and skip streak",
        "Regulars with per-habit totals",
        "30-day follow-ups",
        "90-day ledger history",
      ],
    },
    {
      tier: "Plus",
      features: [
        "Regret score and full Insights",
        "Kept-if-grown against any asset",
        "Monthly and yearly recaps",
        "Goals and goal-based cards",
        "Full ledger history and CSV export",
      ],
    },
  ],
  faq: [
    {
      question: "Does Life Hours see my income?",
      answer:
        "No. Your income and fixed costs are stored on your device's secure keychain and never uploaded anywhere unless you explicitly enable sync — and even then, they're encrypted before they leave your phone.",
    },
    {
      question: "What platforms is Life Hours on?",
      answer:
        "iOS and Android. Life Hours is currently in development — join the waitlist to hear the moment it's available.",
    },
    {
      question: "Is Life Hours free?",
      answer:
        "Yes. The core loop — pricing things, deciding, tracking what you've kept — is free with no account required. A paid Plus tier adds deeper insights and personalization.",
    },
    {
      question: "Does Life Hours run ads or sell my data?",
      answer:
        "No, on principle. See the privacy section above — it's a hard rule for this app, not a policy that can quietly change.",
    },
  ],
  screenshots: [],
  waitlistEnabled: true,
  accentColor: "money",
  updatedAt: "2026-09-07",

  privacyPolicy: {
    updatedAt: LEGAL_UPDATED,
    intro: [
      "This policy explains what Life Hours: Expense Tracker (\"Life Hours,\" \"the App\") collects, why, and what it never does with your information. It's written to match exactly what the App does — no boilerplate about data the App doesn't actually touch.",
      "The App is built by Faizan Gillani, an independent developer. If anything here is unclear, email " +
        CONTACT_EMAIL +
        ".",
    ],
    sections: [
      {
        heading: "Information you provide",
        body: [
          "Item names, prices, categories, optional photos, and mood tags you choose to log when pricing or recording a purchase.",
          "Decisions (Buy, Skip, Wait), follow-up answers, goals, and Regulars you pin — all created by using the core loop.",
          "Settings you choose: currency, hours worked per week, your preferred Kept-if-grown asset, and notification preferences.",
        ],
      },
      {
        heading: "Information kept on your device only",
        body: [
          "Your income, any fixed monthly costs, and the free rate calculated from them are stored exclusively in your device's secure keychain (iOS Keychain / Android Keystore) — not in the App's regular database, and not in analytics events.",
          "If you turn on sync, this information is encrypted on your device before it ever leaves it, so the App's cloud infrastructure never sees it in plain text.",
        ],
      },
      {
        heading: "Information collected automatically",
        body: [
          "If analytics are enabled (on by default, toggleable in Settings), the App records event-level usage — for example that a decision was made, and its category — without any price, item name, or personal identifier. Prices are recorded only as ranges (\"price bands\"), never exact figures.",
          "Crash and performance diagnostics are collected to keep the App stable. These do not include your item names, prices, or income.",
        ],
      },
      {
        heading: "Your account",
        body: [
          "Life Hours works fully without an account. An anonymous session is created on first launch so the App functions offline from the start.",
          "If you choose to register — never required — we store the email address (or Apple/Google account identifier) you provide, solely to let you recover your data on a new device.",
        ],
      },
      {
        heading: "How this information is used",
        body: [
          "To run the core loop: pricing items, tracking decisions, computing your Kept total, and scheduling Wait and follow-up reminders.",
          "To sync your ledger across your own devices, only if you turn sync on.",
          "To process Plus subscription purchases through the App Store or Google Play.",
          "To fix bugs and keep the App reliable, using the anonymous crash and usage data described above.",
          "To show reference figures on share cards (published median wages, historical asset prices) — these come from public data sources, not from you.",
        ],
      },
      {
        heading: "What this app never does",
        body: [
          "No advertising and no ad SDKs of any kind.",
          "No selling, renting, or trading of your personal data or purchase history to anyone, ever.",
          "No sharing your individual item or spending data with retailers, advertisers, or data brokers.",
          "No reading, transmitting, or analyzing your income or fixed costs unless you explicitly enable encrypted sync — and even then, only in encrypted form.",
        ],
      },
      {
        heading: "Third-party services",
        body: [
          "Firebase (Google): authentication, the optional cloud database and file storage used for sync, the link-parsing and account-deletion functions, and anonymous analytics/crash reporting. Google processes this data on the App's behalf under its own data processing terms.",
          "RevenueCat: manages Plus subscription purchases and entitlements. It receives a random subscriber ID and purchase status — never your item data or income.",
          "Neither service is permitted to use App data for its own advertising purposes.",
        ],
      },
      {
        heading: "Data storage and security",
        body: [
          "The local database on your device is the source of truth for everything you log. Cloud sync, when enabled, is a mirror of it — protected by security rules that restrict every record to your own account, plus App Check to block unauthorized access to backend services.",
          "Sensitive fields (income, fixed costs) are encrypted client-side (AES-GCM) before upload, so the App's servers only ever see ciphertext for those fields.",
        ],
      },
      {
        heading: "Your choices and rights",
        body: [
          "Use the App fully without ever creating an account.",
          "Turn analytics off at any time in Settings.",
          "Export your full ledger as a CSV file, built on your device.",
          "Delete all local data, or delete your account and everything stored in the cloud, from Settings. Cloud deletion completes within 30 days.",
          "Contact " + CONTACT_EMAIL + " for any privacy request this doesn't cover.",
        ],
      },
      {
        heading: "Children's privacy",
        body: [
          "Life Hours is not directed at children under 13, and we do not knowingly collect information from anyone under that age. If you believe a child has provided us data, contact us and it will be removed.",
        ],
      },
      {
        heading: "International users",
        body: [
          "Firebase infrastructure may process data in regions outside your own country. By using the App's sync feature, you consent to this processing as described in this policy.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "If this policy changes, the update will be posted here with a new \"last updated\" date. Material changes will also be flagged inside the App.",
        ],
      },
      {
        heading: "Contact",
        body: ["Questions about this policy: " + CONTACT_EMAIL + "."],
      },
    ],
  },

  termsOfService: {
    updatedAt: LEGAL_UPDATED,
    intro: [
      "These Terms govern your use of Life Hours: Expense Tracker (\"Life Hours,\" \"the App\"), built by Faizan Gillani. By downloading or using the App, you agree to them.",
    ],
    sections: [
      {
        heading: "What Life Hours is",
        body: [
          "Life Hours is a personal tool that converts prices into hours of your own working life, tracks purchase decisions and expenses, and follows up on past purchases to learn from them.",
          "Every projection in the App — including \"Kept-if-grown\" figures — is illustrative and strictly backward-looking. Nothing in the App is financial, investment, or tax advice, and no feature should be read as a recommendation to buy, hold, or avoid any asset.",
        ],
      },
      {
        heading: "Eligibility",
        body: [
          "You must be at least 13 years old (or the minimum age required in your country to use apps without parental consent) to use Life Hours. By using the App, you confirm you meet this requirement.",
        ],
      },
      {
        heading: "Your account",
        body: [
          "The core loop works anonymously, with no account required. Registering is optional and exists only to recover your ledger on a new device — it does not unlock any feature the anonymous experience lacks.",
          "You're responsible for keeping any login credentials you create secure.",
        ],
      },
      {
        heading: "Subscriptions and billing",
        body: [
          "The Free tier covers the core loop, Kept total, Regulars, and 90 days of ledger history, at no cost.",
          "The Plus tier is a paid subscription billed through the Apple App Store or Google Play, and managed via RevenueCat. Where offered, a free trial applies only to the annual plan.",
          "Subscriptions renew automatically at the price shown at purchase unless canceled at least 24 hours before the renewal date. Manage or cancel a subscription through your App Store or Google Play account settings — not by contacting the developer directly, since purchases are processed by the platform, not by Life Hours itself.",
          "Prices vary by region and are set by the App Store / Google Play regional pricing tiers.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "Don't reverse-engineer, decompile, or attempt to extract the source code of the App beyond what's permitted by law.",
          "Don't use the link-parsing feature to scrape or bulk-fetch content unrelated to pricing an item you intend to log.",
          "Don't attempt to bypass, disable, or interfere with the App's security or encryption.",
        ],
      },
      {
        heading: "Your content",
        body: [
          "You retain ownership of the items, notes, and photos you log in the App. You grant the developer only the limited right to store and sync that data as needed to operate the features you've enabled.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The Life Hours name, design, and underlying software are owned by the developer. Nothing in these Terms transfers that ownership to you.",
        ],
      },
      {
        heading: "Disclaimers",
        body: [
          "Life Hours is provided \"as is.\" The developer does not guarantee the App will be uninterrupted, error-free, or that wage and asset-price reference data will always be current.",
          "Decisions you make about spending, saving, or investing based on the App remain entirely your own responsibility.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the maximum extent permitted by law, the developer is not liable for any indirect, incidental, or consequential damages arising from your use of the App, including financial decisions made using its figures.",
        ],
      },
      {
        heading: "Termination",
        body: [
          "You may stop using the App and delete your account at any time from Settings.",
          "The developer may suspend or terminate access for a user found to be violating these Terms.",
        ],
      },
      {
        heading: "Changes to these terms",
        body: [
          "Updates to these Terms will be posted here with a new \"last updated\" date. Continuing to use the App after a change means you accept the updated Terms.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These Terms are governed by the laws of Pakistan, without regard to its conflict-of-law principles.",
        ],
      },
      {
        heading: "Contact",
        body: ["Questions about these Terms: " + CONTACT_EMAIL + "."],
      },
    ],
  },
};
