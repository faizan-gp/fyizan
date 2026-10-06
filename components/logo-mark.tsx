// Four rounded tiles: a launcher grid, standing for "a collection of apps".
export function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="4" fill="var(--brand)" />
      <rect x="18" y="2" width="12" height="12" rx="4" fill="var(--brand-2)" />
      <rect x="2" y="18" width="12" height="12" rx="4" fill="var(--brand-2)" opacity=".55" />
      <rect x="18" y="18" width="12" height="12" rx="4" fill="var(--brand)" opacity=".55" />
    </svg>
  );
}
