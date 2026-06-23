"use client";

// using native <img> instead of next/image
import { useMemo, useState } from "react";
import { Beaker, Code2, ShieldCheck, Sparkles } from "lucide-react";

import { Certificate } from "@/src/components/game/Certificate";
import { assetUrl } from "@/src/utils/asset-url";

type Stage6ImmortalityLabProps = {
  actionButtonText: string;
  codeTemplate: string;
  isCertificateVisible: boolean;
  onInject: () => void;
};

export function Stage6ImmortalityLab({
  actionButtonText,
  codeTemplate,
  isCertificateVisible,
  onInject,
}: Stage6ImmortalityLabProps) {
  const screenSparkles = Array.from({ length: 30 }, (_, index) => index);
  const confettiPieces = Array.from({ length: 18 }, (_, index) => index);
  const sparkleStyles = useMemo(
    () =>
      screenSparkles.map((sparkle) => ({
        top: `${(sparkle * 37) % 100}%`,
        left: `${(sparkle * 61) % 100}%`,
        animationDuration: `${1500 + ((sparkle * 173) % 3000)}ms`,
        animationDelay: `${(sparkle * 97) % 1000}ms`,
      })),
    [screenSparkles],
  );

  const [showPromiseInput, setShowPromiseInput] = useState(false);
  const [promiseText, setPromiseText] = useState("");
  const [promiseError, setPromiseError] = useState("");
  const requiredOath = "وحياة الطبيعة والخضر وعلوشي";

  const [editableCode, setEditableCode] = useState(`function transcendHumanLifecycle() {
  if (backend_dev.lifestyle === "normal") {
    return "Death";
  }

  while (true) {
    travelToMalaysia({ durationDays: 10, fixedBudgetUSD: 1500 });
  }
}`);

  const isReturnRemoved = !editableCode.match(/return\b/i);

  const handleInitialInjectClick = () => {
    if (isReturnRemoved) {
      setShowPromiseInput(true);
    }
  };

  const handleVerifyOathAndInject = () => {
    if (promiseText.trim() === requiredOath) {
      setPromiseError("");
      const birthdayAudio = new Audio(assetUrl("song/birthday.m4a"));
      birthdayAudio.volume = 0.9;
      void birthdayAudio.play().catch(() => {
        // Ignore autoplay failures quietly if the browser blocks playback.
      });
      onInject();
    } else {
      setPromiseError("❌ صيغة القسَم غير مطابقة! الطبيعة لا تقبل النكث بالعهود.");
    }
  };

  return (
    <div className="relative space-y-6">
      {isCertificateVisible && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {screenSparkles.map((sparkle) => (
            <span
              key={sparkle}
              className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-300 to-yellow-500 opacity-70 animate-ping"
              style={sparkleStyles[sparkle]}
            />
          ))}
        </div>
      )}

      {!isCertificateVisible && (
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[1.9rem] border border-amber-200/16 bg-black/28">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 text-[0.65rem] uppercase tracking-[0.3em] text-amber-100/50">
              <span className="flex items-center gap-1.5">
                <Code2 className="h-3 w-3 text-amber-400" />
                Human_Lifecycle_Refactor.js
              </span>
              <span
                className={
                  isReturnRemoved
                    ? "font-bold text-emerald-400"
                    : "font-bold text-red-400 animate-pulse"
                }
              >
                {isReturnRemoved ? "✔ return removed" : "⚠ return detected"}
              </span>
            </div>

            <div className="p-5 font-mono text-sm leading-7">
              <div className="mb-2 text-[10px] tracking-wider text-zinc-600">
                {"// EDIT DIRECTLY: Wipe out the mortality bug:"}
              </div>
              <textarea
                className="h-48 w-full resize-none bg-transparent font-mono text-sm leading-7 text-amber-50/86 outline-none focus:ring-0"
                value={editableCode}
                disabled={isCertificateVisible}
                onChange={(e) => setEditableCode(e.target.value)}
              />
              <pre className="mt-2 select-none border-t border-white/5 pt-2 text-xs text-zinc-600/70">
                <code>{codeTemplate}</code>
              </pre>
            </div>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-[1.9rem] border border-amber-200/16 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.2),_transparent_20%),rgba(12,8,3,0.86)] p-6">
            <div className="absolute left-1/2 top-8 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-200/18 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.32em] text-amber-100/62">
                  <Beaker className="h-4 w-4" />
                  <span>Bio Reactor</span>
                </div>
                <p className="text-sm leading-7 text-amber-50/82">
                  {!isReturnRemoved
                    ? "please remove the death part from the code so u be immortal"
                    : "please delete the death part from your soul code first"}
                </p>
              </div>

              {showPromiseInput ? (
                <div className="space-y-3 rounded-2xl border border-amber-500/20 bg-black/40 p-4 animate-fade-in">
                  <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-amber-400">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Primal Gym Oath Required</span>
                  </div>
                  <p className="text-xs leading-5 text-zinc-400">
                    You can&apos;t take this immortal serum unless you promise to go to the
                    GYM next month! Type the exact holy oath below to unlock:
                    <br />
                    <span className="mt-1 block rounded bg-zinc-900/50 py-1 text-center font-bold text-amber-200/90">
                      &quot;وحياة الطبيعة والخضر وعلوشي&quot;
                    </span>
                  </p>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-center text-sm text-amber-50 outline-none focus:border-amber-500/40"
                    placeholder="اكتب القسم هنا بالكامل..."
                    value={promiseText}
                    onChange={(e) => setPromiseText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleVerifyOathAndInject();
                      }
                    }}
                  />
                  {promiseError && (
                    <p className="text-center font-mono text-[0.7rem] text-red-400">
                      {promiseError}
                    </p>
                  )}

                  <button
                    type="button"
                    className="w-full cursor-pointer rounded-full bg-amber-400 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-amber-300"
                    onClick={handleVerifyOathAndInject}
                  >
                    Verify Oath & Inject
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={!isReturnRemoved}
                  className={`rounded-full border px-6 py-4 text-xs uppercase tracking-[0.3em] transition duration-300 ${
                    isReturnRemoved
                      ? "cursor-pointer border-amber-200/24 bg-amber-200/12 text-amber-50 shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:bg-amber-200/22"
                      : "cursor-not-allowed border-zinc-900 bg-zinc-900/40 text-zinc-600 opacity-40"
                  }`}
                  onClick={handleInitialInjectClick}
                >
                  {isReturnRemoved ? actionButtonText : "🔒 Locked: Eliminate return;"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isCertificateVisible ? (
        <div className="relative space-y-8 animate-fade-in">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {confettiPieces.map((piece) => (
              <span
                key={piece}
                className="confetti-piece absolute top-0 h-4 w-2 rounded-full"
                style={{
                  left: `${(piece + 1) * 5}%`,
                  animationDelay: `${piece * 90}ms`,
                }}
              />
            ))}
          </div>

          <div className="mb-2 flex items-center gap-3 font-mono text-sm text-amber-50/78">
            <Sparkles className="h-5 w-5 animate-spin text-amber-400" />
            <span>Immortality protocol complete. Happy 26th Birthday!</span>
          </div>

          <Certificate />

          <div className="group relative w-full space-y-6 rounded-[1.9rem] border border-amber-500/20 bg-gradient-to-b from-[#161009] to-black p-6 text-center shadow-2xl">
            <div className="absolute inset-0 rounded-[1.9rem] bg-amber-500/5 opacity-0 blur transition-opacity group-hover:opacity-100" />

            <div className="relative z-10 flex h-20 items-end justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <span className="block h-4 w-4 animate-pulse rounded-full bg-amber-300 blur-sm" />
                <div className="flex h-12 w-10 items-center justify-center rounded-t-full bg-amber-100/12 text-2xl font-black text-amber-200">
                  2
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="block h-4 w-4 animate-pulse rounded-full bg-amber-300 blur-sm" />
                <div className="flex h-12 w-10 items-center justify-center rounded-t-full bg-amber-100/12 text-2xl font-black text-amber-200">
                  6
                </div>
              </div>
            </div>

            <div className="relative z-10 w-full">
              <div className="overflow-hidden rounded-[2rem] border border-amber-200/15 bg-[#2a1607] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                <img
                  alt="Birthday cake"
                  className="h-157 w-full rounded-[1.5rem] object-cover"
                  height={400}
                  src={assetUrl("cake.png")}
                  width={900}
                />
              </div>
            </div>

            <p className="relative z-10 text-sm leading-7 text-amber-50/78">
              uccessful. serum injected,
              and birthday build marked as stable.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
