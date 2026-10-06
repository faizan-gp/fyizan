import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <div className="wrap nf view">
      <p className="code grad">404</p>
      <h1>Page not found</h1>
      <p className="lede">That page doesn&rsquo;t exist, or hasn&rsquo;t shipped yet.</p>
      <div className="cta-row">
        <ButtonLink href="/" arrow>
          Back home
        </ButtonLink>
        <ButtonLink href="/apps" variant="ghost">
          Browse apps
        </ButtonLink>
      </div>
    </div>
  );
}
