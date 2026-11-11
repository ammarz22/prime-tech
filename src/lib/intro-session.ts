/**
 * The opening animation plays once per browser session. This session cookie
 * (no expiry, so it clears when the browser closes) records that the visitor
 * has already had their "first screen" — either because the intro played, or
 * because they landed on some other page first. The server reads it, so a
 * returning visitor never gets the intro markup in the first place.
 */
export const INTRO_COOKIE = "pt_intro_seen";

/** Client only. */
export function markIntroSeen() {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${INTRO_COOKIE}=1; path=/; SameSite=Lax${secure}`;
}
