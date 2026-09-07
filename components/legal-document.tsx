import type { LegalDocument } from "@/lib/content/types";

// Shared renderer for privacy policy / terms of service content — one
// template driven by data, per architecture.md §4.1, so a future app's
// legal pages cost a content file, not a new page.
export function LegalDocumentBody({ document }: { document: LegalDocument }) {
  const updated = new Date(document.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-2xl">
      <p className="text-sm font-bold uppercase tracking-wide text-ink-muted">
        Last updated {updated}
      </p>
      <div className="mt-6 space-y-4 text-ink-muted">
        {document.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 space-y-10">
        {document.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display text-xl font-black text-ink">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-ink-muted">
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
