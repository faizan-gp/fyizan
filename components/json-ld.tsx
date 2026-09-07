// Thin, XSS-safe renderer for a JSON-LD block. Content is always a builder
// result from lib/seo/jsonld.ts (never raw user input), and JSON.stringify
// escapes </script> the one way that matters (see the replace below) so a
// stray string in content can't break out of the script tag.
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
