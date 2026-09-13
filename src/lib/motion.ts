/** Prime Tech's signature easing curve — mirrors the `--ease-prime` CSS
 * token in globals.css. Centralized here since motion/react transitions
 * need it as a JS array, not a CSS var. */
export const EASE_PRIME = [0.16, 1, 0.3, 1] as const;
