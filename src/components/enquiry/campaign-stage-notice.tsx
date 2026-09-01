import type { CampaignStage } from "@/lib/db/site-settings";

const COPY: Record<CampaignStage, { label: string; detail: string }> = {
  announcement: {
    label: "Pre-Release",
    detail: "Ahead of Apple's official announcement — nothing below is confirmed until Apple confirms it.",
  },
  preorder_open: {
    label: "Pre-Orders Open",
    detail: "Prime Tech is taking pre-order interest now. Final pricing and stock are confirmed with you on WhatsApp.",
  },
  available: {
    label: "Now Available",
    detail: "The confirmed lineup is live below.",
  },
};

/** Slim, non-alarming stage indicator tied directly to the admin-controlled
 * campaign stage — deliberately not styled as a warning/legal banner. */
export function CampaignStageNotice({ stage }: { stage: CampaignStage }) {
  const copy = COPY[stage];
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-1.5 text-center sm:flex-row sm:justify-center sm:gap-3 sm:text-left">
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-cyan">
        <span className="size-1.5 rounded-full bg-brand-cyan" aria-hidden />
        {copy.label}
      </span>
      <p className="text-xs text-white/55">{copy.detail}</p>
    </div>
  );
}
