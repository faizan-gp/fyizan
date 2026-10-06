"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { STYLES, STYLE_STORAGE_KEY, type StyleId } from "@/lib/styles";

// The active style lives on <html data-style>, set before first paint by
// the boot script in the root layout. Reading it through
// useSyncExternalStore keeps the buttons in sync with no hydration flash.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-style"] });
  return () => observer.disconnect();
}
const getSnapshot = () => (document.documentElement.getAttribute("data-style") as StyleId | null) ?? "aurora";
const getServerSnapshot = (): StyleId => "aurora";

export function StyleSwitcher() {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [note, setNote] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function choose(id: StyleId) {
    document.documentElement.setAttribute("data-style", id);
    try {
      localStorage.setItem(STYLE_STORAGE_KEY, id);
    } catch {
      // Storage can be blocked (private windows); the choice still applies for this visit.
    }
    setNote(STYLES.find((s) => s.id === id)?.note ?? "");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNote(""), 3600);
  }

  return (
    <>
      <div className={`style-note ${note ? "show" : ""}`} role="status" aria-live="polite">
        {note}
      </div>
      <div className="switcher" role="group" aria-label="Choose a visual style">
        <span className="lbl">Style</span>
        <div className="opts">
          {STYLES.map((style) => (
            <button
              key={style.id}
              type="button"
              className="sw-btn"
              aria-pressed={active === style.id}
              onClick={() => choose(style.id)}
            >
              <span
                className="sw"
                style={{ background: `linear-gradient(135deg, ${style.swatch[0]} 50%, ${style.swatch[1]} 50%)` }}
              />
              {style.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
