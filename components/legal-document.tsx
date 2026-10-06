import type { LegalDocument } from "@/lib/content/types";

// Shared renderer for privacy policy / terms of service content — one
// template driven by data, per architecture.md §4, so a future app's
// legal pages cost a content file, not a new page.
export function LegalDocumentBody({ document }: { document: LegalDocument }) {
  const updated = new Date(document.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="legal-body">
      <p className="legal-updated">Last updated {updated}</p>
      <div className="prose">
        {document.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <div className="legal-sections">
        {document.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <div className="prose">
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
