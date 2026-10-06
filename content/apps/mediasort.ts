import type { App } from "@/lib/content/types";

// Sourced from the product's own README, in-app Help / Privacy / Terms
// screens (lib/screens/settings/info_pages.dart) and code at
// /Users/faizan/Desktop/App/mediasort — not invented copy. Update this
// file, not this site's page templates, when the app's scope changes.
//
// The legal text below follows what the code actually does (Firebase
// Analytics, RevenueCat, Keychain / Block Store). Keep it in sync with the
// in-app Settings → Privacy screen and the store privacy declarations.

const LEGAL_UPDATED = "2026-10-06";
const CONTACT_EMAIL = "hyrax9562@outlook.com";

export const mediasort: App = {
  slug: "mediasort",
  categorySlug: "utilities",
  name: "MediaSort",
  tagline:
    "Find the photos, videos and voice notes eating your storage, then delete, protect or compress them.",
  status: "in-development",
  platforms: ["ios", "android"],
  icon: {
    src: "/images/apps/mediasort/icon.png",
    alt: "MediaSort app icon — a cream italic lowercase m with an orange dot on near-black",
  },
  summary:
    "MediaSort finds the photos, videos and voice notes taking up your storage, then lets you delete, protect or compress them — all on your device.",
  loop: [
    {
      title: "See what's heavy",
      description:
        "A dashboard breaks your storage down by videos, photos and screenshots, and suggests the biggest cleanup first.",
    },
    {
      title: "Swipe to decide",
      description:
        "Go through your largest items one at a time — stage one for deletion, or keep it forever.",
    },
    {
      title: "Compress what you keep",
      description:
        "Make a smaller copy of a video or photo you want to hold on to, and compare it with the original.",
    },
    {
      title: "Confirm every delete",
      description:
        "Nothing is removed until you confirm in your device's own system prompt.",
    },
  ],
  features: [
    {
      title: "Storage dashboard",
      description:
        "See how much of your device is used and how it splits across videos, photos, screenshots and free space.",
    },
    {
      title: "Suggested cleanups",
      description:
        "Start with the most worthwhile job — like your largest videos — with the space it could free up shown up front.",
    },
    {
      title: "Swipe cleanup",
      description:
        "A card-by-card review: stage an item for deletion or keep it forever, with its size and date in view.",
    },
    {
      title: "Compress without deleting",
      description:
        "Shrink videos and photos into smaller copies. Replace the original, keep both, or discard the copy — only after you've compared them.",
    },
    {
      title: "Protected items",
      description:
        "Protect what matters and it stays out of every cleanup suggestion, so you can't delete it by accident while swiping.",
    },
    {
      title: "Quality you control",
      description:
        "Balanced keeps videos at 1080p; Smallest drops to 720p. Switch between original and compressed before you choose.",
    },
  ],
  privacyHighlights: [
    "Your photos, videos and their file names never leave your device.",
    "No accounts, no ads, and no tracking across apps — the advertising ID is not used.",
    "Items are deleted only after you confirm in your device's own system prompt.",
    "Anonymous usage statistics can be switched off at any time in Settings → Privacy.",
    "Payments are handled by Apple or Google — MediaSort never sees your payment details.",
  ],
  pricing: [
    {
      tier: "Free trial",
      features: [
        "5 videos moved to trash",
        "20 photos moved to trash",
        "5 compressions saved",
      ],
    },
    {
      tier: "Lifetime",
      price: "One-time purchase",
      features: [
        "Unlimited cleanups",
        "Unlimited compression",
        "Not a subscription — never renews",
        "Restore on any device signed in to the same Apple ID or Google account",
      ],
    },
  ],
  faq: [
    {
      question: "Does MediaSort upload my photos?",
      answer:
        "No. Your photos and videos never leave your device, and nothing about them — not even their names — is sent anywhere. The app goes online only to handle your one-time purchase and to send anonymous usage statistics, which you can turn off in Settings → Privacy.",
    },
    {
      question: "I deleted items, but my storage didn't go down. Why?",
      answer:
        "On iPhone, deleted items move to the Recently Deleted album in Photos and keep using space for 30 days. To free it now: Photos → Albums → Recently Deleted → Select → Delete All. On Android, deleted items are removed right away, though some gallery apps keep their own trash for 30 days.",
    },
    {
      question: "What does protecting an item do?",
      answer:
        "Protected items stay out of every cleanup suggestion, so you can't delete them by accident while swiping. They stay in your library exactly as they are, and you can unprotect one at any time.",
    },
    {
      question: "Will compressed videos look worse?",
      answer:
        "Balanced, the default, keeps videos at 1080p, which looks clean on a phone or TV. Smallest drops to 720p. You can compare the original and the compressed copy before deciding, and keep the original if you prefer it.",
    },
    {
      question: "Is MediaSort free?",
      answer:
        "You can try it free: 5 videos and 20 photos moved to trash, and 5 compressions. After that, a single one-time purchase unlocks unlimited cleanups and compression. It isn't a subscription and never renews.",
    },
    {
      question: "Which platforms is MediaSort on?",
      answer:
        "iOS (iPhone) and Android. MediaSort is currently in development — email to be told when it's available.",
    },
  ],
  screenshots: [
    {
      src: "/images/apps/mediasort/screenshot-dashboard.png",
      alt: "MediaSort dashboard showing 148.3 GB of 256 GB used, split across videos, photos and other, with a suggested cleanup of the 24 largest videos",
    },
    {
      src: "/images/apps/mediasort/screenshot-swipe.png",
      alt: "MediaSort swipe cleanup showing a 1.84 GB video card marked Trash, with Stage for deletion and Keep forever buttons",
    },
    {
      src: "/images/apps/mediasort/screenshot-compress.png",
      alt: "MediaSort Compress tab listing videos with the percentage each could shrink, and 11.4 GB that could be freed",
    },
  ],
  waitlistEnabled: true,
  accentColor: "utility",
  updatedAt: "2026-10-06",

  support: {
    intro: [
      "Need a hand with MediaSort? Check the common questions below, or email and you'll get a reply from the developer.",
    ],
    contactEmail: CONTACT_EMAIL,
    includeInEmail: "Please include your device model and OS version.",
    topics: [
      {
        question: "I deleted items, but my storage didn't go down",
        answer:
          "On iPhone, deleted items move to the Recently Deleted album in Photos and keep using space for 30 days. To free the space now, open Photos, then Albums, then Recently Deleted, tap Select, then Delete All. On Android, deleted items are removed right away. Some gallery apps keep a trash for 30 days, so check there if the space doesn't show up.",
      },
      {
        question: "What does protecting an item do?",
        answer:
          "Protected items stay out of every cleanup suggestion, so you can't delete them by accident while swiping. They stay in your library exactly as they are. Find them in the Protected tab, and long-press one to unprotect it.",
      },
      {
        question: "What does Compress do?",
        answer:
          "It makes a smaller copy of a video or photo you want to keep. Nothing in your library changes until you've compared the copy with the original and chosen to replace the original, keep both, or discard the copy.",
      },
      {
        question: "Will compressed videos look worse?",
        answer:
          "Balanced, the default, keeps videos at 1080p, which looks clean on a phone or TV. Smallest drops to 720p. You can switch between the original and the compressed copy before deciding, and keep the original if you prefer it.",
      },
      {
        question: "Why do some sizes start with \"~\"?",
        answer:
          "Those are estimates. MediaSort measures every file during its first scan; items added since then show an estimate until you rescan with the refresh button on the Clean tab. Compression results always show exact sizes.",
      },
      {
        question: "MediaSort only shows some of my photos",
        answer:
          "You may have given it access to selected photos only. Allow full access to your library in your device's Settings so MediaSort can find everything that's taking up space.",
      },
      {
        question: "I already bought MediaSort",
        answer:
          "Reinstalling or switching phones never costs you the purchase. Open Settings in the app and tap Restore purchase while signed in to the same Apple ID or Google account you bought with.",
      },
      {
        question: "Does MediaSort upload my photos?",
        answer:
          "No. Your photos and videos never leave your device. See the Privacy Policy for the full details.",
      },
    ],
  },

  privacyPolicy: {
    updatedAt: LEGAL_UPDATED,
    intro: [
      "This policy explains what MediaSort (\"MediaSort,\" \"the App\") accesses, what it collects, and what it never does with your information. It's written to match exactly what the App does.",
      "The App is built by Faizan Gillani, an independent developer. If anything here is unclear, email " +
        CONTACT_EMAIL +
        ".",
    ],
    sections: [
      {
        heading: "Summary",
        body: [
          "MediaSort has no accounts, no ads and no tracking. It never uploads your photos, videos or audio files, or any information about them — not even their names.",
          "It goes online for only two reasons: to handle your one-time purchase, and to send anonymous usage statistics (which you can turn off). Both are described below.",
        ],
      },
      {
        heading: "What MediaSort accesses on your device",
        body: [
          "With your permission, MediaSort reads your photo library — photos and videos, and on Android also audio files such as voice notes — to show you what is taking up space. This happens on your device.",
          "MediaSort deletes items only after you review them and confirm in your device's own system prompt. It adds a compressed copy to your library only when you choose to keep it.",
          "On iPhone, if an original photo or video is stored in iCloud Photos, iOS may download it from iCloud when you compress it. That transfer is between your device and Apple under Apple's terms; MediaSort does not receive it.",
        ],
      },
      {
        heading: "Anonymous usage statistics",
        body: [
          "To learn which features people use and where the App gets stuck, MediaSort uses Google Analytics for Firebase. It records coarse actions such as which screen was opened, roughly how large a library is (as a range, not an exact count), how many items were cleaned or compressed, how many MB that saved, and whether the purchase screen was seen or a purchase went through.",
          "Firebase also receives standard technical information: your device model, operating system version, country, and a random app-instance ID. It never receives your photos, videos or file names. The advertising ID is not used.",
          "Usage statistics are on by default. You can turn them off at any time in Settings → Privacy. Turning them off stops collection and asks Firebase to reset the data for that app instance.",
        ],
      },
      {
        heading: "Purchases",
        body: [
          "Payments are handled by Apple or Google Play. MediaSort never sees your payment details.",
          "To recognise your purchase after a reinstall, the App shares an anonymous random ID and your purchase status with RevenueCat, the purchase-management provider it uses. That ID is not linked to your name, email address or photos. Like any online service, RevenueCat may also receive technical information such as your IP address when your device contacts it.",
        ],
      },
      {
        heading: "What MediaSort stores on your device",
        body: [
          "Your settings, the list of items you've protected, and measured file sizes are saved on your device so the App opens quickly. They are removed when you delete the App.",
          "The exception is a small counter of how much of the free trial you've used, plus the anonymous ID described above. These are kept in the iOS Keychain or Android's Google Block Store so that reinstalling the App doesn't reset the trial or lose your purchase. Because that is their purpose, they can outlast deleting the App, and on Android may be restored to a new phone if you use Google Backup. They contain no personal information and no information about your media.",
        ],
      },
      {
        heading: "What MediaSort never does",
        body: [
          "No advertising and no advertising SDKs.",
          "No accounts, and no collection of your name, email address or contacts.",
          "No uploading, reading out or analysing of your photos, videos or audio files off your device.",
          "No selling, renting or trading of your information.",
        ],
      },
      {
        heading: "Third-party services",
        body: [
          "Google Analytics for Firebase: anonymous usage statistics, as described above. Google processes this data on the App's behalf under its own terms.",
          "RevenueCat: purchase management and entitlement checks, as described above.",
          "Apple and Google: the App Store or Google Play handles payment and refunds under their own terms and privacy policies.",
          "None of these services is permitted to use data from the App for its own advertising.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "Change or remove MediaSort's access to your photos and videos at any time in your device's Settings.",
          "Turn off anonymous usage statistics in Settings → Privacy.",
          "Delete the App to remove everything it stored on your device (other than the Keychain / Block Store items described above).",
          "Because MediaSort has no accounts, there is no account to delete and no personal profile stored on our side. For any privacy question or request, contact " +
            CONTACT_EMAIL +
            ".",
        ],
      },
      {
        heading: "Children's privacy",
        body: [
          "MediaSort is not directed at children under 13, and we do not knowingly collect personal information from anyone under that age.",
        ],
      },
      {
        heading: "International users",
        body: [
          "Firebase and RevenueCat may process data in countries other than your own. By using the App with usage statistics enabled, or by making a purchase, you understand your anonymous data may be processed outside your country.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "If this policy changes, the update will be posted here with a new \"last updated\" date, and the in-app privacy screen will be updated to match.",
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
      "These Terms govern your use of MediaSort (\"MediaSort,\" \"the App\"), built by Faizan Gillani. By downloading or using the App, you agree to them.",
    ],
    sections: [
      {
        heading: "What MediaSort is",
        body: [
          "MediaSort is a utility that shows you which photos, videos and (on Android) audio files are taking up space on your device, and lets you delete, protect or compress them.",
        ],
      },
      {
        heading: "Eligibility",
        body: [
          "You must be at least 13 years old (or the minimum age required in your country to use apps without parental consent) to use MediaSort.",
        ],
      },
      {
        heading: "Your library and your responsibility",
        body: [
          "MediaSort deletes items only when you confirm. Deleted items go to your device's trash where the system provides one, and where it doesn't, deletion may be permanent.",
          "Compression creates a separate copy. If you choose to replace the original with the compressed copy, the original is removed and the copy's lower quality is permanent.",
          "You are responsible for keeping backups of anything you care about. The developer is not responsible for items you choose to delete or replace.",
        ],
      },
      {
        heading: "The free trial",
        body: [
          "Before you buy, MediaSort lets you move 5 videos and 20 photos to the trash and save 5 compressions for free. When all three allowances are used, the App is locked behind the purchase screen.",
          "The trial is tied to your device, and is designed to survive reinstalling the App.",
        ],
      },
      {
        heading: "The purchase",
        body: [
          "MediaSort offers a single one-time, non-consumable purchase that unlocks unlimited cleanups and compression on your devices, for as long as the App is available. It is not a subscription and never renews.",
          "The price is shown on the purchase screen in your local currency and varies by region, as set by the App Store or Google Play.",
          "You can restore your purchase on any device signed in to the same Apple ID or Google account, at no extra cost, using Restore purchase in Settings.",
        ],
      },
      {
        heading: "Payment and refunds",
        body: [
          "Your purchase is charged to your Apple ID or Google Play account and processed by Apple or Google, not by the developer. Refund requests are decided by Apple (reportaproblem.apple.com) or by Google Play under their own policies.",
        ],
      },
      {
        heading: "Apple and Google terms",
        body: [
          "If you download MediaSort from the Apple App Store, Apple's standard Licensed Application End User License Agreement (https://www.apple.com/legal/internal/terms/site/appstore.html) applies alongside these Terms. If you download it from Google Play, the Google Play Terms of Service apply.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "Don't reverse-engineer, decompile, or attempt to extract the source code of the App beyond what the law allows.",
          "Don't attempt to bypass, disable or tamper with the free-trial limits, the purchase check, or the App's other protections.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The MediaSort name, design and underlying software are owned by the developer. You keep full ownership of your own photos, videos and other files. Nothing in these Terms transfers either to the other party.",
        ],
      },
      {
        heading: "Disclaimers",
        body: [
          "MediaSort is provided \"as is.\" The developer does not guarantee that the App will be uninterrupted or error-free, that file-size figures marked with \"~\" are exact, or that freed storage will appear immediately — your device may keep deleted items in a trash for a period.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the maximum extent permitted by law, the developer is not liable for any indirect, incidental or consequential damages arising from your use of the App, including loss of photos, videos or other data.",
        ],
      },
      {
        heading: "Termination",
        body: [
          "You may stop using the App at any time by deleting it. The developer may suspend access for a user found to be violating these Terms.",
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
