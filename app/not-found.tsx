import { Container } from "@/components/container";
import { PillButton } from "@/components/pill-button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-display text-8xl font-black text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl font-black text-ink">Page not found</h1>
      <p className="mt-4 text-lg text-ink-muted">
        That page doesn&rsquo;t exist, or hasn&rsquo;t shipped yet.
      </p>
      <div className="mt-8 flex justify-center">
        <PillButton href="/">Back home</PillButton>
      </div>
    </Container>
  );
}
