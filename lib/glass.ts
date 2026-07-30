// Shared glassmorphism tokens: translucent panels over the app's ambient
// gradient/grid background (see AppLayout), with a blur so content behind
// them stays legible instead of a flat solid card. Each token also carries
// a `theme-light:` variant (see app/globals.css @custom-variant) so every
// surface built from these tokens adapts automatically when the light theme
// is active — no per-component theme handling needed.

export const glassPanel =
  "rounded-2xl border border-white/10 bg-[#0d1c2d]/55 shadow-xl shadow-black/30 backdrop-blur-xl theme-light:border-black/10 theme-light:bg-white/70 theme-light:shadow-black/10";

export const glassCard =
  "rounded-2xl border border-white/10 bg-[#0d1c2d]/55 shadow-lg shadow-black/30 backdrop-blur-xl transition duration-200 theme-light:border-black/10 theme-light:bg-white/70 theme-light:shadow-black/10";

export const glassCardHover = `${glassCard} hover:-translate-y-0.5 hover:border-[#42fbf2]/35 hover:bg-[#0d1c2d]/70 hover:shadow-[#42fbf2]/5 theme-light:hover:bg-white/85`;

export const glassInput =
  "rounded-xl border border-white/10 bg-[#081a2d]/60 backdrop-blur-md transition placeholder:text-slate-500 hover:border-[#42fbf2]/45 focus:border-[#42fbf2] focus:bg-[#081a2d]/80 focus:shadow-[0_0_0_3px_rgba(66,251,242,0.10)] theme-light:border-black/10 theme-light:bg-white/80 theme-light:focus:bg-white";

export const glassChrome =
  "border-white/10 bg-[#071624]/70 backdrop-blur-xl theme-light:border-black/10 theme-light:bg-white/75";

// Small icon-chip backgrounds (e.g. the beaker icon on a PrepItem card).
export const glassChip =
  "bg-[#223146]/70 ring-1 ring-inset ring-white/10 theme-light:bg-black/5 theme-light:ring-black/10";

// Progress bar track background.
export const glassTrack = "bg-[#223146]/70 theme-light:bg-black/10";
