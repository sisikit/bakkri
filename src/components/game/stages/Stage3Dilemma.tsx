// using native <img> instead of next/image
import { useEffect, useMemo, useRef, useState } from "react";

type Stage3DilemmaProps = {
  onSubmit: (input: string) => boolean;
};

export function Stage3Dilemma({ onSubmit }: Stage3DilemmaProps) {
  const [value, setValue] = useState("");
  const [isButtonSaved, setIsButtonSaved] = useState(false);
  const advanceTimeoutRef = useRef<number | null>(null);

  const rescueRegex =
    /^(\s*\.save-sisi\s*\{\s*(background|background-color)\s*:\s*(green|#22c55e|#00ff00)\s*;?\s*\}\s*)$/i;

  function normalizeRescueRule(input: string) {
    return input
      .replace(
        /(background(?:-color)?)\s*;\s*(green|#22c55e|#00ff00)/i,
        "$1: $2",
      )
      .trim();
  }

  const rescuePreviewStyle = useMemo(
    () =>
      isButtonSaved
        ? { backgroundColor: "#22c55e", borderColor: "rgba(134, 239, 172, 0.75)" }
        : undefined,
    [isButtonSaved],
  );

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) {
        window.clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, []);

  function handleSubmit() {
    if (isButtonSaved) {
      return;
    }

    const normalizedValue = normalizeRescueRule(value);
    const isSolved = rescueRegex.test(normalizedValue);

    if (!isSolved) {
      onSubmit(normalizedValue);
      return;
    }

    setValue(normalizedValue);
    setIsButtonSaved(true);
    advanceTimeoutRef.current = window.setTimeout(() => {
      onSubmit(normalizedValue);
    }, 5000);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative overflow-hidden rounded-[1.9rem] border border-sky-300/12 bg-[linear-gradient(180deg,rgba(88,120,152,0.95)_0%,rgba(59,90,126,0.94)_22%,rgba(18,49,82,0.96)_48%,rgba(5,22,42,0.98)_100%)] p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_18%),linear-gradient(180deg,transparent_0%,rgba(8,31,57,0.16)_40%,rgba(6,21,40,0.1)_100%)]" />
        <div className="absolute inset-x-0 top-[47%] h-[3px] bg-white/18" />
        <div className="absolute inset-x-0 top-[49%] h-[10%] bg-[linear-gradient(180deg,rgba(119,176,223,0.28),rgba(37,105,164,0.1))]" />
        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[linear-gradient(180deg,rgba(31,100,164,0.4)_0%,rgba(14,71,125,0.7)_32%,rgba(5,37,75,0.94)_100%)]" />
        <div className="sea-wave sea-wave-a absolute left-[-12%] top-[51%] h-18 w-[58%] rounded-full border border-sky-100/16 bg-sky-200/16 blur-[2px]" />
        <div className="sea-wave sea-wave-b absolute right-[-10%] top-[55%] h-20 w-[60%] rounded-full border border-sky-100/16 bg-sky-200/14 blur-[2px]" />
        <div className="sea-wave sea-wave-c absolute left-[8%] top-[61%] h-16 w-[34%] rounded-full border border-sky-100/16 bg-sky-200/12" />
        <div className="sea-wave sea-wave-d absolute right-[10%] top-[65%] h-14 w-[30%] rounded-full border border-sky-100/14 bg-sky-200/12" />
        <div className="absolute left-[18%] top-[50%] h-3 w-28 rounded-full bg-white/18 blur-md" />
        <div className="absolute right-[20%] top-[57%] h-3 w-24 rounded-full bg-white/15 blur-md" />

        <div className="relative flex min-h-72 items-end justify-center">
          <div className="absolute left-1/2 top-[34%] h-32 w-32 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="bakri-sinking absolute left-1/2 top-[46%] z-10 h-28 w-28 -translate-x-1/2 rounded-full border-4 border-white/14 bg-slate-900/50 p-1 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
            <img
              alt="Bakri sinking in the sea"
              className="h-full w-full rounded-full object-cover"
              height={112}
              src="/sisiSinking.jpg"
              width={112}
            />
          </div>
          <div className="absolute left-1/2 top-[55.5%] z-20 h-14 w-40 -translate-x-1/2 rounded-full bg-sky-300/24 blur-md" />
          <div className="sea-foam absolute left-1/2 top-[54%] z-20 h-4 w-44 -translate-x-1/2 rounded-full border border-white/15 bg-white/12" />
          <div className="absolute left-[44%] top-[38%] z-20 h-2 w-2 rounded-full bg-white/60" />
          <div className="bubble-rise absolute left-[41%] top-[42%] z-20 h-3 w-3 rounded-full border border-white/45 bg-white/10" />
          <div className="bubble-rise absolute left-[57%] top-[39%] z-20 h-2.5 w-2.5 rounded-full border border-white/40 bg-white/10 [animation-delay:0.7s]" />
          <div className="bubble-rise absolute left-[60%] top-[45%] z-20 h-2 w-2 rounded-full border border-white/40 bg-white/10 [animation-delay:1.1s]" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/82">
          Save `Sisi` by writing the full CSS rule that turns the rescue button green.
        </div>
        {isButtonSaved && (
          <div className="rounded-[1.6rem] border border-emerald-300/30 bg-emerald-400/10 p-5 text-sm leading-7 text-emerald-100">
            Rescue done. `Sisi` is safe now, route sync in progress...
          </div>
        )}
        <div className="rounded-[1.6rem] border border-emerald-300/14 bg-slate-950/70 p-5">
          <button
            type="button"
            className="save-sisi w-full rounded-full border border-white/15 bg-white/10 px-5 py-4 text-sm font-semibold text-white transition"
            style={rescuePreviewStyle}
          >
            Save Sisi
          </button>
        </div>
        {isButtonSaved && (
          <div className="overflow-hidden rounded-[1.6rem] border border-emerald-300/24 bg-slate-950/80 p-3">
            <img
              alt="Sisi rescued on the safe side"
              className="h-80 w-full rounded-[1.2rem] object-cover object-top"
              height={820}
              src="/sisiSaved.png"
              width={820}
            />
          </div>
        )}
        <textarea
          aria-label="Stage 3 CSS rescue rule"
          className="min-h-40 w-full rounded-[1.6rem] border border-white/10 bg-slate-950/70 p-5 font-mono text-sm text-white outline-none placeholder:text-white/30"
          placeholder=".save-sisi { background-color: green; }"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={isButtonSaved}
        />
        <button
          type="button"
          className="w-full rounded-[1.4rem] border border-sky-300/25 bg-sky-300/10 px-5 py-4 text-xs uppercase tracking-[0.3em] text-sky-50 transition hover:bg-sky-300/18 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleSubmit}
          disabled={isButtonSaved}
        >
          {isButtonSaved ? "Rescue Completed" : "Apply Rescue CSS"}
        </button>
        <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 text-xs leading-6 text-white/58">
          Accepted target: `.save-sisi` with `background` or `background-color` set to
          `green`, `#22c55e`, or `#00ff00`. Small typo fix is allowed for
          `background-color ; green`.
        </div>
      </div>
    </div>
  );
}
