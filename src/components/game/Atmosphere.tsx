import type { StageTheme } from "@/src/utils/stage-data";

type AtmosphereProps = {
  theme: StageTheme;
  isAudioRewardActive: boolean;
};

export function Atmosphere({ theme, isAudioRewardActive }: AtmosphereProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 ${themeClassMap[theme]}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_24%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.08),_transparent_28%)] opacity-30" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:68px_68px]" />
      <div className="scanlines absolute inset-0 opacity-25" />

      {theme === "storm" ? (
        <>
          <div className="cloud cloud-a absolute left-[6%] top-[14%] h-32 w-72 rounded-full bg-white/8 blur-3xl" />
          <div className="cloud cloud-b absolute right-[8%] top-[22%] h-36 w-80 rounded-full bg-sky-200/8 blur-3xl" />
          <div className="moon-glow absolute right-[12%] top-[10%] h-36 w-36 rounded-full bg-white/20 blur-2xl" />
        </>
      ) : null}

      {theme === "market" ? (
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,rgba(16,185,129,0.08)_20%,transparent_60%),linear-gradient(90deg,rgba(248,113,113,0.08),transparent_30%,rgba(16,185,129,0.12))]" />
      ) : null}

      {theme === "lab" ? (
        <>
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/18 blur-3xl" />
          <div className="matrix-rain absolute inset-0 opacity-35" />
        </>
      ) : null}

      {isAudioRewardActive ? (
        <div className="absolute right-5 top-5 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-sky-100/90">
        </div>
      ) : null}
    </div>
  );
}

const themeClassMap: Record<StageTheme, string> = {
  terminal:
    "bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.16),_transparent_24%),linear-gradient(180deg,#020403_0%,#030806_42%,#010201_100%)]",
  "forest-green":
    "bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(22,163,74,0.18),_transparent_26%),linear-gradient(180deg,#06110b_0%,#0c1d13_38%,#020403_100%)]",
  storm:
    "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_18%),linear-gradient(180deg,#040812_0%,#101b30_40%,#04070d_100%)]",
  abyss:
    "bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1),_transparent_20%),linear-gradient(180deg,#02040a_0%,#040814_36%,#000000_100%)]",
  market:
    "bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_20%),radial-gradient(circle_at_bottom_left,_rgba(244,63,94,0.14),_transparent_22%),linear-gradient(180deg,#030708_0%,#091610_48%,#020303_100%)]",
  citadel:
    "bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.14),_transparent_18%),radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.14),_transparent_20%),linear-gradient(180deg,#0a0c09_0%,#11140f_40%,#040403_100%)]",
  lab:
    "bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.18),_transparent_22%),linear-gradient(180deg,#090706_0%,#1c1207_38%,#050402_100%)]",
};
