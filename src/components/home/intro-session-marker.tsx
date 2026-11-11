"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { markIntroSeen } from "@/lib/intro-session";

/**
 * Sits in the site layout. If a visitor's first page of the session is not the
 * homepage, that counts as their first screen — so clicking the logo later
 * doesn't show the opening animation.
 */
export function IntroSessionMarker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") markIntroSeen();
  }, [pathname]);
  return null;
}
