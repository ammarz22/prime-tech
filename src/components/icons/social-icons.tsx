import type { SVGProps } from "react";

/**
 * Minimal line-art glyphs for social platforms. lucide-react no longer
 * ships brand/logo icons, so these are small original monoline drawings
 * matching the rest of the site's icon weight (not traced brand marks).
 */

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v3.5H8V21h3.5v-7.5H14l1-3.5h-3.5V7.5c0-.55.45-1 1-1H15z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="7.5" cy="8" r="1" fill="currentColor" stroke="none" />
      <path d="M7.5 11v6" />
      <path d="M12 17v-3.5a2 2 0 0 1 4 0V17" />
      <path d="M12 11v6" />
    </svg>
  );
}
